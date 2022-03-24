import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Nav() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        
            <TouchableOpacity 
                // title="Go to Input"
                onPress={() => navigation.navigate('Spending')}
            >
                <Image source={require('../assets/navicon/add.png')} style={styles.icons} />
            </TouchableOpacity>
            
            <TouchableOpacity
                // title="Go to Spending"
                onPress={() => navigation.navigate('Budget')}
            >
                <Image source={require('../assets/navicon/home.png')} style={styles.icons} />
            </TouchableOpacity>

            <TouchableOpacity
                // title="Go to Spending"
                onPress={() => navigation.navigate('Profile')}
            >
                <Image source={require('../assets/navicon/user.png')} style={styles.icons} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        // backgroundColor: 'red',
        position: 'absolute',
        bottom: "0%",
        display:'flex',
        justifyContent: "space-evenly",
        flexWrap: "wrap"
    },
    icons: {
        width: 35,
        height: 35,
        resizeMode:'contain',
        margin: Dimensions.get('window').width * 0.1
    }
})