import * as React from 'react';
import { useState, setState, useEffect } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../backend/Firebase.js';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import Nav from '../Navbar/navbar';
import { LinearGradient } from 'expo-linear-gradient';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


export default function Temp(props) {
    const [heartClicked, heartIsClicked] = useState(false)
    const [smileClicked, smileIsClicked] = useState(false)
    const [sadClicked, sadIsClicked] = useState(false)
    const [angryClicked, angryIsClicked] = useState(false)
    const [woahClicked, woahIsClicked] = useState(false)
    const [laughClicked, laughIsClicked] = useState(false)
    const [progress1, setProgress1] = useState('#D8C8F6')
    const [progress2, setProgress2] = useState('#C4E7FF')
    const [color, setColor] = useState('#000000')
    const [like, setLike] = useState(0)
    const [smile, setSmile] = useState(0)
    const [sad, setSad] = useState(0)
    const [woah, setWoah] = useState(0)
    const [laugh, setLaugh] = useState(0)
    const [angry, setAngry] = useState(0)

    useEffect(() => {
        if (props.numpercent >= 80) {
            setProgress2('#D8C8F6')
            setProgress1('#C4E7FF')
            setColor('#000000') 
            setStringp(props.stringpercent)
        } else if (props.numpercent >= 40) {
            setProgress2('#C4E7FF')
            setProgress1('#FFEDAD')
            setColor('#000000') 
            setStringp(props.stringpercent)

        } else if (props.numpercent > 0){
            setProgress2('#FFEDAD')
            setProgress1('#FFBFC3')
            setColor('#000000') 
            setStringp(props.stringpercent)

        } else {
            setProgress2('#D8C8F6')
            setProgress1('#C4E7FF')
            setColor('#E94646')
        }

        const docRef = doc(db, "user", props.uid, "budget", props.budget_id, "spending", props.spending_id)
        const change = getDoc(docRef).then((docSnap) => {
            setLike(docSnap.data()['like'])
            setSmile(docSnap.data()['smile'])
            setSad(docSnap.data()['sad'])
            setAngry(docSnap.data()['angry'])
            setWoah(docSnap.data()['woah'])
            setLaugh(docSnap.data()['laugh'])
            console.log("INITIAL VALUES:", like, smile, sad, angry, woah, laugh)
        })

    }, [])

    // useEffect(() => {
    //     if (heartClicked) {
    //         console.log("LIKED")
    //         addLike(props.uid, props.budget_id, props.spending_id)
    //     } else {
    //         console.log("UNLIKED")
    //         removeLike(props.uid, props.budget_id, props.spending_id)
    //     }
    // }, [heartClicked])

    // useEffect(() => {
    //     if (smileClicked) {
    //         console.log("SMILE CLICKED")
    //         addSmile(props.uid, props.budget_id, props.spending_id)
    //     } else {
    //         console.log("SMILE UNCLIKED")
    //         removeSmile(props.uid, props.budget_id, props.spending_id)
    //     }
    // }, [smileClicked])

    // useEffect(() => {
    //     if (sadClicked) {
    //         console.log("SAD CLICKED")
    //         addSad(props.uid, props.budget_id, props.spending_id)
    //     } else {
    //         console.log("SAD UNCLIKED")
    //         removeSad(props.uid, props.budget_id, props.spending_id)
    //     }
    // }, [sadClicked])

    // useEffect(() => {
    //     if (angryClicked) {
    //         console.log("ANGRY CLICKED")
    //         addAngry(props.uid, props.budget_id, props.spending_id)
    //     } else {
    //         console.log("ANGRY UNCLICKED")
    //         removeAngry(props.uid, props.budget_id, props.spending_id)
    //     }
    // }, [angryClicked])

    // useEffect(() => {
    //     if (woahClicked) {
    //         console.log("WOAH CLICKED")
    //         addWoah(props.uid, props.budget_id, props.spending_id)
    //     } else {
    //         console.log("WOAH UNCLICKED")
    //         removeWoah(props.uid, props.budget_id, props.spending_id)
    //     }
    // }, [woahClicked])

    const LIKE = () => {
            console.log("LIKED")
            addLike(props.uid, props.budget_id, props.spending_id)
            setLike(like + 1)
        // else {
        //     console.log("UNLIKED")
        //     removeLike(props.uid, props.budget_id, props.spending_id)
        //     if (like > 0) {
        //         setLike(like - 1)
        //     }
        // }
    }

    const SMILE = () => {
            console.log("SMILE CLICKED")
            addSmile(props.uid, props.budget_id, props.spending_id)
            setSmile(smile + 1)
        // else {
        //     console.log("SMILE UNCLICKED")
        //     removeSmile(props.uid, props.budget_id, props.spending_id)
        //     if (smile > 0) {
        //         setSmile(smile - 1)
        //     }
        // }
    }

    const SAD = () => {
            console.log("SAD CLICKED")
            addSad(props.uid, props.budget_id, props.spending_id)
            setSad(sad + 1)

        // else {
        //     console.log("SAD UNCLICKED")
        //     removeSad(props.uid, props.budget_id, props.spending_id)
        //     if (sad > 0) {
        //         setSad(sad - 1)
        //     }
        // }
    }

    const ANGRY = () => {
            console.log("ANGRY CLICKED")
            addAngry(props.uid, props.budget_id, props.spending_id)
            setAngry(angry + 1)
        // else {
        //     console.log("ANGRY UNCLICKED")
        //     removeAngry(props.uid, props.budget_id, props.spending_id)
        //     if (angry > 0) {
        //         setAngry(angry - 1)
        //     }
        // }
    }

    const WOAH = () => {
            console.log("WOAH CLICKED")
            addWoah(props.uid, props.budget_id, props.spending_id)
            setWoah(woah + 1)
        
        // else {
        //     console.log("WOAH UNCLICKED")
        //     removeWoah(props.uid, props.budget_id, props.spending_id)
        // }
    }

    const LAUGH = () => {
            console.log("LAUGH CLICKED")
            addLaugh(props.uid, props.budget_id, props.spending_id)
            setLaugh(laugh + 1)
        
        // else {
        //     console.log("LAUGH UNCLICKED")
        //     removeLaugh(props.uid, props.budget_id, props.spending_id)
        // }
    }

    const addLike = (uid, budgetID, spendingID) =>  {
        const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
        const change =  getDoc(docRef).then((docSnap) => {
            updateDoc(docRef, {
                like: docSnap.data()['like'] + 1
            })
        })
        // console.log("LIKE BEFORE:" , like)
        // setLike(like + 1)
        // console.log("LIKE AFTER:", like)
    }

    const addSmile = (uid, budgetID, spendingID) =>  {
        const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
        const change =  getDoc(docRef).then((docSnap) => {
            updateDoc(docRef, {
                smile: docSnap.data()['smile'] + 1
            })
            // setSmile(smile + 1)
        })
    }

    const addSad = (uid, budgetID, spendingID) =>  {
        const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
        const change =  getDoc(docRef).then((docSnap) => {
            updateDoc(docRef, {
                sad: docSnap.data()['sad'] + 1
            })
            // setSad(sad + 1)
        })
    }

    const addAngry = (uid, budgetID, spendingID) =>  {
        const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
        const change =  getDoc(docRef).then((docSnap) => {
            updateDoc(docRef, {
                angry: docSnap.data()['angry'] + 1
            })
            // setAngry(angry + 1)
        })
    }

    const addWoah = (uid, budgetID, spendingID) =>  {
        const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
        const change =  getDoc(docRef).then((docSnap) => {
            updateDoc(docRef, {
                woah: docSnap.data()['woah'] + 1
            })
            // setWoah(woah + 1)
        })
    }

    const addLaugh = (uid, budgetID, spendingID) =>  {
        const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
        const change =  getDoc(docRef).then((docSnap) => {
            updateDoc(docRef, {
                laugh: docSnap.data()['laugh'] + 1
            })
            // setWoah(woah + 1)
        })
    }

    // DEPRECATED FUNCTIONS

    // const removeLike = (uid, budgetID, spendingID) =>  {
    //     const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
    //     const change =  getDoc(docRef).then((docSnap) => {
    //         if (docSnap.data()['like'] != 0) {
    //             updateDoc(docRef, {
    //                 like: docSnap.data()['like'] - 1
    //             })
    //             // setLike(like - 1)
    //         }
    //     })
    // }

    // const removeSmile = (uid, budgetID, spendingID) =>  {
    //     const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
    //     const change =  getDoc(docRef).then((docSnap) => {
    //         if (docSnap.data()['smile'] != 0) {
    //             updateDoc(docRef, {
    //                 smile: docSnap.data()['smile'] - 1
    //             })
    //             // setSmile(smile - 1)
    //         }
    //     })
    // }

    // const removeSad = (uid, budgetID, spendingID) =>  {
    //     const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
    //     const change =  getDoc(docRef).then((docSnap) => {
    //         if (docSnap.data()['sad'] != 0) {
    //             updateDoc(docRef, {
    //                 sad: docSnap.data()['sad'] - 1
    //             })
    //             // setSad(sad - 1)
    //         }
    //     })
    // }

    // const removeAngry = (uid, budgetID, spendingID) =>  {
    //     const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
    //     const change =  getDoc(docRef).then((docSnap) => {
    //         if (docSnap.data()['angry'] != 0) {
    //             updateDoc(docRef, {
    //                 angry: docSnap.data()['angry'] - 1
    //             })
    //             // setAngry(angry - 1)
    //         }
    //     })
    // }

    // const removeWoah = (uid, budgetID, spendingID) =>  {
    //     const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
    //     const change =  getDoc(docRef).then((docSnap) => {
    //         if (docSnap.data()['woah'] != 0) {
    //             updateDoc(docRef, {
    //                 woah: docSnap.data()['woah'] - 1
    //             })
    //             // setWoah(woah - 1)
    //         }
    //     })
    // }

    // const removeLaugh = (uid, budgetID, spendingID) =>  {
    //     const docRef = doc(db, "user", uid, "budget", budgetID, "spending", spendingID)
    //     const change =  getDoc(docRef).then((docSnap) => {
    //         if (docSnap.data()['laugh'] != 0) {
    //             updateDoc(docRef, {
    //                 woah: docSnap.data()['laugh'] - 1
    //             })
    //             // setWoah(woah - 1)
    //         }
    //     })
    // }

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })

    if (!isLoaded) {
        return null;
    } 
    
    // const color = '#000000'
    // const progress1 = '#D8C8F6'
    // const progress2 = '#C4E7FF'
    // const [color, setColor] = useState('#000000')
    // const stringpercent = '80%'
    // const name = "Daniel Chen"
    // const price = "$12.00"
    // const category = 'food'
    // const date = '3/1/22 5:23 PM'
    // const description = 'sushi and boba'
    
    // console.log("PERCENTAGE!!", props.stringpercent)
    return (
    
        
        <View style={styles.container}>
            
            <View style={styles.postContainer}>
                <View style={styles.imageContainer}>
                    {props.image  
                        ? <Image source={{ uri: props.image }} style={styles.image} />
                        : <Image source={require('../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg')} style={styles.image}/>
                    }
                    {/* <Image source={require("../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg")} style={styles.image}/> */}
                </View>
                <View style={styles.heading}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                    <View style={{
                                height: 15,
                                width: '210%',
                                backgroundColor: 'white',
                                borderColor: color,
                                borderWidth: 2,
                                borderRadius: 5,
                                // marginLeft: '10%',
                                marginTop: "6%",
                                marginBottom: "7%"}}> 
                            <LinearGradient
                                style={{
                                    width: props.stringpercent,
                                    height: 11,
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
                        </View> 
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() => {
                                heartIsClicked(!heartClicked)
                                LIKE()
                                console.log("LIKE", like)
                            }
                            }
                        >
                            <Image source={require("../../assets/feedicons/heart.png")} style={styles.iconOne}/> 
                            {/* <Text style={styles.category}>{likes} </Text> */}
                            {/* {heartClicked ? 
                                <Image source={require("../../assets/feedicons/heartfilled.png")} style={styles.iconOne}/> :
                                <Image source={require("../../assets/feedicons/heartunfilled.png")} style={styles.iconOne}/> } */}
                        </TouchableOpacity>

                        <Text style={styles.counter}>{like}</Text>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() => {
                                smileIsClicked(!smileClicked)
                                SMILE()
                            }
                            }
                        >
                            <Image source={require("../../assets/feedicons/smile.png")} style={styles.iconTwo}/>
                            {/* {smileClicked ? 
                                <Image source={require("../../assets/feedicons/smilefilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/smileunfilled.png")} style={styles.iconTwo}/> } */}
                        </TouchableOpacity>

                        <Text style={styles.counter}>{smile}</Text>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() => {
                                sadIsClicked(!sadClicked)
                                SAD()
                            }
                            }
                        >
                            <Image source={require("../../assets/feedicons/sad.png")} style={styles.iconTwo}/>
                            {/* {sadClicked ? 
                                <Image source={require("../../assets/feedicons/sadfilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/sadunfilled.png")} style={styles.iconTwo}/> } */}
                        </TouchableOpacity>

                        <Text style={styles.counter}>{sad}</Text>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() => {
                                woahIsClicked(!woahClicked)
                                WOAH()
                            }
                            }
                        >
                            <Image source={require("../../assets/feedicons/woah.png")} style={styles.iconTwo}/>
                            {/* {woahClicked ? 
                                <Image source={require("../../assets/feedicons/whoafilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/whoaunfilled.png")} style={styles.iconTwo}/> } */}
                        </TouchableOpacity>

                        <Text style={styles.counter}>{woah}</Text>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() => {
                                laughIsClicked(!laughClicked)
                                LAUGH()
                            }
                            }
                        >
                            <Image source={require("../../assets/feedicons/laugh.png")} style={styles.iconTwo}/>
                            {/* {woahClicked ? 
                                <Image source={require("../../assets/feedicons/whoafilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/whoaunfilled.png")} style={styles.iconTwo}/> } */}
                        </TouchableOpacity>

                        <Text style={styles.counter}>{laugh}</Text>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() => {
                                angryIsClicked(!angryClicked)
                                ANGRY()
                            }
                            }
                        >
                            <Image source={require("../../assets/feedicons/angry.png")} style={styles.iconTwo}/>
                            {/* {angryClicked ? 
                                <Image source={require("../../assets/feedicons/angryfilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/angryunfilled.png")} style={styles.iconTwo}/> } */}
                        </TouchableOpacity>

                        <Text style={styles.counter}>{angry}</Text>

                        <Text style={styles.category}>{props.category}</Text>

                    </View>
                </View>   

                <View style={styles.aboutContainer}>
                     <Text style={styles.date}>{props.date}</Text>
                     <Text style={styles.description}>{props.detail}</Text>
                </View>
            </View>
            
            {/* <Nav/> */}
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center', 
        justifyContent: 'center', 
        // backgroundColor: 'black'
        backgroundColor:"#FFFFFF",
        
    },
    postContainer: {
        borderBottomColor:'black',
        borderBottomWidth:1,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        height: Dimensions.get("window").height * 0.17,
        maxWidth: Dimensions.get('window').width * .9,
        paddingTop: '3%',

    },
    buttonContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        width: Dimensions.get("window").width * 0.4, // 0.3 initially 
        // backgroundColor: 'red'
    },
    aboutContainer: {
        // flexGrow: 1,
        // flexDirection: 'row',
        // flexShrink: 1,
        flexWrap: 'wrap',
        // backgroundColor: 'green',
        width: Dimensions.get("window").width * 0.4,
        // justifyContent:'flex-end',
        // width: 20,
        // width: '60%'
        
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 100,
        alignItems:'center',
        marginTop: '25%',
        marginLeft: '2%'
    },  
    heading: {
        // flexDirection: 'row',
        justifyContent:'flex-start',
        // backgroundColor: 'red',
        width: Dimensions.get("window").width * 0.35,
        // flexWrap:'wrap'
    },
    iconOne: {
        width:18,
        height:16,
        marginTop:3,
    },
    iconTwo: {
        width:18,
        height:18,
        margin:2,
        marginLeft:5
    },
    buttons: {
        flexDirection: 'row',
        // backgroundColor: 'black'
    },

    // TEXT
    name: {
        // fontSize: 24,
        fontSize: Dimensions.get('window').height/39,
        fontFamily:'Urbanist-Regular'
    },
    price: {
        // fontSize: 42,
        fontSize: Dimensions.get('window').height/22,
        fontFamily:'Urbanist-Regular'
    },
    date: {
        // fontSize:24,
        fontSize: Dimensions.get('window').height/42,
        fontFamily:'Urbanist-Regular',
        color:'#BBBBBB'
    },
    category: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/55,
        marginLeft: "10%",  // originally 10%
    },

    counter: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/60,
        marginLeft: "2%"
    },
    
    description: {
        // fontSize:20,
        fontSize: Dimensions.get('window').height/45,
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