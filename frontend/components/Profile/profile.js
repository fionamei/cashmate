import * as React from 'react';
import { useState, setState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import Nav from '../Navbar/navbar';
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Remainingbudget from "./remainbudget";
import Timeline from "./timeline";
import UserInfo from "./userInfo";
import Warning from "./warning";

export default function Profile() {
    const navigation = useNavigation()
    
    /***************************************************/
    /* THESE ARE THE FIREBASE-RELATED METHODS          */
    /*                                                 */
    /* Methods included in this file:                  */
    /*   update() => sets a new budget within 'user'   */
    /*   onAuthStateChanged() => handles login         */
    /*   getRecentlyCreatedBudget()  => sets           */
    /*     global variable budget id to the most       */
    /*     recent one                                  */
    /***************************************************/

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        console.log("NO USER SIGNED IN")
    }
    });

    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            console.log("logging out")
            navigation.replace("LoginScreen")
          })
          .catch(
              console.log("no"),
              error => alert(error.message))
    }

    var prn2 = new Date().toLocaleDateString('en-us', { weekday: 'long' }); 

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    {/* {prn2 === "Sunday" ? <Warning /> : {}} */}
                    
                    <UserInfo />
                    <Remainingbudget />
                    <Timeline />
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text> signout </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Nav/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        // backgroundColor: "black"
        backgroundColor:"#FFFFFF" 
    },

    scroll: {
        padding: "10%",
        paddingBottom:"30%"
    },

})