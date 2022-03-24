import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const spendings = {
    1: {"amount": "12",
        "category": "food",
        "detail": "Starbucks",
        "timestamp": "March 13, 2022 at 1:11:23 PM UTC-4"
       },
    2: {"amount": "50",
        "category": "other",
        "detail": "gifts",
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

export default function remainbudget() {

    return (
        <View>
            <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.subtitle1}>budget: </Text>
            </TouchableOpacity>

            <Text style={styles.subtitle2}>${budget}</Text>
            <Text style={styles.subtitle3}>{percentage}% remaining</Text>
            <View style={styles.progressBar}>
                <View style={styles.fill}/>
            </View>
        </View>
    )

}