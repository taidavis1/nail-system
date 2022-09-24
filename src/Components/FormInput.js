import React from 'react'
import { StyleSheet, TextInput,View, Text, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'

export default function Forminput({label, help, onChange}) {
    const sendInputValue = (value) => {
        onChange(value)
    }

    return (
        <View style = {styles.container}>
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
        width : '70%',
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