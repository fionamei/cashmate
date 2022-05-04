import { Text, View, StyleSheet, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { useFonts } from '@use-expo/font';


export default function About() {
    const [isLoaded] = useFonts({
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Hi! Thank you for using Cashmate, we are a team of passionate computer science majors hoping to make budgeting more friendly and interactive by creating this social budgeting app!</Text>
        {/* would be nice to include a group pic <3 */}
        <Text style={styles.text}>We had a lot of fun creating this so we hope you enjoy it too!</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems: 'flex-start', 
        backgroundColor:"#FFFFFF",
        // justifyContent: 'center'
    },
    text: {
        fontFamily: 'Urbanist-Regular',
        fontSize: Dimensions.get('window').width*0.07,
        // fontSize: 30,
        padding: '7%',
        textAlign: 'center',
        marginTop: '7%'
    },
})