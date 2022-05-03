import * as React from 'react';
import { useState, useEffect, setState } from 'react';
import { useNavigation, useNavigationParam } from '@react-navigation/native'
import { db, app, storage } from '../../backend/Firebase.js';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function UserInfo() {
    const [uid, setUID] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [image, setImage] = useState(null);
    // const [loadImage, setLoadImage] = useState(null)
    const navigation = useNavigation()

    const user = getAuth().currentUser;
    if (uid == '') {
        setUID(user.uid)
    } else {
        
        if (first == '') {
            const firstRef = doc(db, "user", uid)
        
            getDoc(firstRef).then((docSnap) => {
                setFirst(docSnap.data()['firstName'])
                setLast(docSnap.data()['lastName'])
            })
        }
    }
    const full_name = first + " " + last
    
    const create = (imageURI) => {
        const ref = doc(db, "user", user.uid)
        const change =  getDoc(ref).then((docSnap) => {
            updateDoc(ref, {
              image: imageURI
            })
        })
        console.log("CALL 2")
    }

    const getImage = () => {
        const ref = doc(db, "user", user.uid)
        const change =  getDoc(ref).then((docSnap) => {
            if (docSnap.data()['image'] != null) {
                console.log("there's an image",docSnap.data()['image'])
                setImage(docSnap.data()['image'])
            }
        })
        console.log("CALL 3")
    }

    useEffect(() => {
        getImage()
    }, [image])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        // console.log(result);
        const uploadImage = async(ImageURI) => {
            const imageName = 'image_' + user.uid + ".jpg"
            const img = await fetch(result.uri);
            const bytes = await img.blob();

            const newRef = ref(storage, imageName)
            await uploadBytes(newRef, bytes);
        }

        if (!result.cancelled) {
            const imageName = 'image_' + user.uid + ".jpg"
            const storageRef = ref(storage, imageName);      // how image will be addressed inside the storage

            uploadImage(result.uri).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    setImage(url)
                })
                create(result.uri)
            })

            console.log("IMAGE ONCE CHOSEN:", image)
            console.log("CALL 1")
        }
    };

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    return (
        <View style={styles.profile}>
            <TouchableOpacity onPress={pickImage}>
                {image  
                    ? <Image source={{ uri: image }} style={styles.image} />
                    : <Image source={require('../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg')} style={styles.image}/>
                }
                {/* // {image && <Image source={{ uri: image }} style={styles.image} />} */}
            </TouchableOpacity> 
            {/* <Image source={require('../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg')} style={styles.image}/> */}
            
            <View style={styles.descriptions}>
                <Text style={styles.name}>
                    {full_name}
                </Text>
                <View style={styles.subprofile}>
                    <TouchableOpacity onPress={() => navigation.navigate("FriendsList")}> 
                        <Text style={styles.pfptxt}>View Your Friends</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        // backgroundColor: "black",
        backgroundColor:"#FFFFFF" 
    },
    progressBar: {
        height: 20,
        width: '65%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: "3%"
    },

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

    scroll: {
        padding: "10%",
        paddingBottom:"30%"
    },

    profile: {
        alignItems: "flex-start",
        width: Dimensions.get("window").width * 0.8,
        flexDirection: "row",
        // backgroundColor: "red",
        paddingBottom: "5%",
        // borderBottomColor: "black",
        // borderBottomWidth: 1
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 100 
    },

    descriptions: {
        paddingLeft: '8%'
    },

    name: {
        fontFamily:'Urbanist-Regular',
        fontSize: 35
    },

    subprofile: {
        flexDirection: "row",
        justifyContent:'space-between',
    },

    pfptxt: {
        fontFamily:'Urbanist-Regular',
        fontSize: 20
    }

})