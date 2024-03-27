import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import MapView, {Callout, Marker} from 'react-native-maps';

const Map = () => {
  const route = useRoute();
  const id = route.params.id;
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const INITIAL_VALUES = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };
  return (
    <MapView style={StyleSheet.absoluteFill} initialRegion={INITIAL_VALUES}>
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}>
        <Callout>
          <Text>image of id {id}</Text>
        </Callout>
      </Marker>
    </MapView>
  );
};

export default Map;
