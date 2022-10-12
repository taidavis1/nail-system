import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View ,Text} from 'react-native'
import Ionicon  from '@expo/vector-icons/Ionicons';

export default function Listbox({title, onPress, value , readOnly}) {

    return (
        <View  style={styles.wrapper}>
            <Text style={styles.txtTitle}>Select {title}</Text>
        { !readOnly ?
            (
        <TouchableOpacity style ={styles.container} onPress={onPress}>
            <Text style = {styles.title}>
                {value}
            </Text>
            <Ionicon name='caret-down-outline' size={25} style={{marginRight : 10}}/>
        </TouchableOpacity>
            ) :
            (
                <View style ={styles.container} >
            <Text style = {[styles.title,{
                paddingVertical : 5
            }]}>
                {value}
            </Text>
        </View>
            )
        }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper :{
        width : '100%',
        marginHorizontal : 10
    },
    container : {
        borderColor : 'red',
        width : '90%',
        marginHorizontal : 10,
        borderRadius : 15,
        borderWidth :1,
        backgroundColor : '#ecf0f1',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'

    },
    txtTitle : {
        paddingVertical : 5,
        paddingHorizontal : 10,
        fontWeight : 'bold',
        fontSize : 15,
        color : 'green'
    },
    title : {
        paddingHorizontal : 10,
        fontWeight : 'bold'
    }
})
