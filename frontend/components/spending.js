import { useState, setState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../backend/Firebase.js';
import { budgetId } from './input.js';
import images from './images';
import Nav from './nav';

var spendAmt; 
export default function Spending() {
    const [input, setInput] = useState('');
    const [value, setValue] = useState('');
    const [info, setInfo] = useState('');
    const [spending, setSpending] = useState('');
    const [category, setCategory] = useState('');
    const [isCategory, setIsCategory] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // const isCategory = setState(false)
    const [isLoaded] = useFonts({
        "Urbanist-Light": require("../assets/Urbanist/static/Urbanist-Light.ttf")
    })
    
    if (!isLoaded) {
        return null;
    } 
    const category1 = ['food', 'utilities', 'lifestyle']
    const category2 = ['travel', 'entertainment', 'other']

    const iconArray = {
      'food': images.categories.food,
      'utilities': images.categories.utilities,
      'lifestyle': images.categories.lifestyle,
      'travel': images.categories.travel,
      'entertainment': images.categories.entertainment,
      'other': images.categories.other
    }

    // function create(num, det, cat, id) {
    //   const newData = doc(collection(db, "spending"))
    //   setDoc(newData, {
    //     amount: num,
    //     detail: det,
    //     category: cat,
    //     timestamp: new Date(),
    //     budget_id: id
    //   });
    // }

      async function updateRemaining(id, value) {
        console.log(id)
        console.log(value)
        const ref = doc(db, "budget", id)
        const change =  await getDoc(ref).then((docSnap) => {
          // console.log(Number(docSnap.data()['remainingAmt']))
          updateDoc(ref, {
            remainingAmt: Number(docSnap.data()["remainingAmt"]) - Number(value)
          }
        )
      })
    }

    function create(num, det, cat, id) {
      const ref = doc(collection(db, "budget", id, "spending"))
      setDoc(ref, {
        amount: num,
        detail: det,
        category: cat,
        timestamp: new Date(),
        budget_id: id
      });
    }

    const Buttons1 = category1.map((c) =>
        <TouchableOpacity 
          key={c} 
          style={styles.roundButton}
          onPress={() => 
            {setModalVisible(!modalVisible)
            setCategory(c)
            setIsCategory(true)
          }}
          >
            <Image source={(iconArray[c])} style={styles.icons} />
            <Text style={styles.icontxt}>{c}</Text>
            
        </TouchableOpacity>
    )
    const Buttons2 = category2.map((c) => 
        <TouchableOpacity 
          key={c} 
          style={styles.roundButton}
          onPress={() => 
            {setModalVisible(!modalVisible)
            setCategory(c)
            setIsCategory(true)
          }}
          >
          <Image source={(iconArray[c])} style={styles.icons}/>
          <Text style={styles.icontxt}>{c}</Text>
        </TouchableOpacity>
    )
    
    return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.display}>I spent</Text>
        <View style={styles.input} >
          <Text style={styles.icon}>$</Text>
          <TextInput 
            style={styles.inputLine} 
            keyboardType="numeric"
            editable 
            placeholder="0"
            maxLength={7}
            onChangeText={(text)=>{
              setInput(text)
              setValue(text)
              }
            }/>
        </View>
        <Text style={styles.display}>on</Text>

        <View style={styles.input} >
          <TextInput 
            style={styles.inputLine} 
            // keyboardType="numeric"
            editable 
            placeholder="place"
            maxLength={20}
            // adjustsFontSizeToFit
            onChangeText={(text)=>{
              setInput(text)
              setInfo(text)
              }
            }/>
        </View>
        <View >
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            >

                <View style={styles.popup}>
                    <View style={styles.modalView}>
                        <View style={styles.buttonsContainer}>
                            {Buttons1}
                        </View>
                        <View style={styles.buttonsContainer}>
                            {Buttons2}
                        </View>
                    </View>
                </View>
                
            </Modal>
            
            {isCategory ? 
            <Pressable
                style={styles.continue}
                onPress={() => setModalVisible(true)}
                >
                <Text style={styles.textStyle}>({category})</Text>
            </Pressable>
            : 
            <Pressable
                style={styles.continue}
                onPress={() => setModalVisible(true)}
                >
                <Text style={styles.textStyle}>Pick a Category!</Text>
            </Pressable>
            }

        </View>
        <TouchableOpacity style={styles.continueButton} 
          onPress={() => {
            setSpending(input)
            create(value, info, category, budgetId)
            updateRemaining(budgetId, value)
            spendAmt = value
            // setInput("")
            // setIsCategory(false)
          }
            } >
          <Text style={styles.continue}>Continue</Text>
        </TouchableOpacity>
      <Nav />
      </View>
    </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop:  Dimensions.get('window').height - Dimensions.get('window').height*0.85,
    },
    input: {
      flexDirection: 'row',
      // height: 50
      resizeMode:'contain'
    },
    inputLine: {
      fontSize: 50,
      fontFamily:"Urbanist-Light",
      borderBottomColor:'#000000',
      borderBottomWidth:2
    },
    icon: {
      fontSize: 40,
      // fontWeight: 'bold'
    },
    continueButton: {
      margin:"2%",
      //  padding:"1%",
      //  backgroundColor:"#89CFF0",
      borderBottomColor:'#000000',
      borderBottomWidth:2,
      marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.9,
    },
    continue: {
      fontFamily:"Urbanist-Light",
      fontSize:20
    },
    display: {
      paddingTop: 30,
      alignItems: 'center',
      fontSize: 30,
      padding: "7%",
      fontFamily:"Urbanist-Light",
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // padding: "8%",
        margin:"2%",
        borderRadius: 100,
        
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    modalView: {
        // margin:150,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textStyle: {
        color: "black",
        padding: 10,
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      popup: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      }, 
      icons: {
        width: 90,
        height: 90,
      },
      icontxt: {
        fontFamily:"Urbanist-Light",
        fontSize:15,
        paddingBottom: 10,
        paddingTop: 5
      }
    });
 export {spendAmt};