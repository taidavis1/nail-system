import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import LogoNailsSys from '../../assets/icons/LogoNailsSys';
import Ionicon from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/slices/auth/authSlice';
export default function Drawercontent(props) {
    const navigation = useNavigation()
    const [active, setactive] = useState('Services')
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#dfe4ea', '#f1f2f6', '#ffffff']}
                style={styles.background}
            />
            <View style={styles.header}>
                <View style={styles.headerImg}>
                    <LogoNailsSys width={100} height={100} />
                </View>
            </View>
            <DrawerContentScrollView style={styles.scrollDrawer}>
                <DrawerItem
                    focused={active === 'Services' ? true : false}
                    label={'Services'}
                    icon={({ size, color }) => (<Ionicon name='apps-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('Services')
                        navigation.navigate('ServiceScreen')
                    }}
                    activeTintColor='#40407a'
                />
                <DrawerItem
                    focused={active === 'TurnTracking' ? true : false}
                    label={'Turn Tracking'}
                    icon={({ size, color }) => (<Ionicon name='analytics-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('TurnTracking')
                        navigation.navigate('TurnTrackingScreen')
                    }}
                    activeTintColor='#40407a'
                />
                <DrawerItem
                    focused={active === 'Employees' ? true : false}
                    label={'Employees'}
                    icon={({ size, color }) => (<Ionicon name='people-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('Employees')
                        navigation.navigate('EmployeeScreen')
                    }}
                    activeTintColor='#40407a'
                />
                <DrawerItem
                    focused={active === 'Inventory' ? true : false}
                    label={'Inventory'}
                    icon={({ size, color }) => (<Ionicon name='cube-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('Inventory')
                        navigation.navigate('InventoryScreen')
                    }}
                    activeTintColor='#40407a'
                />
                <DrawerItem
                    focused={active === 'Settings' ? true : false}
                    label={'Settings'}
                    icon={({ size, color }) => (<Ionicon name='settings-outline' size={size} color={color} />)}
                    onPress={() => {
                        setactive('Settings')
                        navigation.navigate('SettingNavigation')
                    }}
                    activeTintColor='#40407a'
                />
                <DrawerItem
                    focused={active === 'LogOut' ? true : false}
                    style={{
                        backgroundColor: '#fab1a0'
                    }}
                    label={'Log Out'}
                    icon={({ size, color }) => (<Ionicon name='arrow-forward-circle-outline' size={size} color={color} />)}
                    onPress={() => {
                        Alert.alert(
                            "Sure ?",
                            "Do you wanna Log Out",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "OK", 
                                    onPress: () => {
                                        // setactive('LogOut')
                                        dispatch(logOut())
                                    },
                                    style : 'destructive'
                                }
                            ]
                        );
                    }}
                    activeTintColor='#40407a'
                />

            </DrawerContentScrollView>
            <View style={styles.closeDrawer}>
                <Text>©Copyright ... 2022 </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    header: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImg: {
        //   backgroundColor : 'blue',
        padding: 30,
        borderRadius: 20,

    }
    ,
    scrollDrawer: {
        backgroundColor: 'cyan',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20

    },
    closeDrawer: {
        width: '100%',
        backgroundColor: '#33d9b2',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

