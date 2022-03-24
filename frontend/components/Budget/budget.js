import { useState, setState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc, where } from 'firebase/firestore';
import { db } from '../../backend/Firebase.js';
// import { spendAmt } from "./spending.js";
import Nav from '../Navbar/navbar';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";


var budgetId;

export default function Budget() {
  const [input, setInput] = useState('')
  const [budget, setBudget] = useState('')
  const [uid, setUID] = useState('')
  const navigation = useNavigation();

  const [isLoaded] = useFonts({
    "Urbanist-Light": require("../assets/Urbanist/static/Urbanist-Light.ttf")
  })

  if (!isLoaded) {
    return null;
  } 

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
      const id = user.uid;
      setUID(id)
  } else {
      console.log("NO USER SIGNED IN")
  }
  });
  
  function update(num) {
    const ref = doc(collection(db, "user", uid, "budget"))
    // const newData = doc(collection(db, "user", ))
    setDoc(ref, {
      amount: num,
      timestamp: new Date(),
      remainingAmt: num
    });
  }

  function getRecentlyCreatedBudget() {
    const q = query(collection(db, "user", uid, "budget"), orderBy("timestamp", "desc"), limit(1));
    const q2 = getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
      budgetId = doc.id
      })
    })
  }

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
            onChangeText={(text)=>setInput(text)}/>
        </View>
        <Text style={styles.display}>this week</Text>
        <TouchableOpacity style={styles.continueButton} 
          onPress={() => {
            setBudget(input)
            update(input)
            getRecentlyCreatedBudget()
            navigation.navigate('Spending')
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
    paddingTop: 150,
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
    paddingTop: 50,
    alignItems: 'center',
    fontSize: 30,
    padding: 20,
    fontFamily:"Urbanist-Light",
  }
  });

  export {budgetId};