import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from '../screens/Tabs';
import CameraScreen from '../screens/CameraScreen';
import Maps from '../screens/Maps';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Tab"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
