import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Servicescreen from '../Screens/ServiceScreen';
import Settingscreen from '../Screens/SettingScreen';
import Turntrackingscreen from '../Screens/TurnTrackingScreen';
import EmployeesScreen from '../Screens/EmployeeScreen';
import Inventoryscreen from '../Screens/InventoryScreen';


const Drawer = createDrawerNavigator()

export default function Appdrawer() {

    const optionScreen = (screenName) => {
        return {
            title : screenName
        }
    }
    return (
    <Drawer.Navigator screenOptions={{headerShown : false}}>
        <Drawer.Screen name="ServiceScreen" component={Servicescreen} options={optionScreen('Services')}/>
        <Drawer.Screen name="TurnTrackingScreen" component={Turntrackingscreen} options={optionScreen('Turn Tracking')}/>
        <Drawer.Screen name="EmployeeScreen" component={EmployeesScreen} options={optionScreen('Employees')}/>
        <Drawer.Screen name="InventoryScreen" component={Inventoryscreen} options={optionScreen('Inventory')}/>
        <Drawer.Screen name="SettingScreen" component={Settingscreen} options={optionScreen('Setting')}/>
    </Drawer.Navigator>
    )
}
