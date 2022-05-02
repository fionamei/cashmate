import { useState, setState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';
import Nav from '../Navbar/navbar';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setItem } from '../../backend/asyncstorage.js';

// var budgetId;

export default function Budget(props) {
  const [input, setInput] = useState('')
  const [budget, setBudget] = useState()
  const [uid, setUID] = useState('')
  const navigation = useNavigation();

  const [isLoaded] = useFonts({
    "Urbanist-Light": require("../../assets/Urbanist/static/Urbanist-Light.ttf")
  })

  if (!isLoaded) {
    return null;
  } 

  /***************************************************/
  /* THESE ARE THE FIREBASE-RELATED METHODS          */
  /*                                                 */
  /* Methods included in this file:                  */
  /*   update() => sets a new budget within 'user'   */
  /*   onAuthStateChanged() => handles login         */
  /*   getRecentlyCreatedBudget()  => sets           */
  /*     global variable budget id to the most       */
  /*     recent one                                  */
  /***************************************************/

  /****************** UPDATE ****************/
  function update(num) {
    const ref = doc(collection(db, "user", props.uID, "budget"))
    setDoc(ref, {
      amount: num,
      timestamp: new Date(),
      remainingAmt: num
    });
    setItem('budget',String(num))
    setItem("remaining",String(num))
    setItem("stringpercent", "100%")
    setItem("percentage", "100")

    const ref2 = query(collection(db, "user", props.uID, "budget"), orderBy("timestamp", "desc"), limit(1));
    getDocs(ref2).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setItem('budgetID',doc.id)
        // setBudgetID(doc.id)
        
      })
    })

  }

  /****************** UID ******************/
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //       const id = user.uid;
  //       setUID(id)
  //   } else {
  //       console.log("NO USER SIGNED IN")
  //   }
  // });
  const auth = getAuth();
  const user = auth.currentUser;
  
  /****************** BUDGETID ******************/
  // function getRecentlyCreatedBudget() {
  //   const q = query(collection(db, "user", props.uID, "budget"), orderBy("timestamp", "desc"), limit(1));
  //   const q2 = getDocs(q).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //     budgetId = doc.id
  //     })
  //   })
  // }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.display}>I will spend under</Text>
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
              setBudget(text)
              }}/>
        </View>
        <Text style={styles.display}>this week</Text>
        <TouchableOpacity style={styles.continueButton} 
          onPress={() => {
            // setBudget(input)
            if (budget) {
              setBudget(input)
              update(input)
              navigation.replace('Profile')
            } else {
              Alert.alert("Please input a budget")
            }
            // setBudget(input)
            // update(input)
            // getRecentlyCreatedBudget()
            // navigation.replace('Spending')}
            }} >
          <Text style={styles.continue}>Continue</Text>
        </TouchableOpacity>

        
        {/* <Nav /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 150,
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
    paddingTop: 50,
    alignItems: 'center',
    fontSize: 30,
    padding: 20,
    fontFamily:"Urbanist-Light",
  }
  });

  // export {budgetId};