import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav from '../Navbar/navbar';


export default function Temp() {
    const [clicked, isClicked] = useState(false)
    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 
    
    return (
    
        
        <View style={styles.container}>
            
            <View style={styles.postContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg")} style={styles.image}/>
                </View>
                <View style={styles.heading}>
                    <Text style={styles.name}>Daniel Chen</Text>
                    <Text style={styles.price}>$12.00</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() =>
                                isClicked(!clicked)
                            }
                        >
                            <Text style={styles.category}>20 </Text>
                            {clicked ? 
                                <Image source={require("../../assets/feedicons/heartfilled.png")} style={styles.iconOne}/> :
                                <Image source={require("../../assets/feedicons/heartunfilled.png")} style={styles.iconOne}/> }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons}>
                            <Text style={styles.category}>5 </Text>
                            <Image source={require("../../assets/feedicons/comment.png")} style={styles.iconTwo}/>
                        </TouchableOpacity>
                        <Text style={styles.category}>food</Text>
                    </View>
                </View>   

                <View style={styles.aboutContainer}>
                     <Text style={styles.date}>3/1/22 5:23 PM</Text>
                     <Text style={styles.description}>sushi and boba</Text>
                </View>
            </View>
            
            {/* <Nav/> */}
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center', 
        justifyContent: 'center', 
        // backgroundColor: 'black'
        backgroundColor:"#FFFFFF",
        
    },
    postContainer: {
        borderBottomColor:'black',
        borderBottomWidth:1,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        height: Dimensions.get("window").height * 0.15,
        maxWidth: Dimensions.get('window').width * .9,
        paddingTop: '3%',

    },
    buttonContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        width: Dimensions.get("window").width * 0.3,
        // backgroundColor: 'red'
    },
    aboutContainer: {
        // flexGrow: 1,
        // flexDirection: 'row',
        // flexShrink: 1,
        flexWrap: 'wrap',
        
        // width: 20,
        // width: '60%'
        
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 100,
        alignItems:'center',
        marginTop: '25%'
    },  
    heading: {
        // flexDirection: 'row',
        justifyContent:'flex-start',
        // backgroundColor: 'black'
        // flexWrap:'wrap'
    },
    iconOne: {
        width:20.19,
        height:18
    },
    iconTwo: {
        width:18,
        height:18
    },
    buttons: {
        flexDirection: 'row',
        // backgroundColor: 'black'
    },

    // TEXT
    name: {
        // fontSize: 24,
        fontSize: Dimensions.get('window').height/39,
        fontFamily:'Urbanist-Regular'
    },
    price: {
        // fontSize: 42,
        fontSize: Dimensions.get('window').height/22,
        fontFamily:'Urbanist-Regular'
    },
    date: {
        // fontSize:24,
        fontSize: Dimensions.get('window').height/39,
        fontFamily:'Urbanist-Regular',
        color:'#BBBBBB'
    },
    category: {
        fontFamily:'Urbanist-Regular',
        fontSize: Dimensions.get('window').height/55,
    },
    
    description: {
        // fontSize:20,
        fontSize: Dimensions.get('window').height/45,
        fontFamily:'Urbanist-Regular',
        flex: 1, 
        flexWrap: 'wrap',
    
        // flexShrink: 1,
        // width: 400,
        // overflow: 'breakword'
        // overflow-wrap: break-word; 
        // backgroundColor:'red',
        // width: '60%'
        
    }
    
})