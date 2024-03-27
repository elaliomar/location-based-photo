import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Map from '../components/molecules/Map';

const Maps = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
