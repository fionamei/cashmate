import React, { useEffect, useState, setState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { useFonts } from '@use-expo/font';
import { db } from '../../backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';

export default function Search() {
    const [exist, setExist] = useState(true)  //set true when user is found
    const [email, setEmail] = useState('')
    const [userID, setUserID] = useState('')
    const [name, setName] = useState('')
    const [pfp, setPfp] = useState()
    const [added, setAdded] = useState(false)


    const [isLoaded] = useFonts({
        "Urbanist-Light": require("../../assets/Urbanist/static/Urbanist-Light.ttf")
    })
    
    useEffect(() =>{
        findUser(email)
    }, [email])

    if (!isLoaded) {
        return null;
    } 

    function handleKeyDown(e) {
        if (e.nativeEvent.key == "Enter"){
            dismissKeyboard();
        }
    }

    function findUser(input) {
        // if can find user from email... 
        const q = query(collection(db, "user"), where("email", "==", input))
        const q2 = getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserID(doc.id)
                console.log(doc.id)
                let nameToBeSet = (doc.data()['firstName'] + " " + doc.data()['lastName'])
                setName(nameToBeSet)
                console.log("USER ID", userID)
                console.log("NAME", name)
                setPfp()
                setExist(true)
            });
        })
        // console.log("UID", userID)
        // console.log("NAME", name)
        // console.log("EMAIL", email)
    }

    
    function Display() {
        return (
            <View style={styles.user}>
                <View style={styles.content}>
                    <Image source={require('../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg')} style={styles.image}/>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setAdded(!added)}
                    >
                        {added ? 
                            <Image source={require('../../assets/searchicons/remove.png')} style={styles.add}/> :
                            <Image source={require('../../assets/searchicons/add.png')} style={styles.add}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}> 
                {/* <Text>hi</Text> */}
                <TextInput 
                    placeholder="enter your friend's email"
                    style={styles.inputbox}
                    onKeyPress={handleKeyDown}
                    onChangeText={text => (
                        setEmail(text)
                        )
                    }
                />
                {exist ? 
                    <Display />
                    :
                    <Text style={styles.error}>404: user not found :(</Text>
                }
            </View>
        
        </TouchableWithoutFeedback> 
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1,
        // justifyContent: 'center',
        alignItems:'center'
    },
    inputbox: {
        width: Dimensions.get('window').width * .8,
        padding: Dimensions.get('window').width * .03,
        marginTop:Dimensions.get('window').width * .05,
        // backgroundColor: 'pink',
        fontSize:20,
        borderColor: '#000000',
        borderWidth: 2,
        fontFamily:'Urbanist-Regular',
        borderRadius:5
        // height:  Dimensions.get('window').height * .03
    },
    error: {
        fontFamily:'Urbanist-Regular',
        fontSize: 20,
        marginTop: 40
    },
    user: {
        flexDirection:'row',
        alignItems:'center',
        marginTop: Dimensions.get('window').width * .05,
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').width * .20,
        // // height: 
        // backgroundColor: 'green',
        // justifyContent: 'space-between'
    },
    image: {
        width: Dimensions.get('window').width * .20,
        height: Dimensions.get('window').width * .20,
        borderRadius: 100,
    },
    name: {
        fontFamily:'Urbanist-Regular',
        fontSize: 25,
        // paddingTop: Dimensions.get('window').width * .05,
        padding: '5%',
        // backgroundColor: 'red'
    },
    add: {
        width: Dimensions.get('window').width * .12,
        resizeMode:'contain',
        // justifyContent: 'flex-end'
    },
    content: {
        width: Dimensions.get('window').width * .67,
        height: Dimensions.get('window').width * .20,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems:'center',
    },
    button: {
        flexDirection:'row'
    }
})
