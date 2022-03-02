import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Input from './components/input';
import Spending from './components/spending';
import Home from './Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Input" component={Input} />
        <Stack.Screen name="Spending" component={Spending} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


