import React from 'react'
import { StyleSheet, Text ,View} from 'react-native'
import COLORS from '../Constant/colors';

export default function Largetext({children, bold}) {
    

    return (
        <View>

        <Text style = {[styles.txt,{
            fontWeight : !bold ? 'normal' : 'bold'
        }]}>{children}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    txt : {
        fontSize : 35,
        color : COLORS.text,
        textAlign : 'center'
    }
})