import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Loginscreen from '../Screens/LoginScreen';
import Appdrawer from '../Drawer/AppDrawer';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator()

export default function Appnavigation(props) {
    const token = useSelector(state => state.auth.token)

    return (
        <Stack.Navigator  screenOptions={{
            headerShown : false,
        }} 
            initialRouteName= {token ? 'AppDrawer' : 'LoginScreen'}
        >
            <Stack.Screen name='LoginScreen' component={Loginscreen}/>
            <Stack.Screen name= 'AppDrawer' component={Appdrawer}/>
        </Stack.Navigator>
    )
}
