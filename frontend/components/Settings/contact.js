import { Text, View, StyleSheet, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { useFonts } from '@use-expo/font';


export default function Contact() {
    const [isLoaded] = useFonts({
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Please email cashmate475@gmail.com for any help! :)</Text>
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
        fontSize: Dimensions.get('window').width/14,
        padding: '7%',
        textAlign: 'center',
        marginTop: '10%'
    },
})