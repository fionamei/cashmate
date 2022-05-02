import React from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useFonts } from 'expo-font';
import { getItem, setItem } from '../../backend/asyncstorage';
import { useNavigation } from '@react-navigation/native';

const screens = [
    {
        id: '1',
        title: "Set Goals",
        subtitle: "Choose a weekly budget",
        image: require('./assets/goals.png'),
        continue: false
    },
    {
        id: '2',
        title: "Record Spendings",
        subtitle: "Input spendings for your own record",
        image: require('./assets/spendings.png'),
        continue: false
    },
    {
        id: '3',
        title: "Save With Friends",
        subtitle: "Find friends and compare your progress!",
        image: require('./assets/save.png'),
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
        "Urbanist-Regular": require("../../assets/Urbanist/static/Urbanist-Regular.ttf")
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
                        <TouchableOpacity 
                         onPress={() => {navigation.replace('FirstScreen'); recordVisit}}>
                             <Image style={styles.nextButton} source={require("./assets/next.png")}/>
                        </TouchableOpacity>
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
        justifyContent:'center',
        padding:Dimensions.get('window').width * 0.03,
    },
    title: {
        fontFamily:'Urbanist-Black',
        alignSelf:'center',
        fontSize: Dimensions.get('window').width * 0.08,
        fontWeight:"700"
    },
    image: {
        marginTop:Dimensions.get('window').width * 0.2,
        marginBottom:Dimensions.get('window').width * 0.2,
        width:Dimensions.get('window').width * 0.9,
        alignSelf:'center',
        resizeMode:'contain'
    },
    subtitle: {
        fontFamily:'Urbanist-Regular',
        alignSelf:'center',
        fontSize: Dimensions.get('window').width * 0.06,
        textAlign:'center'
    },

    //pagination
    paginationContainer: {
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.08,
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
        bottom: - Dimensions.get('window').height * 0.05,
        left: Dimensions.get('window').width * 0.85,
        width:Dimensions.get('window').width * 0.05, 
        resizeMode:'contain'
    }
})