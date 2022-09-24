import React from 'react'
import { Button } from '@rneui/base'
import { StyleSheet, View } from 'react-native'

export default function Subcatitem({title}) {
    
    return (
        <View style ={styles.container}>

        <Button title={title}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        minWidth : '10%',
        marginHorizontal : 10,
        marginVertical : 10
    }
})