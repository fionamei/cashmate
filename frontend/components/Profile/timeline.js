import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const spendings = {
    1: {"amount": "12",
        "category": "food",
        "detail": "Starbucks",
        "timestamp": "March 13, 2022 at 1:11:23 PM UTC-4"
       },
    2: {"amount": "16",
        "category": "food",
        "detail": "Halal Guys",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    3: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    4: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    5: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    6: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    7: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
    },
    8: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    9: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        },
    10: {"amount": "50",
        "category": "other",
        "detail": "gifts",
        "timestamp": "March 13, 2022 at 2:15:54 PM UTC-4"
        }
}

export default function timeline() {
    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    const history = Object.entries(spendings).map(([key, value]) => {
        return(
            <View style={styles.spendingHeading} key={key}>
                <View style={styles.heading1}>
                    <Text style={styles.subtitle1}>${value.amount}</Text>
                    <Text style={styles.subtitle1}>{value.detail}</Text>
                </View>
                <View style={styles.heading2}>
                    <Text>{value.category}</Text>
                    <Text>{value.timestamp}</Text>
                </View>
            </View>
        )
    })

    return (
        <View>{history}</View>
    )
}


const styles = StyleSheet.create({

    // text:
    subtitle1: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/30,
        // paddingTop: "3%"
    },

    // history 
    heading1: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },

    heading2: {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },

    spendingHeading: {
        marginTop: "5%",
        flexDirection:'column',
        justifyContent:'space-evenly',
        borderTopColor:'black',
        borderTopWidth:1,
        width: Dimensions.get("window").width * 0.8,
        paddingTop:"2%",
    },


})