import { useState, setState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc, orderBy, limit, getDoc, query, get, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../backend/Firebase.js';
// import { spendAmt } from "./spending.js";
import Nav from './nav';
import { useNavigation } from '@react-navigation/native';



var budgetId;

export default function Input() {
  const [input, setInput] = useState('')
  const [budget, setBudget] = useState('')
  const navigation = useNavigation();

  const [isLoaded] = useFonts({
    "Urbanist-Light": require("../assets/Urbanist/static/Urbanist-Light.ttf")
  })

  if (!isLoaded) {
    return null;
  } 

  function update(num) {
    const newData = doc(collection(db, "budget"))
    setDoc(newData, {
      amount: num,
      timestamp: new Date(),
      remainingAmt: num
    });
  }

  function getRecentlyCreatedBudget() {
    const q = query(collection(db, "budget"), orderBy("timestamp", "desc"), limit(1));
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

        <TouchableOpacity 
                // title="Go to Input"
                onPress={() => navigation.navigate('Login')}
            >
            <Text>Go to Login</Text>
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