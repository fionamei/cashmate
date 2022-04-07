import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { auth, firebaseConfig, db  } from '../../backend/Firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc } from 'firebase/firestore';
import { useFonts } from '@use-expo/font';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Signup from './signup.js';

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
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.8,
    //   backgroundColor: 'red'
      // marginTop: 40,
    },
    button: {
      margin:"3%",
      //  padding:"1%",
      //  backgroundColor:"#89CFF0",
      borderBottomColor:'#000000',
      borderBottomWidth:2,
      // marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.9,
    },
    buttonText: {
    //   fontWeight: '700',
      fontSize: Dimensions.get('window').height * .02,
      fontFamily:'Urbanist-Light'
    }
  })