import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Landing from '../components/atoms/Landing';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Landing />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
