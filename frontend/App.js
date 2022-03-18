import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Input from './components/input';
import Spending from './components/spending';
import Feed from './components/feed';
import Profile from './components/profile';
import Home from './Home';
import Nav from './components/nav';
import LoginScreen from './components/loginscreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Input" component={Input} />
        <Stack.Screen name="Spending" component={Spending} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Nav" component={Nav}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


