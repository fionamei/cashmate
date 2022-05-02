import React, { useState, useEffect } from 'react';
import { db } from './backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import Budget from './components/Budget/budget';
import Spending from './components/Spending/spending';
import Feed from './components/Feed/feed';
import Profile from './components/Profile/profile';
import Home from './Home';
import Nav from './components/Navbar/navbar';
import LoginScreen from './components/Login/loginscreen';
import SettingsButton from './components/Settings/settingsButton';
import Settings from './components/Settings/settings';
import AddFriendButton from './components/Search/addFriendButton';
import Search from './components/Search/search';
import Signup from './components/Login/signup';
import FirstScreen from './components/Login/first'
import FriendsList from './components/Profile/friendsList';
import Contact from './components/Settings/contact'
import About from './components/Settings/about'

const Stack = createNativeStackNavigator();

export default function App() {
  const auth = getAuth();
  const [uID, setUID] = useState('');
  const [budgetID, setBudgetID] = useState('');
  // // const [spendingID, setSpendingID] = useState('');

  LogBox.ignoreAllLogs();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUID(user.uid)
      const ref = query(collection(db, "user", user.uid, "budget"), orderBy("timestamp", "desc"), limit(1));
      getDocs(ref).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setBudgetID(doc.id)
        })
      })
      console.log("logged in uid: ",uID)
      console.log("logged in budgetid: ",budgetID)
    } else {
      console.log("logged out")
      // User is signed out
      // ...
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" options={{headerShown:false}}>
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
      <Stack.Screen name="Home" component={Home} option={{ presentation: 'card' }}>
      </Stack.Screen>
        <Stack.Screen name="Budget" children={() => <Budget uID={uID} budgetID={budgetID}/> }/>
        <Stack.Screen name="Spending" component={Spending}/>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Profile" component={Profile} 
                      options={{headerRight: () => (<SettingsButton/>), 
                                headerLeft: ()=> (<AddFriendButton/>)}}/>
        <Stack.Screen name="Nav" component={Nav}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="FriendsList" component={FriendsList}/>
        <Stack.Screen name="Contact" component={Contact}/>
        <Stack.Screen name="About" component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}