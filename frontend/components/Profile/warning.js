import { useState, setState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import Nav from '../Navbar/navbar';
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Warning() {
    return (
        <Text>Please input your budget for the week</Text>
    )
}