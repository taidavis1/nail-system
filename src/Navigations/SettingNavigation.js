import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Settingscreen from '../Screens/SettingScreen'

const SettingStack = createStackNavigator()

export default function Settingnavigation(props) {
    

    return (
        <SettingStack.Navigator screenOptions={{headerShown : false}}>
            <SettingStack.Screen name='Settings' component={Settingscreen}/>
        </SettingStack.Navigator>
    )
}
