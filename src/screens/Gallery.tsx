import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import ImageItem from '../components/molecules/ImageItem';

const PAGE_SIZE = 5;
let currentPage = 1;
let allDataLoaded = false;

const Gallery = () => {
  const isFocused = useIsFocused();
  const [serverData, setServerData] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (allDataLoaded) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://660039ecdf565f1a6145fa41.mockapi.io/images?page=${currentPage}&limit=${PAGE_SIZE}`,
      );
      const newData = response.data;
      if (newData.length === 0) {
        allDataLoaded = true;
      } else {
        setServerData(prevData => [...prevData, ...newData]);
        currentPage++;
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      currentPage = 1;
      allDataLoaded = false;
      setServerData([]);
      fetchData();
    }
  }, [isFocused, fetchData]);

  const handleLoadMore = () => {
    fetchData();
  };

  const handleDelete = (id: string) => {
    setServerData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    currentPage = 1;
    allDataLoaded = false;
    setServerData([]);
    fetchData();
    setRefreshing(false);
  };

  const renderImageItem = ({item}) => {
    return (
      <ImageItem
        id={item.id}
        url={item.url}
        latitude={item.location.latitude}
        longitude={item.location.longitude}
        onDelete={() => handleDelete(item.id)}
      />
    );
  };

  return (
    <>
      {loading && serverData.length === 0 ? (
        <ActivityIndicator color={'#0331fc'} style={{marginLeft: 8}} />
      ) : (
        <FlatList
          data={serverData}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator color={'#0331fc'} /> : null
          }
        />
      )}
    </>
  );
};

export default Gallery;
