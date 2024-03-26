import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PhotoComponent from '../components/PhotoComponent';

const Photo = () => {
  return (
    <View style={styles.container}>
      <PhotoComponent />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
