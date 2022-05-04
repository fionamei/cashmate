import * as React from 'react';
import { useState, setState, useEffect } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../backend/Firebase.js';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import Nav from '../Navbar/navbar';
import Temp from './temp';


export default function Feed() {
    const [clicked, isClicked] = useState(false)
    const [listUID, setListUID] = useState([])
    const [listNames, setListNames] = useState([])
    const [listPfps, setListPfps] = useState([])
    const [listBudgetID, setListBudgetID] = useState([])
    const [feed, setFeed] = useState([])
    const [counter, setCounter] = useState(0)
    const [updateVal, setUpdateVal] = useState({})

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })

    const user = getAuth().currentUser;

    useEffect(() => {
        let temp = []
        let tempName = []
        let tempPfp = []

        const userSnapshot = getDoc(doc(db, "user", user.uid)).then((docSnap) => {
            temp.push(user.uid)
            const name = docSnap.data()['firstName'] + " " + docSnap.data()['lastName']
            tempName.push(name)
            tempPfp.push(docSnap.data()['image'])
        })

        const querySnapshot = getDocs(collection(db, "user", user.uid, "friend")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push(doc.id)
                tempName.push(doc.data()['name'])
                tempPfp.push(doc.data()['image'])
            });
            setListUID(temp)
            setListNames(tempName)
            setListPfps(tempPfp)
        })
    }, [])

    useEffect(() => {
        let tempBudget = []
        const getBudgetIDs = async () => {
            for (let i = 0; i < listUID.length; i++) {
                const q = query(collection(db, "user", listUID[i], "budget"), orderBy("timestamp", "desc"), limit(1));
                const q2 = getDocs(q).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // console.log("USER ID", listUID[i], "BUDGET ID TO BE ADDED:", doc.id)
                        tempBudget.push(doc.id)
                        // setListBudgetID([...listBudgetID, doc.id])
                    })
                    if (i == listUID.length-1) {
                        setListBudgetID(tempBudget)
                    }
                })
            }
        }
        getBudgetIDs()
    }, [listUID])

    useEffect(() => {
        let tempFeed = []
        const getSpendingObj = async () => {
            for (let i = 0; i < listUID.length; i++) {
                let currentName = listNames[i]
                let currentUID = listUID[i]
                let currentBudgetID = listBudgetID[i] 
                let currentImage = listPfps[i]
                const q3 = query(collection(db, "user", listUID[i], "budget", listBudgetID[i], "spending"), orderBy("timestamp", "desc"));
                const q4 = getDocs(q3).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let update = {
                            "name": currentName,
                            "uid": currentUID,
                            "budget_id": currentBudgetID,
                            "spending_id": doc.id,
                            "image": currentImage,
                            "amount": doc.data()["amount"],
                            "category": doc.data()["category"],
                            "detail": doc.data()["detail"],
                            "percentage": Number(doc.data()['percentage']),
                            "string_percent": doc.data()['percentage'] + "%",
                            "timestamp": (doc.data()["timestamp"]).toDate().toLocaleDateString() + " " + (doc.data()["timestamp"]).toDate().toTimeString().substring(0,5)
                            // "timestamp": (doc.data()["timestamp"].toDate().toString()).substr(0,24)
                        }

                        tempFeed.push(update)
                        
                    })
                    if (i == listUID.length-1) {
                        setFeed(tempFeed)
                    }
                })
            }
        }
        getSpendingObj()
    }, [listBudgetID])

    useEffect(() => {
        const changeFeed = async () => {
            // console.log("PREV: ", ...spendings)
            // console.log("CURRENT", updateVal)
            // console.log("ARR TO BE SET", [...spendings, updateVal])
            // console.log("COUNTER:", counter)
            if (counter == 1) {
                setSpending([updateVal])
            } else {
                setSpending([...spendings, updateVal])
            }
            // console.log("SPENDING:", spendings)
        }
        setCounter(counter+1)
        changeFeed()
    }, [updateVal])

    if (!isLoaded) {
        return null;
    } 
    
    // console.log("LIST UID", listUID)
    // console.log("LIST NAMES", listNames)
    // console.log("LIST BUDGET ID", listBudgetID)
    // console.log("FEED", feed)


    const sorted = feed.sort((a,b)=>{
        const dateA = new Date(`${a.timestamp}`).valueOf();
        const dateB = new Date(`${b.timestamp}`).valueOf();
        if(dateA <= dateB){
          return 1; // return -1 here for DESC order
        }
        return -1 // return 1 here for DESC Order
      });
    //   console.log("SORTED IS", sorted)


    const everything = sorted.map((post, index) => 
      <Temp key={index}
            name={post.name} 
            category={post.category} 
            price={post.amount} 
            date = {post.timestamp}
            stringpercent={post.string_percent}
            numpercent={post.percentage}
            image = {post.image}
            detail={post.detail}
            uid = {post.uid}
            budget_id = {post.budget_id}
            spending_id = {post.spending_id}
            />
    )
    // if (feed.length == 0) {
    //     return (
    //         <View style={styles.container}>
    //                 <Text style={styles.emptyFeed}>
    //                     There are no spendings! Add friends or input your own spendings!
    //                 </Text>
    //             <Nav/>
    //         </View>
    //     )
    // } else {
    //     return (
    //         <View style={styles.container}>
    //             <ScrollView style={styles.scroll}>
    //                 {everything}
    //                 {console.log(feed)}
    //                 <View style={styles.container}>
    //                     {/* keep this here or it all breaks :DD */}
    //                 </View> 
                    
    //             </ScrollView>
    //             <Nav/>
    //         </View>
    //     )
    // }
    return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    {everything}
                    {console.log(feed)}
                    <View style={styles.container}>
                        {/* keep this here or it all breaks :DD */}
                    </View> 
                    
                </ScrollView>
                <Nav/>
            </View>
            )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1, 
        // flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'center', 
        justifyContent: 'center', 
        // paddingTop:"5%",
        // backgroundColor: 'green'
        backgroundColor:"#FFFFFF",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .9,
        paddingBottom:"15%"
        
    },
    postContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        height: Dimensions.get("window").height * 0.15,
        maxWidth: Dimensions.get('window').width * 0.9,

        // borderTopColor: 'black'
        // backgroundColor: 'red'
    },
    buttonContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        width: Dimensions.get("window").width * 0.3,
        // backgroundColor: 'black'
    },
    aboutContainer: {
        // flexGrow: 1,
        // flexDirection: 'row',
        // flexShrink: 1,
        flexWrap: 'wrap',
        
        // width: 20,
        width: '60%'
        
    },
    scroll: {
        // padding: "10%",
        paddingBottom:"30%",
        // backgroundColor: 'blue'
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 100,
        alignItems:'center',
        marginTop: '25%'
    },  
    heading: {
        // flexDirection: 'row',
        justifyContent:'flex-start',
        // backgroundColor: 'black'
        // flexWrap:'wrap'
    },
    iconOne: {
        width:20.19,
        height:18
    },
    iconTwo: {
        width:18,
        height:18
    },
    buttons: {
        flexDirection: 'row',
        // backgroundColor: 'black'
    },

    // TEXT
    name: {
        fontSize:24,
        fontFamily:'Urbanist-Regular'
    },
    // emptyFeed: {
    //     fontSize:30,
    //     fontFamily:'Urbanist-Regular',
    //     alignSelf: 'center',
    //     padding: 10,
    //     textAlign: 'center'
    // },
    price: {
        fontSize: 42,
        fontFamily:'Urbanist-Regular'
    },
    date: {
        fontSize:24,
        fontFamily:'Urbanist-Regular',
        color:'#BBBBBB'
    },
    
    description: {
        fontSize:20,
        fontFamily:'Urbanist-Regular',
        flex: 1, 
        flexWrap: 'wrap',
        // flexShrink: 1,
        // width: 400,
        // overflow: 'breakword'
        // overflow-wrap: break-word; 
        // backgroundColor:'red',
        // width: '60%'
        
    }
    
})