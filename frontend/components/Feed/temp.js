import * as React from 'react';
import { useState, setState, useEffect } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../backend/Firebase.js';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import Nav from '../Navbar/navbar';
import { LinearGradient } from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image'

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
    const [stringP, setStringp] = useState('100%')

    useEffect(() => {
        if (props.numpercent >= 80) {
            setProgress2('#D8C8F6')
            setProgress1('#C4E7FF')
            setStringp(props.stringpercent)
        } else if (props.numpercent >= 40) {
            setProgress2('#C4E7FF')
            setProgress1('#FFEDAD')
            setStringp(props.stringpercent)

        } else if (props.numpercent > 0){
            setProgress2('#FFEDAD')
            setProgress1('#FFBFC3')
            setStringp(props.stringpercent)

        } else {
            setProgress2('#D8C8F6')
            setProgress1('#C4E7FF')
            setColor('#E94646') 
            setStringp('0%')
        }
        // console.log("passing in props num percent", props.numpercent)
        const docRef = doc(db, "user", props.uid, "budget", props.budget_id, "spending", props.spending_id)
        const change = getDoc(docRef).then((docSnap) => {
            setLike(docSnap.data()['like'])
            setSmile(docSnap.data()['smile'])
            setSad(docSnap.data()['sad'])
            setAngry(docSnap.data()['angry'])
            setWoah(docSnap.data()['woah'])
            setLaugh(docSnap.data()['laugh'])
            // console.log("INITIAL VALUES:", like, smile, sad, angry, woah, laugh)
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
            // console.log("LIKED")
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
            // console.log("SMILE CLICKED")
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
            // console.log("SAD CLICKED")
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
            // console.log("ANGRY CLICKED")
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
            // console.log("WOAH CLICKED")
            addWoah(props.uid, props.budget_id, props.spending_id)
            setWoah(woah + 1)
        
        // else {
        //     console.log("WOAH UNCLICKED")
        //     removeWoah(props.uid, props.budget_id, props.spending_id)
        // }
    }

    const LAUGH = () => {
            // console.log("LAUGH CLICKED")
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
    
    return (
    
        <View style={styles.overall}>
            <View style={styles.container}>
                
                <View style={styles.postContainer}>
                    <View style={styles.imageContainer}>
                        {props.image  
                            ? <Image source={{ uri: props.image }} style={styles.image} />
                            : <Image source={require('../../assets/pfp/default.png')} style={styles.image}/>
                        }
                        {/* <Image source={require("../../assets/pfp/nopfp.jpg")} style={styles.image}/> */}
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
                                        width: stringP,
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
                       

                    </View>   

                    <View style={styles.aboutContainer}>
                        <Text style={styles.date}>{props.date}</Text>
                        <Text style={styles.description}>{props.detail}</Text>
                    </View>
                </View>
                
            </View> 


            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.buttons}
                    onPress={() => {
                        heartIsClicked(!heartClicked)
                        LIKE()
                        // console.log("LIKE", like)
                    }
                    }
                >   
                    <ExpoFastImage
                        uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/heart.png?alt=media&token=0504617b-80a2-4f36-9456-b4bcb14a145f" // image address
                        cacheKey='1' // could be a unque id
                        style={styles.iconOne} // your custom style object
                        // any supported props by Image
                        />
                    {/* <Image source={require("../../assets/feedicons/heart.png")} style={styles.iconOne}/>  */}
                    <Text style={styles.counter}>{like}</Text>
                    {/* <Text style={styles.category}>{likes} </Text> */}
                    {/* {heartClicked ? 
                        <Image source={require("../../assets/feedicons/heartfilled.png")} style={styles.iconOne}/> :
                        <Image source={require("../../assets/feedicons/heartunfilled.png")} style={styles.iconOne}/> } */}
                </TouchableOpacity>

                

                <TouchableOpacity 
                    style={styles.buttons}
                    onPress={() => {
                        smileIsClicked(!smileClicked)
                        SMILE()
                    }
                    }
                >
                    <ExpoFastImage
                        uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/smile.png?alt=media&token=b5d66c07-75a2-48e8-b9ef-168cb2f0e55e" // image address
                        cacheKey='2' // could be a unque id
                        style={styles.iconTwo} // your custom style object
                        // any supported props by Image
                        />
                    {/* <Image source={require("../../assets/feedicons/smile.png")} style={styles.iconTwo}/> */}
                    <Text style={styles.counter}>{smile}</Text>
                    {/* {smileClicked ? 
                        <Image source={require("../../assets/feedicons/smilefilled.png")} style={styles.iconTwo}/> :
                        <Image source={require("../../assets/feedicons/smileunfilled.png")} style={styles.iconTwo}/> } */}
                </TouchableOpacity>

                

                <TouchableOpacity 
                    style={styles.buttons}
                    onPress={() => {
                        sadIsClicked(!sadClicked)
                        SAD()
                    }
                    }
                >
                    <ExpoFastImage
                        uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/sad.png?alt=media&token=a61de004-cdda-4307-8463-cc2c622e30f6" // image address
                        cacheKey='3' // could be a unque id
                        style={styles.iconTwo} // your custom style object
                        // any supported props by Image
                        />
                    {/* <Image source={require("../../assets/feedicons/sad.png")} style={styles.iconTwo}/> */}
                    <Text style={styles.counter}>{sad}</Text>
                    {/* {sadClicked ? 
                        <Image source={require("../../assets/feedicons/sadfilled.png")} style={styles.iconTwo}/> :
                        <Image source={require("../../assets/feedicons/sadunfilled.png")} style={styles.iconTwo}/> } */}
                </TouchableOpacity>

                

                <TouchableOpacity 
                    style={styles.buttons}
                    onPress={() => {
                        woahIsClicked(!woahClicked)
                        WOAH()
                    }
                    }
                >
                    <ExpoFastImage
                        uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/whoa.png?alt=media&token=594cc05e-f4ee-4f8f-9be6-30badd34d8d0" // image address
                        cacheKey='4' // could be a unque id
                        style={styles.iconTwo} // your custom style object
                        // any supported props by Image
                        />
                    {/* <Image source={require("../../assets/feedicons/woah.png")} style={styles.iconTwo}/> */}
                    <Text style={styles.counter}>{woah}</Text>
                    {/* {woahClicked ? 
                        <Image source={require("../../assets/feedicons/whoafilled.png")} style={styles.iconTwo}/> :
                        <Image source={require("../../assets/feedicons/whoaunfilled.png")} style={styles.iconTwo}/> } */}
                </TouchableOpacity>

                

                <TouchableOpacity 
                    style={styles.buttons}
                    onPress={() => {
                        laughIsClicked(!laughClicked)
                        LAUGH()
                    }
                    }
                >
                    <ExpoFastImage
                        uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/laugh.png?alt=media&token=e5fd94dc-23d8-4976-ae16-156a796adbdc" // image address
                        cacheKey='5' // could be a unque id
                        style={styles.iconTwo} // your custom style object
                        // any supported props by Image
                        />
                    {/* <Image source={require("../../assets/feedicons/laugh.png")} style={styles.iconTwo}/> */}
                    <Text style={styles.counter}>{laugh}</Text>
                    {/* {woahClicked ? 
                        <Image source={require("../../assets/feedicons/whoafilled.png")} style={styles.iconTwo}/> :
                        <Image source={require("../../assets/feedicons/whoaunfilled.png")} style={styles.iconTwo}/> } */}
                </TouchableOpacity>

                

                <TouchableOpacity 
                    style={styles.buttons}
                    onPress={() => {
                        angryIsClicked(!angryClicked)
                        ANGRY()
                    }
                    }
                >
                    <ExpoFastImage
                        uri= "https://firebasestorage.googleapis.com/v0/b/cashmate-9436a.appspot.com/o/angry.png?alt=media&token=1204aafe-2f49-4a81-be90-87aca5954790" // image address
                        cacheKey='6' // could be a unque id
                        style={styles.iconTwo} // your custom style object
                        // any supported props by Image
                        />
                    {/* <Image source={require("../../assets/feedicons/angry.png")} style={styles.iconTwo}/> */}
                    <Text style={styles.counter}>{angry}</Text>
                    {/* {angryClicked ? 
                        <Image source={require("../../assets/feedicons/angryfilled.png")} style={styles.iconTwo}/> :
                        <Image source={require("../../assets/feedicons/angryunfilled.png")} style={styles.iconTwo}/> } */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overall : {
        borderBottomColor:'black',
        borderBottomWidth:1,
        alignItems: 'center', 
        justifyContent: 'center', 
    }, 
    container: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:"#FFFFFF",
        
    },

    postContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        height: Dimensions.get("window").height * 0.14,
        maxWidth: Dimensions.get('window').width * .9,
        paddingTop: '3%',
    },
    buttonContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        width: Dimensions.get("window").width * 0.85, // 0.3 initially 
        paddingBottom: '1%',
    },
    aboutContainer: {
        flexWrap: 'wrap',
        width: Dimensions.get("window").width * 0.4,   
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
        justifyContent:'flex-start',
        width: Dimensions.get("window").width * 0.35,
    },
    iconOne: {
        width:Dimensions.get("window").width * 0.05,
        height:Dimensions.get("window").width * 0.045,
        marginRight: '5%',
    },
    iconTwo: {
        width:Dimensions.get("window").width * 0.05,
        height:Dimensions.get("window").width * 0.05,
        marginLeft:'15%',
        marginRight: '5%',
    },
    buttons: {
        flexDirection: 'row',
        width: Dimensions.get("window").width * 0.12,
    },

    // TEXT
    name: {
        fontSize: Dimensions.get('window').height/39,
        fontFamily:'Urbanist-Regular'
    },
    price: {
        fontSize: Dimensions.get('window').height/22,
        fontFamily:'Urbanist-Regular'
    },
    date: {
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
        fontSize: Dimensions.get('window').height/50,
        marginLeft: "2%"
    },
    
    description: {
        fontSize: Dimensions.get('window').height/45,
        fontFamily:'Urbanist-Regular',
        flex: 1, 
        flexWrap: 'wrap',
    }
})