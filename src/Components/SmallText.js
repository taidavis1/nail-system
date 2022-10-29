import React from 'react'
import { StyleSheet, Text } from 'react-native'
import COLORS from '../Constant/colors';


export default function Smalltext({children, align, color, bold,size,marginH ,marginV,...props}) {
    

    return (

        <Text style = {[styles.txt, {
            textAlign : !align ?'left' : align,
            color : !color ? COLORS.smallTxt : color,
            fontWeight : bold ? 'bold' : 'normal',
            fontSize : !size ? 20 : size,
            marginHorizontal : !marginH ? 0 : marginH,
            marginVertical : !marginV ? 0 : marginV
        }]}>{children}</Text>
    )
}
const styles = StyleSheet.create({
    txt : {
        // fontWeight : 'bold',
        fontSize : 20,
        // textAlign : 'center'
    }
})