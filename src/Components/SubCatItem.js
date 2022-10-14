import React,{useState} from 'react'
import { Button } from '@rneui/base'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

export default function Subcatitem({ title, id, pressSubCat }) {
    const currentSubCatID = useSelector(state => state.category.currentSubCat)

    return (
        <View style={styles.container}>
            <Button title={title} color={(id === currentSubCatID ? 'warning' : 'primary')}
                onPress={() => pressSubCat(id)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        minWidth: '10%',
        marginHorizontal: 10,
        marginVertical: 10
    },
})