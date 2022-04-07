import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { budgetId } from '../Budget/budget.js';
import { useEffect } from 'react/cjs/react.production.min';

const budget = 100
const remaining = 100
const percentage = remaining / budget * 100
const stringpercent = `${percentage}%`


export default function remainingbudget() {
    const [uid, setUID] = useState('')
    const navigation = useNavigation()

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    /***************************************************/
    /* THESE ARE THE FIREBASE-RELATED METHODS          */
    /*                                                 */
    /* Methods included in this file:                  */
    /*   create() => sets new spending within 'budget' */
    /*   onAuthStateChanged() => handles login         */
    /*   getRecentlyCreatedBudget()  => sets           */
    /*     global variable budget id to the most       */
    /*     recent one                                  */
    /***************************************************/

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    // if (user) {
    //     const id = user.uid;
    //     setUID(id)
    // } else {
    //     console.log("NO USER SIGNED IN")
    // }
    // });

    // useEffect(() => {
    //     const docRef = doc(db, "user", uid, "budget", budgetId);
    //     const execute = getDoc(docRef).then((docSnap) => {
    //         setBudget(docSnap.data()['amount'])
    //         setRemaining(docSnap.data()['remainingAmt'])
    //         setPercentage(Number(remaining) / Number(budget) * 100)

    //         console.log('AMOUNT AFTER GETTING BUDGET OBJ', budget);
    //         console.log('REMAINING AFTER GETTING BUDGET OBJ', remaining);

    //         stringpercent = `${percentage}%`
    //     })
    // }, [uid])
    var prn2 = new Date().toLocaleDateString('en-us', { weekday: 'long' }); 

    // console.log(prn2);

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle1}>remaining: </Text>
            <Text style={styles.subtitle2}>{percentage}%</Text>
            <View style={styles.progressBar}>
                <View style={styles.fill}/>
            </View>
            <TouchableOpacity
                onPress={() => navigation.replace("Budget")}
            >   
                <Text style={styles.subtitle3}>{prn2 === "Sunday" ? "It's Sunday! Input your budget!" : `weekly budget: $${budget}`}</Text>
            </TouchableOpacity>
            
            <Text style={styles.subtitle4}>${remaining} remaining</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    progressBar: {
        height: 20,
        width: '65%',
        backgroundColor: 'white',
        // borderColor: "black",
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: "3%"

    },

    fill: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "#000000",
        // width: "50%"
        width: stringpercent,
    },

    // text:
    subtitle1: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/30,
        // paddingTop: "3%"
    },
    subtitle2: {
        fontFamily:'Urbanist-Medium',
        fontSize: Dimensions.get('window').height/13
    },
    subtitle3: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/40,
        margin:"3%"
    },
    subtitle4: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/50,
        marginBottom: '3%'
        // margin:"3%"
    },

    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        // backgroundColor: "black",
        width: Dimensions.get("window").width * 0.8,
        backgroundColor:"#FFFFFF" 
    },


})