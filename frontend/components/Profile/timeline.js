import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { budgetId } from '../Budget/budget.js';
import { db } from '../../backend/Firebase.js';
import { doc, collection, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';

const spendings = {
    1: {"amount": "10",
        "category": "food",
        "detail": "Starbucks",
        "timestamp": "March 13 12:00 PM"
       },
    2: {"amount": "20",
        "category": "entertainment",
        "detail": "JJK movie",
        "timestamp": "March 13 1:00 PM"
        },
    3: {"amount": "1000",
        "category": "lifestyle",
        "detail": "Goose Jacket",
        "timestamp": "March 13 2:00 PM"
        }
}

export default function Timeline() {
    // const auth = getAuth();
    // const user = auth.currentUser;
    // console.log("uid: ", user.uid)
    // console.log("budgetID: ", budgetId)
    // const ref = doc(collection(db, "user", user.uid, "budget", budgetId, "spending"))
    // const array = []

    // array.push(
    //     {"amount": "10",
    //     "category": "food",
    //     "detail": "Starbucks",
    //     "timestamp": "March 13 12:00 PM"
    //    }
    // )
    // console.log(array)

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    const history = Object.entries(spendings).map(([key, value]) => {
        return(
            <View style={styles.spendingHeading} key={key}>
                <View style={styles.heading1}>
                    <Text style={styles.subtitle1}>${value.amount}</Text>
                    <Text style={styles.subtitle1}>{value.detail}</Text>
                </View>
                <View style={styles.heading2}>
                    <Text>{value.category}</Text>
                    <Text>{value.timestamp}</Text>
                </View>
            </View>
        )
    })

    return (
        <View>{history}</View>
    )
}


const styles = StyleSheet.create({

    // text:
    subtitle1: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/30,
        // paddingTop: "3%"
    },

    // history 
    heading1: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },

    heading2: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },

    spendingHeading: {
        marginTop: "5%",
        flexDirection:'column',
        justifyContent:'space-evenly',
        borderTopColor:'black',
        borderTopWidth:1,
        width: Dimensions.get("window").width * 0.8,
        paddingTop:"2%",
    },


})