import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const PhotoComponent = () => {
  const navigation = useNavigation();

  const handleCameraClick = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Click on the button that suits you!!!</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) =>
            pressed ? styles.pressed : styles.pressbaleContainer
          }>
          <Text style={styles.pressableText}>Phone Gallery</Text>
          <Icon name="image" size={25} style={styles.icon} />
        </Pressable>
        <Pressable
          style={({pressed}) =>
            pressed ? styles.pressed : styles.pressbaleContainer
          }
          onPress={handleCameraClick}>
          <Text style={styles.pressableText}>Take Photo</Text>
          <Icon name="camera" size={25} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
};

export default PhotoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  pressbaleContainer: {
    borderRadius: 40,
    padding: 15,
    borderWidth: 2,
  },
  pressableText: {
    fontSize: 15,
    marginBottom: 10,
  },
  pressed: {
    borderRadius: 40,
    padding: 15,
    borderWidth: 2,
    opacity: 0.7,
    backgroundColor: '#0331fc',
  },
  icon: {
    alignSelf: 'center',
  },
});
