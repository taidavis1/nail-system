import React from 'react'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Appdrawer from './Drawer/AppDrawer';
import { Provider } from 'react-redux';
import {store} from './store';

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
                        <Appdrawer/>
                    </ThemeProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        </Provider>
    )
}
