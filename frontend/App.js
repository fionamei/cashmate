import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Budget from './components/Budget/budget';
import Spending from './components/Spending/spending';
import Feed from './components/Feed/feed';
import Profile from './components/Profile/profile';
import Home from './Home';
import Nav from './components/Navbar/navbar';
import LoginScreen from './components/Login/loginscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
      <Stack.Screen name="Home" component={Home} option={{ presentation: 'card' }}/>
        <Stack.Screen name="Budget" component={Budget}/>
        <Stack.Screen name="Spending" component={Spending} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Nav" component={Nav}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      {/* </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



