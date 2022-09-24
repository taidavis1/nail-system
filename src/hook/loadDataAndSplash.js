import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from 'react-native-vector-icons/Entypo'

export const useLoadDataAndSplash = () => {

    SplashScreen.preventAutoHideAsync()

    const [loadingSplash, setLoadingSplash] = useState(false)

    useEffect(() => {
        const prepare = async () => {
            try {
                await Font.loadAsync(Entypo.font)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingSplash(true)
                SplashScreen.hideAsync()
            }
        }

        prepare()
    }, [])

    return loadingSplash
}