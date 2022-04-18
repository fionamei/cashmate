import * as React from 'react';
import { useState, setState, useEffect, useRef } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';

// import { budgetId } from '../Budget/budget.js';

const budget = 100
const remaining = 100
const percentage = remaining / budget * 100
const stringpercent = `${percentage}%`


export default function remainingbudget() {
    const [uid, setUID] = useState('');
    // const {budget, remaining, percentage} = useBudget(uid["uid"]);
    const [BUDGETID, setBUDGETID] = useState('')
    const [budget, setBudget] = useState('');
    const [remaining, setRemaining] = useState('');
    const [percentage, setPercentage] = useState('');
    const [stringpercent, setStringpercent] = useState('100%')
    const [color, setColor] = useState('#000000')
    const [progress, setProgress] = useState('#000000') //color for progress


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        setUID(uid)
        console.log("test uid", uid)

        const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
        const q2 = getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setBUDGETID(doc.id)
        })
        })

        console.log("test BUDGET ID", BUDGETID)

        const docRef = doc(db, "user", uid, "budget", BUDGETID);
        // console.log("test docref", docRef)
        getDoc(docRef).then((docSnap) => {
            setBudget(docSnap.data()['amount'])
            setRemaining((docSnap.data()['remainingAmt']).toFixed(2))
            setPercentage((Number(remaining) / Number(budget) * 100).toFixed(2))

            // console.log('AMOUNT AFTER GETTING BUDGET OBJ', budget);
            // console.log('REMAINING AFTER GETTING BUDGET OBJ', remaining);
        })
    
    
    if (remaining == '') {
        setStringpercent(`${percentage}%`)
        setColor('#000000')
    } 
    else if (remaining <= 0) {
        setStringpercent("0%")
        setColor('#E94646')
    } else {
        setStringpercent(`${percentage}%`)
        setColor('#000000')
    }
    
    // console.log("this is the stringpercent",stringpercent)

    } else {
        console.log("NO USER SIGNED IN")
    }
    });

    const navigation = useNavigation()

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    var prn2 = new Date().toLocaleDateString('en-us', { weekday: 'long' }); 

    console.log("remain: ", remaining)

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle1}>remaining: </Text>
            {remaining ? <Text style={{ 
                            fontFamily:'Urbanist-Medium',
                            fontSize: Dimensions.get('window').height/13,
                            color: color}}>
                                {percentage}%</Text> 
                        : <Text style={{ 
                            fontFamily:'Urbanist-Medium',
                            fontSize: Dimensions.get('window').height/13,
                            color: color}}>
                                100%</Text>}
            {/* this is bc nothing loads if someone forgets to put a spending --> when budget is 100% so we need this if conditional */}
            {remaining ? <View style={{
                                height: 20,
                                width: '65%',
                                backgroundColor: 'white',
                                borderColor: color,
                                borderWidth: 2,
                                borderRadius: 5,
                                marginBottom: "3%"}}> 
                           
                            <View style={{...StyleSheet.absoluteFill,
                                backgroundColor: '#00000',
                                // background: LinearGradient("90deg", "purple", "orange"),
                                width: stringpercent}}/>
                        </View> 
                        : <View style={{
                                height: 20,
                                width: '65%',
                                backgroundColor: 'white',
                                borderColor: color,
                                borderWidth: 2,
                                borderRadius: 5,
                                marginBottom: "3%"}}>
                            <View style={{...StyleSheet.absoluteFill,
                                        backgroundColor: progress,
                                        width: '100%'}}/>
                        </View> }
            <TouchableOpacity
                onPress={() => navigation.replace("Budget")}
            >   
                <Text style={styles.subtitle3}>{prn2 === "Sunday" ? "It's Sunday! Input your budget!" : `weekly budget: $${budget}`}</Text>
            </TouchableOpacity>
            
            {remaining ?  <Text style={styles.subtitle4}>${remaining} remaining</Text> : 
                 <Text style={styles.subtitle4}>${budget} remaining</Text> }
            {/* <Text style={styles.subtitle4}>${remaining} remaining</Text> */}
        </View>
    )

}

const styles = StyleSheet.create({

    // progressBar: {
    //     height: 20,
    //     width: '65%',
    //     backgroundColor: 'white',
    //     // borderColor: "black",
    //     borderColor: '#000',
    //     borderWidth: 2,
    //     borderRadius: 5,
    //     marginBottom: "3%"

    // },

    // fill: {
    //     ...StyleSheet.absoluteFill,
    //     backgroundColor: "#000000",
    //     // width: "60%"
    //     width: stringpercent,
    // },

    // text:
    box: {
        width: 300,
        height: 30,
        marginVertical: 20,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 7.0,
      },
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