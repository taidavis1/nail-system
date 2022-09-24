import { Header } from '@rneui/base'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@rneui/themed'

export default function HeaderBase({screenName}) {
    const navigation = useNavigation()
    const openDrawer = () => {
        navigation.openDrawer()
    }
    const {theme} = useTheme()

    return (
        <Header centerComponent={<Text style={[styles.txtHeader,{color : theme.colors.black}]}>{screenName}</Text>} 
                leftComponent={<TouchableOpacity onPress={openDrawer}><Ionicon name='menu' size={25}/></TouchableOpacity>}/>
    )
}

const styles = StyleSheet.create({
    txtHeader : {
        fontSize : 20,
        fontWeight : 'bold'
    }
})