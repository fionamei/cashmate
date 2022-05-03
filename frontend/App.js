import React, { useState, useEffect } from 'react';
import { db } from './backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { getItem, setItem } from './backend/asyncstorage.js';
import Onboarding from './components/Onboarding/onboarding.js';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const auth = getAuth();
  const [uID, setUID] = useState('');
  const [budgetID, setBudgetID] = useState('');
  const [newUser, setNewUser] = useState(false);
  // const [spendingID, setSpendingID] = useState('');
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const retrieveInfo = async () => {
      try {
        getItem('UserUID').then((value) => setUID(value))
        getItem('budgetID').then((value) => setBudgetID(value))
        getItem('visited').then((value) => setNewUser(value))
      }
      catch(e) {
        console.log(e)
      }
    }
    retrieveInfo();
  }, [uID, budgetID, newUser])

  onAuthStateChanged(auth, (user) => {
    // if logged in 
    if (user) {
      setUID(user.uid)
      const ref = query(collection(db, "user", user.uid, "budget"), orderBy("timestamp", "desc"), limit(1));
      getDocs(ref).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setItem('budgetID',doc.id)
          setBudgetID(doc.id)
        })
      })
      setItem('UserUID',user.uid)

      const firstRef = doc(db, "user", user.uid)
      getDoc(firstRef).then((docSnap) => {
          setItem('firstName',docSnap.data()['firstName'])
          // console.log(docSnap.data()['firstName'])
          setItem('lastName',docSnap.data()['lastName'])
          // console.log(docSnap.data()['lastName'])
          setItem('pfp',docSnap.data()['image'])
          console.log('pfp thats being stored:',docSnap.data()['image'])
          // console.log('stored hopefully')
      })

      const docRef = doc(db, "user", user.uid, "budget", budgetID);
        // console.log("test docref", docRef)
      getDoc(docRef).then((docSnap) => {
          const budget_temp = docSnap.data()['amount']
          const remaining_temp = (docSnap.data()['remainingAmt'])
          const percentage_temp = (Number(remaining_temp) / Number(budget_temp) * 100).toFixed(2)
          setItem('budget',String(budget_temp))
          setItem('remaining',String(remaining_temp))
          setItem('percentage', String(percentage_temp))
          setItem('stringpercent', String(percentage_temp + '%'))
          console.log('remaining should be',remaining_temp)
          console.log('percentage should be',percentage_temp)
      }).catch((e) => {
        console.log("budget was not properly stored",e)
      })
      }

     else {
      console.log("logged out")
    }
  });

  if (newUser != null) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName={"Onboarding"}>
      <Stack.Screen options={{ headerShown:false }} name="Onboarding" component={Onboarding}/>
      <Stack.Screen name="Home" component={Home} option={{ presentation: 'card' }}>
      </Stack.Screen>
        <Stack.Screen name="Budget" children={() => <Budget uID={uID} budgetID={budgetID}/> }/>
        <Stack.Screen name="Spending" component={Spending}/>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Profile" component={Profile} 
                      options={{headerRight: () => (<SettingsButton/>), 
                                headerLeft: ()=> (<AddFriendButton/>)}}/>
        <Stack.Screen name="Nav" component={Nav}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup} />
        <Stack.Screen name="FirstScreen" options={{headerShown: false}} component={FirstScreen} />
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="FriendsList" component={FriendsList}/>
        <Stack.Screen name="Contact" component={Contact}/>
        <Stack.Screen name="About" component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"FirstScreen"}>
      <Stack.Screen options={{ headerShown:false }} name="Onboarding" component={Onboarding}/>
      <Stack.Screen name="Home" component={Home} option={{ presentation: 'card' }}>
      </Stack.Screen>
        <Stack.Screen name="Budget" children={() => <Budget uID={uID} budgetID={budgetID}/> }/>
        <Stack.Screen name="Spending" component={Spending}/>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Profile" component={Profile} 
                      options={{headerRight: () => (<SettingsButton/>), 
                                headerLeft: ()=> (<AddFriendButton/>)}}/>
        <Stack.Screen name="Nav" component={Nav}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="FirstScreen" component={FirstScreen}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="FriendsList" component={FriendsList}/>
        <Stack.Screen name="Contact" component={Contact}/>
        <Stack.Screen name="About" component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}