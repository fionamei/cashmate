import * as React from 'react';
import { TouchableOpacity, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            title="Info"
            color="#00cc00">
            <Image source={require('../../assets/settings.png')} style={styles.settings}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settings: {
        width: 25,
        height: 25,
    }
})