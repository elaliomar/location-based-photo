import React, {useEffect} from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageItem = ({
  id,
  url,
  latitude,
  longitude,
  onDelete,
}: {
  id: string;
  url: string;
  latitude: number;
  longitude: number;
  onDelete: () => void;
}) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('Maps', {id, latitude, longitude});
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this image?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: deleteImage},
      ],
    );
  };

  const deleteImage = async () => {
    try {
      await axios.delete(
        `https://660039ecdf565f1a6145fa41.mockapi.io/images/${id}`,
      );
      console.log('Image deleted successfully');
      onDelete();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={handleDelete}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          <Icon name="trash-o" size={24} color={'white'} />
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Swipeable renderLeftActions={renderLeftActions}>
        <Pressable onLongPress={handlePress} style={styles.imageContainer}>
          <Image source={{uri: `file://${url}`}} style={styles.image} />
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 300,
    borderRadius: 10,
  },
  leftAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    marginTop: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
});
