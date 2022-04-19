import React, { useEffect, useState, setState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';

export default function FriendsList() {
    const [uid, setUID] = useState('')
    const [friends,setFriends] = useState([])

    const user = getAuth().currentUser;
    if (uid == '') {
        setUID(user.uid)
    } else {
        if (friends == '') {
            console.log("uid",uid)
            const q = query(collection(db, "user", uid, "friend"))
            const q2 = getDocs(q).then((querySnapshot) => {
                // console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id)
                    // console.log(doc)
                    console.log("past friends", [...friends, doc.id])
                    console.log("to be added", doc.id)
                    const newF = [...friends, doc.id]
                    console.log("NEW", newF)
                    setFriends(newF)
                    // setFriends((oldfriends) => [...oldfriends, doc.id])
                    console.log('FRIENDS LIST', friends)
                });
            })
            // console.log("friends", friends)
        }
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
                    onPress={() => setAdded(!added)}>
                        <Image source={require('../../assets/searchicons/add.png')} style={styles.add}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
        {/* {console.log(friends)} */}
            <Text>Hi</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex:1,
        
    }
})