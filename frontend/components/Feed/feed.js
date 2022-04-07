import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav from '../Navbar/navbar';
import Temp from './temp';


export default function Feed() {
    const [clicked, isClicked] = useState(false)
    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Temp />
                <Temp />
                <Temp />
                <Temp />
                <Temp />
                <Temp />
                <Temp />
                <Temp />
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