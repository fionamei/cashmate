import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Nav from './components/nav';

export default function Home({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#FFFFFF" }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Input"
                onPress={() => navigation.navigate('Input')}
            />
            <Button
                title="Go to Spending"
                onPress={() => navigation.navigate('Spending')}
            />
            <Nav />
        </View>
    )
}