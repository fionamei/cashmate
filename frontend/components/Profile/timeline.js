import * as React from 'react';
import { useState, setState, useEffect } from 'react';
import { db } from '../../backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';

export default function Timeline() {
    const [uid, setUID] = useState('');
    const [BUDGETID, setBUDGETID] = useState('')
    const [budget, setBudget] = useState('');
    const [spendings, setSpending] = useState([])
    const [counter, setCounter] = useState(0)
    const [updateVal, setUpdateVal] = useState({})

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUID(uid)

            const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
            const q2 = getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setBUDGETID(doc.id)
                })
            })

            setCounter(1)
        }
    })

    useEffect(() => {
        const getSpendingObj = async () => {
            console.log("BUDGET ID OF MOST RECENT", BUDGETID)

            const q3 = query(collection(db, "user", uid, "budget", BUDGETID, "spending"), orderBy("timestamp", "desc"));
            const q4 = getDocs(q3).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    let update = {
                        "amount": doc.data()["amount"],
                        "category": doc.data()["category"],
                        "detail": doc.data()["detail"],
                    }

                    console.log("BEFORE SETTING UPDATE VAL:", update)

                    if (!(update && Object.keys(update) === 0)) {
                        setUpdateVal(update)
                    }
                    
                })
            })
        }
        getSpendingObj()
        setCounter(counter + 1)
    }, [BUDGETID])

    useEffect(() => {
        const changeSpending = async () => {
            console.log("PREV: ", ...spendings)
            console.log("CURRENT", updateVal)
            console.log("ARR TO BE SET", [...spendings, updateVal])
            console.log("COUNTER:", counter)
            if (counter == 1) {
                setSpending([updateVal])
            } else {
                setSpending([...spendings, updateVal])
            }
            console.log("SPENDING:", spendings)
        }
        setCounter(counter+1)
        changeSpending()
    }, [updateVal])

    if (!isLoaded) {
        return null;
    } 
    
     const history = spendings.map((spending,key) => {
            // console.log("one spending", spending)
            return(
                <View style={styles.spendingHeading} key={key}>
                    <View style={styles.heading1}>
                        <Text style={styles.subtitle1}>${spending.amount}</Text>
                        <Text style={styles.subtitle1}>{spending.detail}</Text>
                    </View>
                    <View style={styles.heading2}>
                        <Text>{spending.category}</Text>
                        <Text>{spending.timestamp}</Text>
                    </View>
                </View>
            )
     })

    if (spendings.length != 0) {
        return (
            <View>{history}</View>
        )
    } else {
        return (
            <View></View>
        )
    }

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