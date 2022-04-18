import * as React from 'react';
import { View,Text,TouchableOpacity, Button, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { getAuth } from "firebase/auth";

export default function Settings () {

    const navigation = useNavigation()
    const [isLoaded] = useFonts({
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    const auth = getAuth();
    const handleSignOut = () => {
        auth.signOut()
          .then(() => {
            console.log("logging out from settings")
            navigation.reset({
                index: 0,
                routes: [{ name: 'FirstScreen' }],
              });
          })
          .catch(
              console.log("no. error."),
              error => alert(error.message))
    }

    const budgetAlert = () =>
    Alert.alert(
      "This will delete ALL of your spendings",
      "Are you sure you want to change your budget?",
      [
        {
          text: "Yes",
          onPress: () => {
            navigation.pop()
            navigation.replace("Budget")
          },
        },
        { text: "Cancel", style: "cancel" }
      ]
    );

    return (
        <View style={styles.container}>
            <View style={styles.allButtonsContainer}>
                <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => budgetAlert()}                                    >
                    <Text style={styles.text}>Change Budget</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigation.navigate("Contact")}>
                    <Text style={styles.text}>Contact Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigation.navigate("About")}>
                    <Text style={styles.text}>About</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSignOut}>
                    <Text style={styles.text}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems: 'flex-start', 
        backgroundColor:"#FFFFFF",
    },
    text: {
        fontFamily: 'Urbanist-Regular',
        fontSize:Dimensions.get('window').height * 0.025
    },
    allButtonsContainer: {
        // marginTop: Dimensions.get('window').height * 0.2,
    },
    buttonContainer: {
        marginLeft:Dimensions.get('window').width * 0.1,
        width:Dimensions.get('window').width * 0.8,
        paddingTop:'5%',
        paddingBottom:'5%',
        borderBottomColor:'black',
        borderBottomWidth:1,
    }
})