import React from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useFonts } from 'expo-font';
import { getItem, setItem } from '../../backend/asyncstorage';
import { useNavigation } from '@react-navigation/native';

const screens = [
    {
        id: '1',
        title: "Set Goals",
        subtitle: "Choose a weekly budget",
        image: require('../../assets/onboarding/goals.png'),
        continue: false
    },
    {
        id: '2',
        title: "Record Spendings",
        subtitle: "Input spendings for your own record",
        image: require('../../assets/onboarding/spendings.png'),
        continue: false
    },
    {
        id: '3',
        title: "Save With Friends",
        subtitle: "Find friends and compare your progress!",
        image: require('../../assets/onboarding/save.png'),
        continue: true
    }
]

const recordVisit = async () => {
    try {
        setItem('visited','true');
    } catch (e) {
        console.log("Error in storing visit:",e)
    }
}

export default function Onboarding() {
    const navigation = useNavigation();

    const [isLoaded] = useFonts({
        "Urbanist-Black": require("../../assets/Urbanist/static/Urbanist-Black.ttf"),
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf"),
        "Urbanist-Medium": require("../../assets/Urbanist/static/Urbanist-Medium.ttf")
    })
    if (!isLoaded) {
        return null;
    } 

    const RenderScreen = ({item}) => {
        return (
            <View style={styles.container} key={item.id}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                {item.continue ?
                    <View >
                        <TouchableOpacity style={styles.buttonContainer}
                         onPress={() => {navigation.replace('FirstScreen'); recordVisit}}>
                             <Text style={styles.nextButtonText}>Get Started</Text>
                             <Image style={styles.nextButton} source={require("../../assets/onboarding/getstarted.png")}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.buttonContainer2}>
                            <Text style={styles.nextButtonText2}>Get Started</Text>
                        </TouchableOpacity> */}
                    </View> 
                    : <View />}
            </View>
        )
    }


    const RenderPagination = (index) => {
        return ( 
            <View style={styles.paginationContainer}>
                <View style={styles.paginationDots}>
                    {screens.length > 1 && screens.map((_, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.dot,
                                    i === index
                                        ? { backgroundColor: '#000000' }
                                        : { backgroundColor: 'rgba(0, 0, 0, .2)' },
                                ]}
                                disabled={true}
                            >
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
        )
    }

    return (
        <AppIntroSlider style={{ backgroundColor: 'white' }} 
                        renderItem={RenderScreen} 
                        renderPagination={RenderPagination}
                        data={screens} />
    )
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor:"white",
        flex:1,
        // justifyContent:'center',
        padding:Dimensions.get('window').width * 0.03,
    },
    title: {
        fontFamily:'Urbanist-Black',
        alignSelf:'center',
        fontSize: Dimensions.get('window').width * 0.08,
        fontWeight:"700",
        marginTop:Dimensions.get('window').height/7
    },
    image: {
        marginTop:Dimensions.get('window').width * 0.2,
        marginBottom:Dimensions.get('window').width * 0.15,
        width:Dimensions.get('window').width * 0.75,
        height:Dimensions.get('window').width * 0.75,
        alignSelf:'center',
        resizeMode:'contain',
    },
    subtitle: {
        fontFamily:'Urbanist-Regular',
        alignSelf:'center',
        fontSize: Dimensions.get('window').width * 0.06,
        textAlign:'center'
    },

    // button
    buttonContainer: {
        flexDirection:'row',
        marginLeft:Dimensions.get('window').width * 0.55,
        position:'absolute',
        top:20,
        borderBottomWidth:2
        // bottom: - Dimensions.get('window').height * 0.05,
        // left: Dimensions.get('window').width * 0.55,
    },
    nextButtonText: {
        fontFamily:'Urbanist-Medium',
        alignSelf:'center',
        fontSize: Dimensions.get('window').width * 0.05,
        // position:'absolute',
        marginLeft:5,
        paddingRight:10
    },
    nextButton: {
        // position: 'absolute',
        resizeMode:'contain',
        width:20
    },

    buttonContainer2: {
        marginTop:20,
        borderRadius:20,
        overflow:'hidden'
    },
    nextButtonText2: {
        alignSelf:'center',
        fontFamily:'Urbanist-Medium',
        fontSize:20,
        backgroundColor:'black',
        color:'white',
        padding:10,
    },

    //pagination
    paginationContainer: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.03,
        left: Dimensions.get('window').width * 0.05,
        right: Dimensions.get('window').width * 0.05,
      },
    paginationDots: {
        height: Dimensions.get('window').width * 0.05,
        margin: Dimensions.get('window').width * 0.05,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    dot: {
        width: Dimensions.get('window').width * 0.03,
        height: Dimensions.get('window').width * 0.03,
        borderRadius: 10,
        marginHorizontal: 10,
    },
  
    nextButton: {
        position: 'absolute',
        bottom: -Dimensions.get('window').height * 0.13,
        left: Dimensions.get('window').width * 0.48,
        width:Dimensions.get('window').width * 0.4, 
        resizeMode:'contain'
})