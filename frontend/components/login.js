// ReactNativeFirebase

import { Text, TouchableOpacity, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { auth } from "../backend/Firebase.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import { useState, setState, useEffect } from 'react';
import { db } from '../backend/Firebase.js';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc } from 'firebase/firestore';




export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Profile')
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const newData = doc(collection(db, "user"))
            setDoc(newData, {
                uid: user.uid,
                email: email,
                password: password
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const [isLoaded] = useFonts({
        "Urbanist-Light": require("../assets/Urbanist/static/Urbanist-Light.ttf")
    })
    
    if (!isLoaded) {
        return null;
    } 
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
            <View style={styles.input} >
                <Text style={styles.display}>Username:</Text>
                <TextInput 
                    style={styles.inputLine} 
                    editable 
                    placeholder="username"
                    onChangeText={(text)=>setUsername(text)}/>
            </View>
            <View style={styles.input} >
                <Text style={styles.display}>Password:</Text>
                <TextInput 
                    style={styles.inputLine} 
                    editable 
                    placeholder="password"
                    onChangeText={(text)=>setPassword(text)}/>
            </View>   
        </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    inputLine: {
        fontSize: 50,
        fontFamily:"Urbanist-Light",
        borderBottomColor:'#000000',
        borderBottomWidth:2
        },
    input: {
        flexDirection: 'row',
        // height: 50
        resizeMode:'contain'
        },
    display: {
        paddingTop: 30,
        alignItems: 'center',
        fontSize: 30,
        padding: "7%",
        fontFamily:"Urbanist-Light",
    },
})