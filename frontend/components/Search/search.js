import React, { useEffect, useState, setState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { useFonts } from '@use-expo/font';
import { db, storage } from '../../backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

export default function Search() {
    const [exist, setExist] = useState(false)  //set true when user is found
    const [emailEntered, setEmailEntered] = useState(false)
    const [email, setEmail] = useState('')
    const [userID, setUserID] = useState('')
    const [name, setName] = useState('')
    const [pfp, setPfp] = useState()
    const [added, setAdded] = useState(false)


    const [isLoaded] = useFonts({
        "Urbanist-Light": require("../../assets/Urbanist/static/Urbanist-Light.ttf")
    })
    
    // useEffect(() =>{
    //     findUser(email)
    // }, [email])

    if (!isLoaded) {
        return null;
    } 

    const user = getAuth().currentUser;
    
    // useEffect(() =>{
    //     findUser(email)
    // }, [email])

    // useEffect(() => {
    //     if (userID != null) {
    //         setDoc(doc(db, "user", user.uid, "friend", userID), {
    //             name: name
    //         })
    //     }
    // }, [userID])

    const handleFriend = () => {
        if (userID != null) {
            let currentName;
            const ref = doc(db, "user", user.uid)
            getDoc(ref).then((docSnap) => {
                currentName = docSnap.data()['firstName'] + " " + docSnap.data()['lastName']
                imageURL = docSnap.data()['image']
                // console.log(imageURL)
                setDoc(doc(db, "user", userID, "friend", user.uid), {
                    name: currentName,
                    image: imageURL
                })
            })
            setDoc(doc(db, "user", user.uid, "friend", userID), {
                name: name,
                image: pfp
            })
        }
    }
    // function handleKeyDown(e) {
    //     console.log("input:",input)
    //     if (e.nativeEvent.key == "x"){
    //         console.log("entered")
    //         dismissKeyboard();
    //         findUser(email)
    //         console.log("entered")
    //     }
    //     else {
    //         setEmail('')
    //     }
    // }

    // function handleKeyDown(e) {
    //     if (e.nativeEvent.key == "Enter"){
    //         dismissKeyboard();
    //     }
    // }
    
    function findUser(input) {
        // console.log("looking for the user",input)
        // if can find user from email... 
        const q = query(collection(db, "user"), where("email", "==", input.toLowerCase()))
        const q2 = getDocs(q).then((querySnapshot) => {
            if (querySnapshot.empty) {
                setExist(false)
                setEmailEntered(true)
            } else {
                querySnapshot.forEach((doc) => {
                    setUserID(doc.id)
                    console.log(doc.id)
                    let nameToBeSet = (doc.data()['firstName'] + " " + doc.data()['lastName'])
                    setName(nameToBeSet)
                    console.log("USER ID", userID)
                    console.log("NAME", name)

                    setPfp(doc.data()['image'])
                    setExist(true)
                    setAdded(false)
                });
            }
        })
        .catch(err =>{
            console.log(err)
            setExist(false)
        })
    }

    
    function Display() {
        return (
            <View style={styles.user}>
                <View style={styles.content}>
                    {pfp  
                        ? <Image source={{ uri: pfp }} style={styles.image} />
                        : <Image source={require('../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg')} style={styles.image}/>
                    }
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View>
                    { added ? 
                        <Image source={require('../../assets/searchicons/requested.png')} style={styles.add}/> 
                        :<TouchableOpacity
                            style={styles.button}
                            onPress={() => {setAdded(true)
                                            handleFriend()}}
                        >
                            <Image source={require('../../assets/searchicons/add.png')} style={styles.add}/>
                        </TouchableOpacity>
                        // :
                        // <Image source={require('../../assets/searchicons/requested.png')} style={styles.add}/>

                    // {  added ?
                    //     <View style={styles.pendingText}>
                    //         <Text>Pending</Text>
                    //     </View>
                    //     :
                    //     <TouchableOpacity
                    //     style={styles.button}
                    //     onPress={() => setAdded(!added)}>
                    //         <Image source={require('../../assets/searchicons/add.png')} style={styles.add}/>
                    //     </TouchableOpacity>

                    }
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
                    // onKeyPress={handleKeyDown}

                    multiline={false}
                    onSubmitEditing={() => {
                        dismissKeyboard()
                        setEmail(email)
                        findUser(email)
                        // console.log("entered")
                    }}

                    onChangeText={text => 
                        {setEmail(text);
                        setExist(false);
                        setEmailEntered(false)
                        // console.log(text)
                        }
                    }
                />
                { emailEntered ?
                    <Text style={styles.error}>404: user not found :(</Text> : <></>
                }
                {exist ? 
                    <Display />
                    :
                    <></>
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
    content: {
        width: Dimensions.get('window').width * .67,
        height: Dimensions.get('window').width * .20,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems:'center',
    },
    // add button
    button: {
        flexDirection:'row'
    },
    pendingText: {
        borderColor: 'black',
        borderWidth:2,
        padding:10, 
        borderRadius:10,
        paddingRight:20
    },
    add: {
        width: Dimensions.get('window').width * .12,
        resizeMode:'contain',
        // justifyContent: 'flex-end'
    },
})
