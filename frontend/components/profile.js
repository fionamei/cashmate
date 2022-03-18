import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import Nav from './nav';
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';


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


  
const budget = 100
const remaining = 88
const percentage = remaining / budget * 100
const stringpercent = `${percentage}%`

export default function Profile() {
    const navigation = useNavigation()

    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    const auth = getAuth();
    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            navigation.navigate("LoginScreen")
          })
          .catch(
              error => alert(error.message))
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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                        <TouchableOpacity onPress={handleSignOut}>
                            <Text style={styles.subtitle1}>budget: </Text>
                        </TouchableOpacity>

                        <Text style={styles.subtitle2}>${budget}</Text>
                        <Text style={styles.subtitle3}>{percentage}% remaining</Text>
                        <View style={styles.progressBar}>
                            <View style={styles.fill}/>
                        </View>
                        {history}
                        {/* <Nav/> */}
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
        backgroundColor:"#FFFFFF" 
    },
    progressBar: {
        height: 20,
        width: '65%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },

    fill: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "#000000",
        // width: "50%"
        width: stringpercent,
    },

    // text:
    subtitle1: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/30
    },
    subtitle2: {
        fontFamily:'Urbanist-Medium',
        fontSize: Dimensions.get('window').height/13
    },
    subtitle3: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/40,
        margin:"3%"
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

    scroll: {
        padding: "10%",
        paddingBottom:"30%"
    }
})