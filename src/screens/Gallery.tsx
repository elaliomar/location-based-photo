import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import ImageItem from '../components/ImageItem';

const PAGE_SIZE = 5;
let currentPage = 1;

const Gallery = () => {
  const isFocused = useIsFocused();
  const [serverData, setServerData] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://660039ecdf565f1a6145fa41.mockapi.io/images?page=${currentPage}&limit=${PAGE_SIZE}`,
      );
      const newData = response.data;
      setServerData(prevData => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      currentPage = 1;
      setServerData([]);
      fetchData();
    }
  }, [isFocused, fetchData]);

  const handleLoadMore = () => {
    currentPage++;
    fetchData();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    currentPage = 1;
    setServerData([]);
    fetchData();
    setRefreshing(false);
  };

  const renderImageItem = ({item}: {item: ImageItem}) => {
    return (
      <ImageItem
        id={item.id}
        url={item.url}
        latitude={item.location.latitude}
        longitude={item.location.longitude}
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
          onEndReachedThreshold={1}
          ListFooterComponent={
            loading ? <ActivityIndicator color={'#0331fc'} /> : null
          }
        />
      )}
    </>
  );
};

export default Gallery;
