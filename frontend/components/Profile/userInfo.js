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
            else {
                console.log("user does not have a profile pic")
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
            cropperCircleOverlay: true,
            aspect: [4, 4],
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
                    create(url)
                })
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

    if (!image) {
        return (
            <View style={styles.profile}>
                <TouchableOpacity style={styles.image}>
                </TouchableOpacity>

                <View style={styles.description}>
                    <Text style={styles.name}></Text>
                    <Text style={styles.subprofile}></Text>
                </View>

            </View>
        )
    }
    return (
        <View style={styles.profile}>
            <TouchableOpacity onPress={pickImage}>
                {image  
                    ? <Image source={{ uri: image }} style={styles.image} />
                    : <Image source={require('../../assets/pfp/default.png')} style={styles.image}/>
                }
                {/* // {image && <Image source={{ uri: image }} style={styles.image} />} */}
            </TouchableOpacity> 
            {/* <Image source={require('../assets/pfp/nopfp.jpg')} style={styles.image}/> */}
            
            <View style={styles.descriptions}>
                <Text style={styles.name}>
                    {full_name}
                </Text>
                <View style={styles.subprofile}>
                    <TouchableOpacity onPress={() => navigation.navigate("Friends List")}> 
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
        backgroundColor:"#FFFFFF" 
    },

    // text:
    subtitle1: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/30,
    },

    // history 
    heading1: {
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

    profile: {
        alignItems: "flex-start",
        width: Dimensions.get("window").width * 0.8,
        flexDirection: "row",
        paddingBottom: "5%",
    },

    image: {
        width: Dimensions.get("window").width * 0.25,
        height: Dimensions.get("window").width * 0.25,
        borderRadius: 100 
    },

    descriptions: {
        paddingLeft: Dimensions.get("window").width * 0.05
    },

    name: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get("window").width/11
    },

    subprofile: {
        flexDirection: "row",
        justifyContent:'space-between',
    },

    pfptxt: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get("window").width/20
    }

})