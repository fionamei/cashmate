import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';
import Nav from '../Navbar/navbar';

export default function Feed() {
    return (
        <View style={styles.container}>
            <Text>Hi. This is the feed. We are currently under construction ...</Text>
            <Nav/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor:"#FFFFFF" 
    }
})