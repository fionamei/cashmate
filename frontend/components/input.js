import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default function Input() {
  return (
    <View style={styles.container}>
      <Text>Cashmate</Text>
      <TextInput 
        style={styles.input}
        editable
      />
      <StatusBar style="auto" />
    </View>
  );
}
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#7a42f4',
    borderWidth: 1,
    width:200
 },
});
