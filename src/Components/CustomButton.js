import React from 'react'
import { TouchableOpacity,Text } from 'react-native'

export default function Custombutton({btnColor,btnWidth,
    borderRadius, borderWidth,titleColor, txtSize,btnTitle, btnHeight, marginHorizontal,marginVertical,
    onPress}) {
    

    return (
        <TouchableOpacity onPress={onPress}
            style={{
                backgroundColor : btnColor,
                width : btnWidth,
                borderRadius : 15,
                borderWidth : borderWidth,
                justifyContent : 'center',
                alignItems : 'center',
                marginHorizontal : marginHorizontal,
                marginVertical : marginVertical
            }}>
            <Text
                style={{
                    color: titleColor,
                    fontSize : !txtSize ? 25: txtSize,
                    paddingVertical : btnHeight ? btnHeight/2 : 0,
                    fontWeight : 'bold'
                }}>{btnTitle}</Text>
        </TouchableOpacity>
    )
}