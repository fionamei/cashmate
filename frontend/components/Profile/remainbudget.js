import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const budget = 100
const remaining = 88
const percentage = remaining / budget * 100
const stringpercent = `${percentage}%`

export default function remainbudget() {
    const navigation = useNavigation()

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.subtitle1}>remaining: </Text>
            </TouchableOpacity>

            <Text style={styles.subtitle2}>{percentage}%</Text>
            <View style={styles.progressBar}>
                <View style={styles.fill}/>
            </View>
            <Text style={styles.subtitle3}>weekly budget: ${budget}</Text>
            <Text style={styles.subtitle4}>${remaining} remaining</Text>
        </View>
    )

}

const styles = StyleSheet.create({

    progressBar: {
        height: 20,
        width: '65%',
        backgroundColor: 'white',
        // borderColor: "black",
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: "3%"

    },

    fill: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "#000000",
        // width: "50%"
        width: stringpercent,
    },

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