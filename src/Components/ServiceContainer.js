import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Serviceitem from './ServiceItem'
import Ionicon from '@expo/vector-icons/Ionicons'

const height = Dimensions.get('screen').height

export default function Servicecontainer({onPress}) {
    
    return (
        <View style={styles.servicecontainer}>
            {/* <Serviceitem/> */}
            <TouchableOpacity style = {styles.addServiceContainer} onPress={onPress} >
                <Ionicon name='add-outline' size={50}/>
            </TouchableOpacity>
        </View>
    )
}


const styles =  StyleSheet.create({
    servicecontainer : {
        flex : 1,
        marginHorizontal : 20,
        marginVertical : 15,
        flexDirection : 'row'
    },
    addServiceContainer :{
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        width : 150,
        height : 150,
        backgroundColor : 'gray',
        borderRadius : 20,
        opacity : 0.7
    }
})