import * as React from 'react';
import { useState, setState, useEffect, useRef } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';

// import { budgetId } from '../Budget/budget.js';

export default function remainingbudget() {
    const [uid, setUID] = useState('');
    // const {budget, remaining, percentage} = useBudget(uid["uid"]);
    const [BUDGETID, setBUDGETID] = useState('')
    const [budget, setBudget] = useState('');
    const [remaining, setRemaining] = useState('');
    const [percentage, setPercentage] = useState('');
    const [stringpercent, setStringpercent] = useState('')
    const [color, setColor] = useState('#000000')
    const [progress1, setProgress1] = useState('#D8C8F6') //color for gradient 1
    const [progress2, setProgress2] = useState('#C4E7FF')
    
    // console.log("hi")

    const auth = getAuth();
    // console.log("REMAINING BUDGET!!")
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        setUID(uid)
        // console.log("test uid", uid)

        const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
        const q2 = getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setBUDGETID(doc.id)
        })
        })

        // console.log("test BUDGET ID", BUDGETID)

        const docRef = doc(db, "user", uid, "budget", BUDGETID);
        // console.log("test docref", docRef)
        getDoc(docRef).then((docSnap) => {
            setBudget(docSnap.data()['amount'])
            setRemaining(Number(docSnap.data()['remainingAmt']).toFixed(2))
            setPercentage((( Number(docSnap.data()['remainingAmt']) / Number(docSnap.data()['amount']) * 100)).toFixed(2))
        })
    
    
    // this sets the color of the bar when its 0
    if (remaining == '') {
        setStringpercent(`${percentage}%`)
        setColor('#000000')
        // setProgress1('#D8C8F6')
        // setProgress2('#C4E7FF')
    } 
    else if (remaining <= 0) {
        setStringpercent("0%")
        setColor('#E94646')
    } else {
        setStringpercent(`${percentage}%`)
        setColor('#000000')
    }


// setting the progressbar color ranges
    if (percentage >= 80) {
        setProgress2('#D8C8F6')
        setProgress1('#C4E7FF')
    } else if (percentage >= 40) {
        setProgress2('#C4E7FF')
        setProgress1('#FFEDAD')
    } else if (percentage > 0){
        setProgress2('#FFEDAD')
        setProgress1('#FFBFC3')
    } else {
        setProgress2('#D8C8F6')
        setProgress1('#C4E7FF')
    }
    
    // console.log(progress1, progress2)
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

    // console.log("remain: ", remaining)
    if (budget == '' || remaining == '' || percentage == '') {
        return (
            <View style={styles.emptyContainer}>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle1}>Remaining: </Text>
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
                            <LinearGradient
                                style={{
                                    width: stringpercent,
                                    height: 16,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    borderRadius: 2,
                                    borderColor: color,
                                }}
                                useAngle={true}
                                angle={45}
                                angleCenter={{x: 0.5, y: 0.5}}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={[
                                    progress1,
                                    progress2
                                ]} />
                            {/* <View style={{...StyleSheet.absoluteFill,
                                backgroundColor: '#00000',
                                // background: LinearGradient("90deg", "purple", "orange"),
                                width: stringpercent}}/> */}
                        </View> 
                        : <View style={{
                                height: 20,
                                width: '65%',
                                backgroundColor: 'white',
                                borderColor: color,
                                borderWidth: 2,
                                borderRadius: 5,
                                marginBottom: "3%"}}>

                            <LinearGradient
                                style={{
                                    width: '100%',
                                    height: 16,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    borderRadius: 2,
                                    borderColor: color,
                                }}
                                useAngle={true}
                                angle={45}
                                angleCenter={{x: 0.5, y: 0.5}}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={[
                                    progress1,
                                    progress2
                                ]} />
                            {/* <View style={{...StyleSheet.absoluteFill,
                                        backgroundColor: progress,
                                        width: '100%'}}/> */}
                        </View> }
            {/* <TouchableOpacity
                // onPress={() => navigation.replace("Budget")}
            >    */}
            {/* <Text style={styles.subtitle3}>{prn2 === "Sunday" ? "It's Sunday! Input your budget!" : `weekly budget: $${budget}`}</Text> */}
            <Text style={styles.subtitle3}>Weekly budget: ${budget}</Text>
            {/* </TouchableOpacity> */}
            
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
        height: Dimensions.get("window").height * 0.25,
        backgroundColor:"#FFFFFF" 
    },

    // empty container:
    emptyContainer: {
        height: Dimensions.get("window").height * 0.25,
    }

})