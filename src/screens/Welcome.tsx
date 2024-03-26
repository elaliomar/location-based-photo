import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Tab');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={styles.lottie}
        source={require('../assets/mapAnimation.json')}
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  lottie: {
    width: '80%',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#0331fc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
