import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import { auth, firebaseConfig, db  } from '../../backend/Firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc } from 'firebase/firestore';
import { useFonts } from '@use-expo/font';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Signup from './signup.js';
import ExpoFastImage from 'expo-fast-image'


export default function First() {

    const navigation = useNavigation()
    const [isLoaded] = useFonts({
        "Urbanist-Light": require("../../assets/Urbanist/static/Urbanist-Light.ttf")
      })
    
      if (!isLoaded) {
          return null;
      } 
    return (
        <View style={styles.loginContainer}>
          
          <View style={styles.welcome}>
          <ExpoFastImage
            uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/logo.png?alt=media&token=74252fa3-c0f7-4217-8013-34625e7750ce" // image address
            cacheKey='0' // could be a unque id
            style={styles.image} // your custom style object
            // any supported props by Image
            />
            {/* <Image source={require('../../assets/icon.png')} style={styles.image}/> */}
            <Text style={styles.welcometext}>Welcome to</Text>
            <Text style={styles.welcometext}>Cashmate</Text>
          </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>I don't have an account</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    buttonContainer: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.8,
      // backgroundColor: 'red',
      // marginTop: 40,
      paddingBottom: '10%'
    },
    button: {
      margin:"2%",
      //  padding:"1%",
      //  backgroundColor:"#89CFF0",
      borderBottomColor:'#000000',
      borderBottomWidth:2,
      // marginBottom: '10%'
      // marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.9,
    },
    buttonText: {
    //   fontWeight: '700',
      fontSize: Dimensions.get('window').height * .025,
      fontFamily:'Urbanist-Light',
      // paddingBottom: '10%'
    },
    image: {
      width: Dimensions.get('window').height * .15,
      height: Dimensions.get('window').height * .15,
    },
    welcome: {
      alignItems: 'center',
      paddingBottom: '35%',
      // backgroundColor:'pink'
    },
    welcometext: {
      fontSize: Dimensions.get('window').height * .04,
      fontFamily:'Urbanist-Light'
    }
  })