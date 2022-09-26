import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Serviceitem from './ServiceItem'
import Ionicon from '@expo/vector-icons/Ionicons'


export default function Servicecontainer(props) {
    

    return (
        <View style={styles.servicecontainer}>
            <Serviceitem/>
            <TouchableOpacity style = {styles.addServiceContainer}>
                
            </TouchableOpacity>
        </View>
    )
}


const styles =  StyleSheet.create({
    servicecontainer : {
        flex : 1
    },
    addServiceContainer :{
        // flexDirection : 'row',
        // justifyContent : 'center',
        alignItems : 'center',
    }
})