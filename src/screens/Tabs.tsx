import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Photo from './Photo';
import Gallery from './Gallery';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Photo">
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarLabel: 'Gallery',
          title: 'Gallery',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Photo"
        component={Photo}
        options={{
          tabBarLabel: 'Photo',
          title: 'Photo',
          tabBarIcon: ({color, size}) => (
            <Icon name="camera" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
