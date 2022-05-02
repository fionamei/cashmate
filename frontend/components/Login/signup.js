import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { auth, firebaseConfig, db  } from '../../backend/Firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc } from 'firebase/firestore';
import { useFonts } from '@use-expo/font';



export default function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [first, setFirst] = useState()
    const [last, setLast] = useState()

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.pop()
            navigation.replace("Budget")
        }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in 
            const user = userCredential.user;
            const id = user.uid;
            setDoc(doc(db, "user", id), {
                uid: user.uid,
                email: email.toLowerCase(),
                password: password,
                firstName: first,
                lastName: last
            })
            setItem('UserUID', user.uid)
        })
        .catch((error) => {
          alert(error.message)
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // ..
      });
    }

    return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputSubtitle}>first name:</Text>
                <TextInput
                    placeholder="First name"
                    // value={text}
                    onChangeText={text => setFirst(text)}
                    style={styles.inputText}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputSubtitle}>last name:</Text>
                <TextInput
                    placeholder="Last name"
                    // value={password}
                    onChangeText={text => setLast(text)}
                    style={styles.inputText}
                />
            </View>

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
                

            <View style={styles.buttonContainer}>
                
                <TouchableOpacity
                //  {if (first && last) {
                //             onPress={handleSignUp}
                //         } else {
                //             Alert.alert("Forgot First name or Last name")
                //         }}
                    onPress={() =>
                        {if (first && last) {
                            handleSignUp()
                        } else {
                            Alert.alert("Forgot First name or Last name")
                        }}
                        // handleSignUp()
                    }
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback>
        
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
      width: '80%',
      flexDirection: "row",
      // backgroundColor: "green"
    },
    inputText: {
      // backgroundColor: "red",
      marginTop: "3%",
      borderBottomColor:"black",
      borderBottomWidth:2,
      fontSize:20,
      marginLeft:10,
      fontFamily:'Urbanist-Light',
      width: Dimensions.get('window').width * 0.58,
    },
    inputSubtitle: {
      marginTop: "3%",
      borderBottomColor:"black",
      borderBottomWidth:3,
      fontSize:20,
      fontFamily:'Urbanist-Light',
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.8,
  
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
      fontWeight: '700',
      fontSize: Dimensions.get('window').height * .02,
      fontFamily:'Urbanist-Light'
    }
  })