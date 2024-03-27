import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  PhotoFile,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = () => {
  const navigation = useNavigation();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<any>();
  const [isActive, setIsActive] = useState(true);
  const [location, setLocation] = useState({});
  useEffect(() => {
    requestLocationPermission();
    getLocation();
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message: 'Cool Photo App needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: {message: any}) => {
        console.error('Error getting location:', error.message);
      },
      {enableHighAccuracy: true},
    );
  };

  const onTakePicturePressed = async () => {
    const photo = await camera.current?.takePhoto();
    setPhoto(photo);
  };

  const onSelectPicturePressed = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image);
      console.log('selected');
    });
  };

  const savePhotoToStorage = async (photo: PhotoFile) => {
    try {
      await AsyncStorage.setItem('capturedPhoto', JSON.stringify(photo));
      console.log('succeed : ', photo);
    } catch (error) {
      console.error('Error saving photo to AsyncStorage:', error);
    }
  };

  const sendPhoto = async () => {
    try {
      if (!photo) {
        throw new Error('No photo to send');
      }
      savePhotoToStorage(photo);
      const data = {
        url: photo.path,
        location: location,
      };

      const response = await axios.post(
        'https://660039ecdf565f1a6145fa41.mockapi.io/images',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data));
      console.log('Data posted successfully:', response.data);

      navigation.goBack();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  if (!hasPermission) {
    return <ActivityIndicator />;
  }
  if (!device) {
    return <Text>Camera device not found</Text>;
  }
  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        device={device}
        isActive={isActive && !photo}
        style={StyleSheet.absoluteFill}
        photo={true}
      />
      {photo ? (
        <>
          <Image source={{uri: photo.path}} style={StyleSheet.absoluteFill} />
          <Icon
            name="close"
            size={25}
            color={'#0331fc'}
            style={{position: 'absolute', top: 50, left: 30}}
            onPress={() => setPhoto(undefined)}
          />
          <Icon
            name="check"
            size={25}
            color={'#0331fc'}
            style={{position: 'absolute', top: 50, right: 30}}
            onPress={sendPhoto}
          />
        </>
      ) : (
        <>
          <Pressable onPress={onTakePicturePressed} style={styles.takeButton} />
          <Icon
            name="image"
            size={25}
            color={'white'}
            style={{position: 'absolute', bottom: 70, left: 30}}
            onPress={onSelectPicturePressed}
          />
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  takeButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    width: 75,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 75,
  },
});
