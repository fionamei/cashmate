import * as React from 'react';
import { useState, setState, useEffect } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { budgetId } from '../Budget/budget.js';

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


// var spendings = {}
// var COUNTER = 1;

export default function Timeline() {
    const [uid, setUID] = useState('');
    const [BUDGETID, setBUDGETID] = useState('')
    const [budget, setBudget] = useState('');
    // const [spendings2, setSpending] = useState([])
    const [spendings, setSpending] = useState([])
    // const [counter, setCounter] = useState(0)
    const [updateVal, setUpdateVal] = useState({})
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

            // console.log("test uid", uid)
        }
    })

    useEffect(() => {
        const getSpendingObj = async () => {
            console.log("BUDGET ID OF MOST RECENT", BUDGETID)

            const q3 = query(collection(db, "user", uid, "budget", BUDGETID, "spending"), orderBy("timestamp", "desc"));
            const q4 = getDocs(q3).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data())
                    // console.log(doc.data()["amount"])
                    // console.log(doc.data()["category"])
                    // console.log(doc.data()["detail"])
                    // setCounter(counter+1)
        
                    let update = {
                        "amount": doc.data()["amount"],
                        "category": doc.data()["category"],
                        "detail": doc.data()["detail"],
                        // "timestamp": doc.data()["timestamp"]
                    }

                    console.log("BEFORE SETTING UPDATE VAL:", update)

                    if (!(update && Object.keys(update) === 0)) {
                        setUpdateVal(update)
                    }

                    // setSpending([...spendings, updateVal])
                    // const arr = [...spendings, updateVal]
                    // console.log("PREV: ", ...spendings)
                    // console.log("CURRENT", updateVal)
                    // console.log("ARR TO BE SET", [...spendings, updateVal])
                    // setSpending([...spendings, updateVal])
                    // // setSpending([...spendings, updateVal])
                    // // setSpending(arr)
                    // console.log("SPENDING:", spendings)
                    
                    
                })
            })
        }
        getSpendingObj()
    }, [BUDGETID])

    useEffect(() => {
        const changeSpending = async () => {
            console.log("PREV: ", ...spendings)
            console.log("CURRENT", updateVal)
            console.log("ARR TO BE SET", [...spendings, updateVal])
            if (!(spendings && Object.keys(spendings) === 0)) {
                setSpending([...spendings, updateVal])
            }
            // setSpending([...spendings, updateVal])
            // setSpending(arr)
            console.log("SPENDING:", spendings)
        }
        changeSpending()
    }, [updateVal])

    if (!isLoaded) {
        return null;
    } 

    
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         const uid = user.uid;
    //         setUID(uid)
    //         // console.log("test uid", uid)
    
    //         const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
    //         const q2 = getDocs(q).then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             setBUDGETID(doc.id)
    //         })
    //         })
    
    //     // console.log("test BUDGETID", BUDGETID);
    
    //         const q3 = query(collection(db, "user", uid, "budget", BUDGETID, "spending"), orderBy("timestamp", "desc"));
    //         const q4 = getDocs(q3).then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             // console.log(doc.data())
    //             // console.log(doc.data()["amount"])
    //             // console.log(doc.data()["category"])
    //             // console.log(doc.data()["detail"])
    //             // setCounter(counter+1)
    
    //             let updateVal = {
    //                 "amount": doc.data()["amount"],
    //                 "category": doc.data()["category"],
    //                 "detail": doc.data()["detail"]
    //             }
                
    //             setSpending([...oldArr, updateVal])

    //             // array.push(updateVal)
    //             spendings[counter] = updateVal
    //             counter += 1
    //             // console.log(array)
    
    //             // spendings[counter] = {
    //             //     "amount": doc.data()["amount"],
    //             //     "category": doc.data()["category"],
    //             //     "detail": doc.data()["detail"]
    //             // }
    
    //             // setSpending(val => {
    //             //     return {
    //             //         ...val,
    //             //         ...updateVal
    //             //     }
    //             // });
    //             // COUNTER += 1
    
    //             // // console.log(counter)
    
    //             // React.useEffect(() => {
    //             //     setCounter(counter+1)
    //             // }, [spending])
    //         })
    //         })
    //     }});
    

    
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
    

    // const history = spendings.map((spending,key) => {
    //     // console.log("one spending", spending)
    //     return(
    //         <View style={styles.spendingHeading} key={key}>
    //             <View style={styles.heading1}>
    //                 <Text style={styles.subtitle1}>${spending.amount}</Text>
    //                 <Text style={styles.subtitle1}>{spending.detail}</Text>
    //             </View>
    //             <View style={styles.heading2}>
    //                 <Text>{spending.category}</Text>
    //                 <Text>{spending.timestamp}</Text>
    //             </View>
    //         </View>
    //     )
    // })

    if (spendings.length != 0) {
        return (
            <View>{history}</View>
        )
    } else {
        return (
            <View></View>
        )
    }

    // return (
    //     <View>{history}</View>
    // )
}


    // })

    // useEffect(() => {
    //     getSpendings.then(()=> {
    //         const q3 = query(collection(db, "user", user.uid, "budget", BUDGETID, "spending"), orderBy("timestamp", "desc"));
    //             const q4 = getDocs(q3).then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 // console.log(doc.data())
    //                 // console.log(doc.data()["amount"])
    //                 // console.log(doc.data()["category"])
    //                 // console.log(doc.data()["detail"])
    //                 // setCounter(counter+1)
    
    //                 let updateVal = {COUNTER: {
    //                     "amount": doc.data()["amount"],
    //                     "category": doc.data()["category"],
    //                     "detail": doc.data()["detail"]
    //                 }}
    
    //                 // spendings[counter] = {
    //                 //     "amount": doc.data()["amount"],
    //                 //     "category": doc.data()["category"],
    //                 //     "detail": doc.data()["detail"]
    //                 // }
    
    //                 setSpending(val => {
    //                     return {
    //                         ...val,
    //                         ...updateVal
    //                     }
    //                 });
    //                 COUNTER += 1
    
    //                 // // console.log(counter)
    
    //                 // React.useEffect(() => {
    //                 //     setCounter(counter+1)
    //                 // }, [spending])
    //             })
    //             })
    
    //         });
    //     return () => {
    //         setBUDGETID('')
    //         setSpending({})
    //     }
    // }, []);

    // async function getBudget() {
    //     const q = query(collection(db, "user", user.uid, "budget"), orderBy("timestamp", "desc"), limit(1));
    //         const q2 = getDocs(q).then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             setBUDGETID(doc.id)
    //             })
    //         })
    // }

    
    // async function getSpendings() {
    //     const q3 = query(collection(db, "user", user.uid, "budget", BUDGETID, "spending"), orderBy("timestamp", "desc"));
    //         const q4 = getDocs(q3).then((querySnapshot) => {
    //         var counter = 1;
    //         querySnapshot.forEach((doc) => {
    //             // console.log(doc.data())
    //             // console.log(doc.data()["amount"])
    //             // console.log(doc.data()["category"])
    //             // console.log(doc.data()["detail"])
    //             // setCounter(counter+1)

    //             let updateVal = {counter: {
    //                 "amount": doc.data()["amount"],
    //                 "category": doc.data()["category"],
    //                 "detail": doc.data()["detail"]
    //             }}

    //             // spendings[counter] = {
    //             //     "amount": doc.data()["amount"],
    //             //     "category": doc.data()["category"],
    //             //     "detail": doc.data()["detail"]
    //             // }

    //             setSpending(val => {
    //                 return {
    //                     ...val,
    //                     ...updateVal
    //                 }
    //             });
    //             counter += 1

    //             // // console.log(counter)

    //             // React.useEffect(() => {
    //             //     setCounter(counter+1)
    //             // }, [spending])
    //         })
    //         })
    //     }
        
    

    // const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
    //     const q2 = getDocs(q).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         setBUDGETID(doc.id)
    //     })
    //     })

    // // console.log("test BUDGETID", BUDGETID);

    // const q3 = query(collection(db, "user", uid, "budget", BUDGETID, "spending"), orderBy("timestamp", "desc"));
    //     const q4 = getDocs(q3).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // console.log(doc.data())
    //         // console.log(doc.data()["amount"])
    //         // console.log(doc.data()["category"])
    //         // console.log(doc.data()["detail"])
    //         // setCounter(counter+1)

    //         let updateVal = {COUNTER: {
    //             "amount": doc.data()["amount"],
    //             "category": doc.data()["category"],
    //             "detail": doc.data()["detail"]
    //         }}

    //         // spendings[counter] = {
    //         //     "amount": doc.data()["amount"],
    //         //     "category": doc.data()["category"],
    //         //     "detail": doc.data()["detail"]
    //         // }

    //         setSpending(val => {
    //             return {
    //                 ...val,
    //                 ...updateVal
    //             }
    //         });
    //         COUNTER += 1

    //         // // console.log(counter)

    //         // React.useEffect(() => {
    //         //     setCounter(counter+1)
    //         // }, [spending])
    //     })
    //     })

    // });

    
    // const history = Object.entries(spendings).map(([key, value]) => {
    //     return(
    //         <View style={styles.spendingHeading} key={key}>
    //             <View style={styles.heading1}>
    //                 <Text style={styles.subtitle1}>${value.amount}</Text>
    //                 <Text style={styles.subtitle1}>{value.detail}</Text>
    //             </View>
    //             <View style={styles.heading2}>
    //                 <Text>{value.category}</Text>
    //                 <Text>{value.timestamp}</Text>
    //             </View>
    //         </View>
    //     )
    // })

    // return (
    //     <View>{history}</View>
    // )
    // }


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