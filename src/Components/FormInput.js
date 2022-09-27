import React from 'react'
import { StyleSheet, TextInput,View, Text, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'

export default function Forminput({label, help, onChange, width}) {
    const sendInputValue = (value) => {
        onChange(value)
    }

    return (
        <View style = {[styles.container,{
            width : width ? width : '70%',
            marginHorizontal : 10
        }]}>
            <View style = {styles.label}>
                <Text style = {styles.labelTxt}>{label}</Text>
            </View>
            <View style = {styles.inputContainer} >
                <TextInput placeholder={help} style={styles.input}  
                            onChangeText={(value) =>sendInputValue(value)}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        
    },
    label : {
        paddingVertical : 10
    },
    labelTxt : {
        color : 'green',
        fontWeight : 'bold',
        fontSize : 16
    },
    inputContainer  : {
        borderWidth : 1,
        borderColor : 'red',
        height : 40,
        borderRadius : 15,
        justifyContent : 'center',
        alignItems : 'center'
    },
    input : {
        width : '100%',
        paddingHorizontal : 10
    }
})