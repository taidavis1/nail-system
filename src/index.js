import React from 'react'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Appdrawer from './Drawer/AppDrawer';
import { Provider } from 'react-redux';
import {store} from './store';
import Loginscreen from './Screens/LoginScreen';
import FlashMessage from "react-native-flash-message";
import Appnavigation from './Navigations/AppNavigation';

const theme = createTheme({
    components: {
        Switch: {

        }
    },
    lightColors: {
    },
    darkColors: {
    },

})

export default function Main(props) {


    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <ThemeProvider theme={theme}>
                        {/* <Loginscreen/> */}
                        <Appnavigation/>
                        <FlashMessage position="top" />
                    </ThemeProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
}
