import { useState, setState, useEffect } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';
// import { budgetId } from '../Budget/budget.js';
import iconImages from './images';
import Nav from '../Navbar/navbar';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ExpoFastImage from 'expo-fast-image'

export default function Spending() {
    const [input, setInput] = useState('');
    const [value, setValue] = useState();
    const [info, setInfo] = useState('');
    const [BUDGETID, setBUDGETID] = useState('')
    const [budget, setBudget] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [uid, setUID] = useState('');
    const [spending, setSpending] = useState();
    const [category, setCategory] = useState();
    const [isCategory, setIsCategory] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    // const [uid, setUID] = useState('');

    const [isLoaded] = useFonts({
        "Urbanist-Light": require("../../assets/Urbanist/static/Urbanist-Light.ttf")
    })
    
    if (!isLoaded) {
        return null;
    } 
    const category1 = ['food', 'shopping', 'lifestyle']
    const category2 = ['travel', 'entertainment', 'other']

    async function updateRemaining(id, value) {
      const ref = doc(db, "user", uid, "budget", id)
      const change =  await getDoc(ref).then((docSnap) => {
        updateDoc(ref, {
          remainingAmt: Number(docSnap.data()["remainingAmt"]) - Number(value)
        })
      })
    }
  
    function create(num, det, cat, id) {
      const ref = doc(collection(db, "user", uid, "budget", id, "spending"))
      let percent = ((Number(remaining) - Number(value))/ Number(budget) * 100).toFixed(2)
      setDoc(ref, {
        amount: num,
        detail: det,
        category: cat,
        timestamp: new Date(),
        budget_id: BUDGETID,
        percentage: percent,
        like: 0,
        smile: 0,
        sad: 0,
        angry: 0,
        woah: 0,
        laugh: 0
      });
    }
    
    const icons = {
      'food': iconImages.categories.food,
      'shopping': iconImages.categories.shopping,
      'lifestyle': iconImages.categories.lifestyle,
      'travel': iconImages.categories.travel,
      'entertainment': iconImages.categories.entertainment,
      'other': iconImages.categories.other
  }

    /***************************************************/
    /* THESE ARE THE FIREBASE-RELATED METHODS          */
    /*                                                 */
    /* Methods included in this file:                  */
    /*   create() => sets new spending within 'budget' */
    /*   onAuthStateChanged() => handles login         */
    /*   getRecentlyCreatedBudget()  => sets           */
    /*     global variable budget id to the most       */
    /*     recent one                                  */
    /***************************************************/

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUID(uid)

            const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
            const q2 = getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setBUDGETID(doc.id)
                    setBudget(doc.data()['amount'])
                    setRemaining(doc.data()['remainingAmt'])
                })
            })
        }
    })

    const RowOne = category1.map((c) =>
        <TouchableOpacity 
          key={c} 
          style={styles.roundButton}
          onPress={() => 
            {setModalVisible(!modalVisible)
            setCategory(c)
            setIsCategory(true)
          }}
          >
            <ExpoFastImage 
              uri={(icons[c])} 
              cacheKey={c + '1'} // there was an error so i added 1 to refresh cacheing
              style={styles.icons} 
            />
            <Text style={styles.icontxt}>{c}</Text>  
        </TouchableOpacity>
    )
    const RowTwo = category2.map((c) => 
        <TouchableOpacity 
          key={c} 
          style={styles.roundButton}
          onPress={() => 
            {setModalVisible(!modalVisible)
            setCategory(c)
            setIsCategory(true)
          }}
          >
          <ExpoFastImage 
              uri={(icons[c])} 
              cacheKey={c + '1'} // there was an error so i added 1 to refresh cacheing
              style={styles.icons} 
          />
          {/* <Image source={(icons[c])} style={styles.icons}/> */}
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
              editable 
              placeholder="description"
              maxLength={20}
              onChangeText={(text)=>{
                setInput(text)
                setInfo(text)
                }
              }/>
          </View>
          <View>
              <Modal
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
              }}
              >
                <TouchableOpacity
                  activeOpacity={1} 
                  style={styles.modalTouch}
                  onPressOut={() => {setModalVisible(false)}}
                  >

                    <View style={styles.popup}>
                        <View style={styles.modalView}>
                            <View style={styles.buttonsContainer}>
                                {RowOne}
                            </View>
                            <View style={styles.buttonsContainer}>
                                {RowTwo}
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>
              </Modal>
              <View style={styles.underline}>
                {isCategory ? 
                <Pressable
                    style={styles.continue}
                    onPress={() => setModalVisible(true)}
                    >
                    <Text style={styles.chosen}>({category})</Text>
                </Pressable>
                : 
                <Pressable
                    style={styles.continue}
                    onPress={() => setModalVisible(true)}
                    >
                    <Text style={styles.textStyle}>category</Text>
                </Pressable>
              }</View>

          </View>
          <TouchableOpacity style={styles.continueButton} 
            onPress={() => {
              if (value && info && category) {
                // console.log("budgetid: ", budgetId)
                // console.log("uid: ", user.uid)
                setSpending(input)
                create(value, info, category, BUDGETID)
                updateRemaining(BUDGETID, value)
                navigation.replace('Profile')
              } else {
                  Alert.alert("Missing price, place, or category!")
              }
            }} >
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
      paddingTop:  Dimensions.get('window').height - Dimensions.get('window').height*0.9,
    },
    input: {
      flexDirection: 'row',
      resizeMode:'contain'
    },
    inputLine: {
      fontSize: Dimensions.get('window').width*0.115,
      // fontSize: 50,
      fontFamily:"Urbanist-Light",
      borderBottomColor:'#000000',
      borderBottomWidth:2
    },
    icon: {
      fontSize: Dimensions.get('window').width*0.09,
      // fontSize: 40,
    },
    continueButton: {
      margin:"2%",
      borderBottomColor:'#000000',
      borderBottomWidth:2,
      marginTop: Dimensions.get('window').height - Dimensions.get('window').height*0.9,
    },
    continue: {
      fontFamily:"Urbanist-Light",
      fontSize: Dimensions.get('window').height*0.025,
      // fontSize:20
    },
    display: {
      // paddingTop: 30,
      // alignItems: 'center',
      fontSize: Dimensions.get('window').width*0.07,
      // fontSize: 30,
      padding: "7%",
      fontFamily:"Urbanist-Light",
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin:"2%",
        borderRadius: 100,
        
    },
    buttonsContainer: {
        flexDirection: "row",
        // backgroundColor: 'pink'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: Dimensions.get('window').width * .065,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: Dimensions.get('window').width * .85,
        height: Dimensions.get('window').height * .35,
      },
      modalTouch: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // backgroundColor: 'red',
      },
      textStyle: {
        color: "#bbbbbb",
        padding: '2%',
        textAlign: "center",
        fontSize: Dimensions.get('window').width*0.07,
        // fontSize: 30,
        fontFamily:"Urbanist-Light",
      },
      chosen: {
        color: "#000000",
        padding: '2%',
        textAlign: "center",
        fontSize: Dimensions.get('window').width*0.07,
        fontFamily:"Urbanist-Light",
      },
      underline: {
        borderBottomColor:'#000000',
        borderBottomWidth:2,
        height: Dimensions.get('window').height * .055,
        // height: 50,
        // backgroundColor: 'red'
      },
      popup: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
      }, 
      icons: {
        // width: 90,
        // height: 90,
        width: Dimensions.get('window').width * .22,
        height: Dimensions.get('window').width * .22,
      },
      icontxt: {
        fontFamily:"Urbanist-Light",
        fontSize: Dimensions.get('window').height * .016,
        paddingBottom: '4%',
        paddingTop: '2%',
        // backgroundColor: 'blue'
      },
      // outer: {
      //   // backgroundColor: 'pink'
      // }
    });