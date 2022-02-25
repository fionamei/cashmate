import { useState, setState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default function Input() {
  const [input, setInput] = useState('')
  const [budget, setBudget] = useState('')

  const displayBudget = () => {
    <Text>This is my budget: {budget}</Text>
  }

  return (
    <View style={styles.container}>
      <Text>budget:</Text>
      <TextInput style={styles.input} editable onChangeText={(text)=>setInput(text)}/>
      <TouchableOpacity style={styles.button} onPress={() => setBudget(input)} >
      {/* <TouchableOpacity style={styles.button} onPress={e => setBudget(e)} > */}
        <Text>Enter</Text>
      </TouchableOpacity>
      <Text style={styles.display}>This is my budget: {budget}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80
  },
  input: {
    borderColor: '#000000',
    borderWidth: 2,
    width:200, 
    fontSize:20
 },
 button: {
   margin:"2%",
   padding:"1%",
   backgroundColor:"#89CFF0"
 },
 display: {
   paddingTop: 50,
   alignItems: 'center',
   fontSize: 30
 }
});
