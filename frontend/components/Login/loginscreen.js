import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { auth, firebaseConfig, db  } from '../../backend/Firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc } from 'firebase/firestore';
import { useFonts } from '@use-expo/font';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Signup from './signup.js';
import ExpoFastImage from 'expo-fast-image'


export default function LoginScreen() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')

  const navigation = useNavigation()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid
        navigation.pop()
        navigation.replace("Profile", {uid:uid})
      }
    })

    return unsubscribe
  }, [])



  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
          alert(error.message)
            // const errorCode = error.code;
            // const errorMessage = error.message;
        });
  }

  const [isLoaded] = useFonts({
    "Urbanist-Light": require("../../assets/Urbanist/static/Urbanist-Light.ttf")
  })

  if (!isLoaded) {
      return null;
  } 

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.loginContainer}>
      <ExpoFastImage
            uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/logo.png?alt=media&token=74252fa3-c0f7-4217-8013-34625e7750ce" // image address
            cacheKey='0' // could be a unque id
            style={styles.image} // your custom style object
            // any supported props by Image
            />
        {/* <Image source={require('../../assets/icon.png')} style={styles.image}/> */}
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputSubtitle}>username:</Text>
            <TextInput
              placeholder="Email@email.com"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputSubtitle}>password:</Text>
            <TextInput
              placeholder="Password :D"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.inputText}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    // {/* </KeyboardAvoidingView> */}
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  inputContainer: {
    // width: '100%',
    flexDirection: "row",
    paddingLeft: '1%',
    // paddingTop: '20%'
    // backgroundColor: "green"
  },
  inputText: {
    marginTop: "3%",
    borderBottomColor:"black",
    borderBottomWidth:2,
    fontSize: Dimensions.get('window').height * .025,
    marginLeft:10,
    fontFamily:'Urbanist-Light',
    width: Dimensions.get('window').width * 0.58,
  },
  inputSubtitle: {
    marginTop: "3%",
    borderBottomColor:"black",
    borderBottomWidth:3,
    fontSize: Dimensions.get('window').height * .025,
    fontFamily:'Urbanist-Light',
    width: Dimensions.get('window').width * .25,
    // backgroundColor: 'blue'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.8,
  },
  button: {
    margin:"3%",
    borderBottomColor:'#000000',
    borderBottomWidth:2,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: Dimensions.get('window').height * .025,
    fontFamily:'Urbanist-Light'
  },
  image: {
    width: Dimensions.get('window').height * .15,
    height: Dimensions.get('window').height * .15,
    position: 'absolute',
    top: '8%'
  },
  inputs: {
    paddingTop: '20%',
    // backgroundColor: 'pink',
    width: Dimensions.get('window').width *.9,
  }
  // imageContainer: {
  //   paddingBottom: '30%',
  //   backgroundColor: 'green'
  // }
})