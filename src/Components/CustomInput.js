import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicon from '@expo/vector-icons/Ionicons'
import COLORS from '../Constant/colors';
export default function Custominput(
    {width, marginVertical, marginHorizontal, warning, password, defaultValue,multiline,...props})
{
    const [showPass, setshowPass] = useState(false)

    const showPassIcon = showPass ? 'eye-off-outline' : 'eye-outline'

    const handleShowPass = () => {
        setshowPass(!showPass)
    }

    return (
        <View style={[styles.container, {
            width: width,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            borderColor: COLORS.warning,
            borderWidth: !warning ? 1 : 0
        }]} >
            <TextInput {...props} style={styles.input}   secureTextEntry={password ? !showPass : false} 
            defaultValue= {defaultValue}
            multiline={!multiline ? false : true}/>
            {password &&

                <TouchableOpacity onPress={handleShowPass}>
                    <Ionicon name={showPassIcon} size={30} color={COLORS.smallTxt} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 20,
        width: '87%'
    }

})