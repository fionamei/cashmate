import { useState, setState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from '@use-expo/font';
import { doc, collection, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase.js'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default function Input() {
  const [input, setInput] = useState('')
  const [budget, setBudget] = useState('')

  const [isLoaded] = useFonts({
    "Urbanist-Light": require("../assets/Urbanist/static/Urbanist-Light.ttf")
  })

  if (!isLoaded) {
    return null;
  } 

  function DisplayBudget() {
    return (
       <Text
        style={styles.display}>
          This is my budget: {budget}
       </Text>
    )
  }

  function update(num) {
    const newData = doc(collection(db, "numbers"))
    setDoc(newData, {
      number: num
    });
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
            onChangeText={(text)=>setInput(text)}/>
        </View>
        {/* < DisplayBudget /> */}
        <Text style={styles.display}>this week</Text>
        <TouchableOpacity style={styles.button} 
          onPress={() => {
            setBudget(input)
            update(parseInt(input))}
            } >
          <Text style={styles.continue}>Continue</Text>
        </TouchableOpacity>
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
  button: {
    margin:"2%",
    //  padding:"1%",
    //  backgroundColor:"#89CFF0",
    borderBottomColor:'#000000',
    borderBottomWidth:2,
    marginTop: "75%",
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
