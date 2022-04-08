import * as React from 'react';
import { TouchableOpacity, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddFriendButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            title="Search">
            <Image source={require('../../assets/searchicons/addfriend.png')} style={styles.add}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    add: {
        width: 27,
        height: 25,
    }
})