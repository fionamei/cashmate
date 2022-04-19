import * as React from 'react';
import { useState, setState } from 'react';
import { Button, Platform, View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav from '../Navbar/navbar';
import { LinearGradient } from 'expo-linear-gradient';



export default function Temp() {
    const [heartClicked, heartIsClicked] = useState(false)
    const [smileClicked, smileIsClicked] = useState(false)
    const [sadClicked, sadIsClicked] = useState(false)
    const [angryClicked, angryIsClicked] = useState(false)
    const [woahClicked, woahIsClicked] = useState(false)
    const [isLoaded] = useFonts({
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
    })
    if (!isLoaded) {
        return null;
    } 
    
    const color = '#000000'
    const progress1 = '#D8C8F6'
    const progress2 = '#C4E7FF'
    const stringpercent = '80%'
    const name = "Daniel Chen"
    const price = "$12.00"
    const category = 'food'
    const date = '3/1/22 5:23 PM'
    const description = 'sushi and boba'
    return (
    
        
        <View style={styles.container}>
            
            <View style={styles.postContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/pfp/4123e04216d533533c4517d6a0c3e397.jpeg")} style={styles.image}/>
                </View>
                <View style={styles.heading}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <View style={{
                                height: 15,
                                width: '220%',
                                backgroundColor: 'white',
                                borderColor: color,
                                borderWidth: 2,
                                borderRadius: 5,
                                // marginLeft: '10%',
                                marginTop: "6%",
                                marginBottom: "7%"}}> 
                            <LinearGradient
                                style={{
                                    width: stringpercent,
                                    height: 11,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    borderRadius: 2,
                                    borderColor: color,
                                }}
                                useAngle={true}
                                angle={45}
                                angleCenter={{x: 0.5, y: 0.5}}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={[
                                    progress1,
                                    progress2
                                ]} />
                        </View> 
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() =>
                                heartIsClicked(!heartClicked)
                            }
                        >
                            {/* <Text style={styles.category}>{likes} </Text> */}
                            {heartClicked ? 
                                <Image source={require("../../assets/feedicons/heartfilled.png")} style={styles.iconOne}/> :
                                <Image source={require("../../assets/feedicons/heartunfilled.png")} style={styles.iconOne}/> }
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() =>
                                smileIsClicked(!smileClicked)
                            }
                        >
                            {smileClicked ? 
                                <Image source={require("../../assets/feedicons/smilefilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/smileunfilled.png")} style={styles.iconTwo}/> }
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() =>
                                sadIsClicked(!sadClicked)
                            }
                        >
                            {sadClicked ? 
                                <Image source={require("../../assets/feedicons/sadfilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/sadunfilled.png")} style={styles.iconTwo}/> }
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() =>
                                angryIsClicked(!angryClicked)
                            }
                        >
                            {angryClicked ? 
                                <Image source={require("../../assets/feedicons/angryfilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/angryunfilled.png")} style={styles.iconTwo}/> }
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={() =>
                                woahIsClicked(!woahClicked)
                            }
                        >
                            {woahClicked ? 
                                <Image source={require("../../assets/feedicons/whoafilled.png")} style={styles.iconTwo}/> :
                                <Image source={require("../../assets/feedicons/whoaunfilled.png")} style={styles.iconTwo}/> }
                        </TouchableOpacity>




                        <Text style={styles.category}>{category}</Text>

                    </View>
                </View>   

                <View style={styles.aboutContainer}>
                     <Text style={styles.date}>{date}</Text>
                     <Text style={styles.description}>{description}</Text>
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
        height: Dimensions.get("window").height * 0.17,
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
        width:18,
        height:16,
        marginTop:3,
    },
    iconTwo: {
        width:18,
        height:18,
        margin:2,
        marginLeft:5
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
        marginLeft: "10%",
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