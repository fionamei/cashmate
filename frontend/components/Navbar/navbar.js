import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Nav() {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
        
            <TouchableOpacity 
                // title="Go to Input"
                onPress={() => {
                    if (route.name != "Spending") {
                        navigation.replace('Spending')
                    }
                }}
            >
                <Image source={require('../../assets/navicon/add.png')} style={styles.icons} />
            </TouchableOpacity>
            
            <TouchableOpacity
                // title="Go to Spending"
                onPress={() => {
                    if (route.name != "Feed") {
                        navigation.replace('Feed')
                    }
                }}
            >
                <Image source={require('../../assets/navicon/home.png')} style={styles.icons} />
            </TouchableOpacity>

            <TouchableOpacity
                // title="Go to Spending"
                onPress={() => {
                    if (route.name != "Profile") {
                        navigation.replace('Profile')
                    }
                }}
            >
                <Image source={require('../../assets/navicon/user.png')} style={styles.icons} />
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
        flexWrap: "wrap",
        width:Dimensions.get('window').width
    },
    icons: {
        width: 35,
        height: 35,
        resizeMode:'contain',
        margin: Dimensions.get('window').width * 0.1
    }
})