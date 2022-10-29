import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import Servicescreen from '../Screens/ServiceScreen';
import Settingscreen from '../Screens/SettingScreen';
import Turntrackingscreen from '../Screens/TurnTrackingScreen';
import EmployeesScreen from '../Screens/EmployeeScreen';
import Inventoryscreen from '../Screens/InventoryScreen';
import Drawercontent from './DrawerContent';
import Settingnavigation from '../Navigations/SettingNavigation';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator()

export default function Appdrawer() {
    const isLogin = useSelector(state => state.auth.isLogin)
    const navigation  = useNavigation()
    useEffect(() => {
        if (!isLogin) {
            navigation.reset({
                index : 0,
                routes : [{name : 'LoginScreen'}]
            })
        }
    }, [isLogin])

    const optionScreen = (screenName) => {
        return {
            title : screenName
        }
    }
    return (
    <Drawer.Navigator   screenOptions={{headerShown : false}}
                        drawerContent={(props) => <Drawercontent {...props}/>}>
        <Drawer.Screen name="ServiceScreen" component={Servicescreen} options={optionScreen('Services')}/>
        <Drawer.Screen name="TurnTrackingScreen" component={Turntrackingscreen} options={optionScreen('Turn Tracking')}/>
        <Drawer.Screen name="EmployeeScreen" component={EmployeesScreen} options={optionScreen('Employees')}/>
        <Drawer.Screen name="InventoryScreen" component={Inventoryscreen} options={optionScreen('Inventory')}/>
        <Drawer.Screen name="SettingNavigation" component={Settingnavigation} options={optionScreen('Setting')}/>
    </Drawer.Navigator>
    )
}
