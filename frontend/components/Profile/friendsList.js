import React, { useEffect, useState, setState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';

export default function FriendsList() {
    const [uid, setUID] = useState('')
    const [friends,setFriends] = useState([])
    const [name, setName] = useState()
    const [nameList, setNamelist] = useState([])

    const user = getAuth().currentUser;
    if (uid == '') {
        setUID(user.uid)
    } else {
        if (friends == '') {
            console.log("uid",uid)
            const q = query(collection(db, "user", uid, "friend"))
            let newF = []
            let names = []
            const q2 = getDocs(q).then((querySnapshot) => {
                // console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id)
                    // console.log(doc)
                    // console.log("past friends", [...friends, doc.id])
                    // console.log("to be added", doc.id)
                    // const newF = [...friends, doc.id]
                    newF.push(doc.id)
                    findUser(doc.id, names)
                    // console.log("NEW ARRAy", newF)
                    setFriends(newF)
                    // setFriends((oldfriends) => [...oldfriends, doc.id])
                    // console.log('FRIENDS LIST', friends)
                });
            })
            // console.log("q2 issssss ",q2)
            // console.log("friends", friends)
        }
    }

    
    function findUser(input, names) {
        // console.log("looking for the user",input)
        // if can find user from email... 
        const q = query(collection(db, "user"), where("uid", "==", input))
        const q2 = getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // setUserID(doc.id)
                // console.log(doc.id)
                let nameToBeSet = (doc.data()['firstName'] + " " + doc.data()['lastName'])
                // console.log("NAME TO BE SET IS ", nameToBeSet)
                names.push(nameToBeSet)
                setName(nameToBeSet)
                setNamelist(names)
                // console.log("USER ID", userID)
                // console.log("NAME IS ! ", name)
                // console.log("NAMESSSS", names)
            });
        })
        .catch(err => {
            console.log(err)
        })
    }
    // console.log('FRIENDS LIST', friends)
    // console.log('NAME LIST', nameList)

    const Display = nameList.map((names) => 
            <View style={styles.user}
                key={names}
            >
                
                <View style={styles.content}>
                    <Image source={require('../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg')} style={styles.image}/>
                    <Text style={styles.name}>{names}</Text>
                </View>
            </View>
        )
    
    return (
        <View style={styles.container}>
        {/* {console.log(friends)} */}
            {Display}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex:1,
        // backgroundColor: 'red'
    },
    user: {
        flexDirection:'row',
        alignItems:'center',
        marginTop: Dimensions.get('window').width * .05,
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').width * .20,
        marginLeft: '5%',
        // backgroundColor: 'red'
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
    }
})