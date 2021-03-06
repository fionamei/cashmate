import * as React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Nav() {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            
            <TouchableOpacity
                // title="Go to Spending"
                onPress={() => {
                    if (route.name != "Feed") {
                        navigation.replace('Feed')
                    }
                }}
            >   
                {route.name === 'Feed' ? <Image source={require('../../assets/navicon/homedot.png')} style={styles.icons} /> : 
                <Image source={require('../../assets/navicon/home.png')} style={styles.icons} /> }
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={() => {
                    if (route.name != "Spending") {
                        navigation.replace('Spending')
                    }
                }}
            >
                {route.name === 'Spending' ? <Image source={require('../../assets/navicon/adddot.png')} style={styles.icons} /> : 
                <Image source={require('../../assets/navicon/add.png')} style={styles.icons} />}

            </TouchableOpacity>
            

            <TouchableOpacity
                onPress={() => {
                    if (route.name != "Profile") {
                        navigation.replace('Profile')
                    }
                }}
            >
                {route.name === 'Profile' ? <Image source={require('../../assets/navicon/userdot.png')} style={styles.icons} /> : 
                <Image source={require('../../assets/navicon/user.png')} style={styles.icons} />}
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: "rgb(255,255,255)",
        position: 'absolute',
        bottom: "0%",
        display:'flex',
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        width:Dimensions.get('window').width,
    },
    icons: {
        width: Dimensions.get('window').width * 0.1,
        height: 45,
        resizeMode:'contain',
        margin: Dimensions.get('window').width * 0.05
    },
})