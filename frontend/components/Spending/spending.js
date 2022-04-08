import { useState, setState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Image, Text, View, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';
// import { budgetId } from '../Budget/budget.js';
import iconImages from './images';
import Nav from '../Navbar/navbar';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Spending() {
    const [input, setInput] = useState('');
    const [value, setValue] = useState();
    const [info, setInfo] = useState('');
    const [BUDGETID, setBUDGETID] = useState('')
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
    const category1 = ['food', 'utilities', 'lifestyle']
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
      setDoc(ref, {
        amount: num,
        detail: det,
        category: cat,
        timestamp: new Date(),
        budget_id: BUDGETID
      });
    }
    
    const icons = {
      'food': iconImages.categories.food,
      'utilities': iconImages.categories.utilities,
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
            <Image source={(icons[c])} style={styles.icons} />
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
          <Image source={(icons[c])} style={styles.icons}/>
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
              placeholder="place"
              maxLength={20}
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
                              {RowOne}
                          </View>
                          <View style={styles.buttonsContainer}>
                              {RowTwo}
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
      paddingTop:  Dimensions.get('window').height - Dimensions.get('window').height*0.85,
    },
    input: {
      flexDirection: 'row',
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
    },
    continueButton: {
      margin:"2%",
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
        margin:"2%",
        borderRadius: 100,
        
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    modalView: {
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