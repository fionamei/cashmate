import * as React from 'react';
import { useState, setState, useEffect } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../backend/Firebase.js';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import Nav from '../Navbar/navbar';
import Temp from './temp';
import { useNavigation } from '@react-navigation/native';



export default function Feed() {
    const [listUID, setListUID] = useState([])
    const [listNames, setListNames] = useState([])
    const [listPfps, setListPfps] = useState([])
    const [listBudgetID, setListBudgetID] = useState([])
    const [feed, setFeed] = useState([])
    const [spendings, setSpending] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [counter, setCounter] = useState(0)
    const [updateVal, setUpdateVal] = useState({})
    const navigation = useNavigation();

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
                        setIsEmpty(false)
                        // console.log("listUID useEffect", isEmpty)
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
                    setFeed([])
                    querySnapshot.forEach((doc) => {
                        // console.log("HI there are spendings")
                        setIsEmpty(true)
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
                        setIsEmpty(false)
                        // console.log("tempFeed useEffect", isEmpty)
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
                // setIsEmpty(false)
                // console.log("changefeed useeffect", isEmpty)
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
    // console.log("feed length", feed.length)

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

    console.log("feed length", feed.length)
    console.log("there are no spendings:",isEmpty)
    if (feed == null) {
        return (
            <View style={styles.container}>

            </View>
        )
    }
    else if (isEmpty == true) {
        return (
            <View style={styles.container}>
                    <Text style={styles.emptyFeed}>
                        There are no spendings!
                    </Text>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            navigation.pop()
                            navigation.navigate("Search")}}
                        >
                        <Text style={styles.emptyFeedB}>[Add friends!]</Text>
                    </TouchableOpacity>
                    <Text style={styles.emptyFeed}>or</Text>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            navigation.pop()
                            navigation.replace("Spending")
                        }}
                        >
                        <Text style={styles.emptyFeedB}>[Input your own spendings!]</Text>
                    </TouchableOpacity>
                <Nav/>
            </View>
        )
    } 
    
    else {
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
                    {/* {console.log(feed)} */}
                    <View style={styles.container}>
                        {/* keep this here or it all breaks :DD */}
                    </View> 
                    
                </ScrollView>
                <Nav/>
            </View>
            )
}}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:"#FFFFFF",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .9,
        paddingBottom:"15%"
        
    },
    scroll: {
        paddingBottom:"30%",
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
    emptyFeed: {
        fontSize:30,
        fontFamily:'Urbanist-Regular',
        alignSelf: 'center',
        // padding: 10,
        textAlign: 'center'
    },
    emptyFeedB: {
        fontSize:30,
        fontFamily:'Urbanist-Medium',
        // fontFamily:'Urbanist-Regular',

        alignSelf: 'center',
        // padding: 10,
        textAlign: 'center',
        // fontWeight: "200"
    },
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
        
    }, 
    // button: {
    //     // margin:"2%",
    //     borderBottomColor:'#000000',
    //     borderBottomWidth:2,
    //     height: '5%',
    //     // backgroundColor: 'pink'
    // }
})