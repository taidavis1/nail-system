import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useValidateEmail, useValidatePassword, useValidateUsername } from '../hook/useValidate';
import Largetext from '../Components/LargeText';
import Custominput from '../Components/CustomInput';
import Smalltext from '../Components/SmallText';
import Custombutton from '../Components/CustomButton';
import DismissKeyboard from '../Components/DismissKeyboard';
import COLORS from '../Constant/colors';
import authServices from '../Services/AuthServices';
import { showMessage } from "react-native-flash-message";
import { useDispatch } from 'react-redux';
import { userLogin } from '../store/slices/auth/authAction';
import { useNavigation } from '@react-navigation/native';

export default function Loginscreen(props) {
    const navigation = useNavigation()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [validate, setvalidate] = useState({
        email : {isValid : true, error : ''},
        password : {isValid : true, error : ''}
    })
    const dispatch = useDispatch()
    // const userToken = useSelector(state => state.user.userToken)
    const handleLogin = () => {
        let validate = {
            email : useValidateEmail(email),
            password : useValidatePassword(password)
        }
        setvalidate(validate)
        if (validate.email.isValid &&validate.password.isValid) {
            dispatch(userLogin({email : email,password : password}))
            .then(res => {
                if (!res.payload.error) {
                    navigation.replace('AppDrawer')
                    showMessage({
                        message : 'Notification',
                        description : res.payload.message,
                        type : 'success'
                    })
                }else {
                    showMessage({
                        message : 'Notification',
                        description : 'Invalid Username or Password',
                        type : 'danger'
                    })
                }
            })
            .catch(err => {
                showMessage({
                    message : 'Notification',
                    description : 'Internal Error',
                    type : 'danger'
                })
            })
        }
    }
    return (
            <DismissKeyboard>
                <View style = {styles.container}>
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.loginBox}>
                    <View style={styles.header}>
                        <Largetext bold>Hello!</Largetext>
                        <Largetext>Welcome Back</Largetext>
                    </View>
                    <View style={styles.inputContainer}>
                        <Custominput placeholder={'Email'} marginVertical={10}
                            onChangeText={(value) => setemail(value)} 
                            warning = {validate.email.isValid}/>
                            {!validate.email.isValid && 
                            <Smalltext >
                                {validate.email.error}
                            </Smalltext>}
                        <Custominput placeholder={'Password'} marginVertical={10} password
                            onChangeText={value => setpassword(value)} 
                            warning = {validate.password.isValid}/>
                            {!validate.password.isValid && 
                            <Smalltext >
                                {validate.password.error}
                            </Smalltext>}
                        {/* <Smalltext align={'center'} color={'red'}>{message}</Smalltext> */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Smalltext align={'right'} bold>Tạo tài khoản ngay</Smalltext>
                        </TouchableOpacity> */}
                    </View>
                    <Custombutton btnTitle={'Sign In'} btnColor={'#fd6b68'}
                        btnHeight={30} marginVertical={30} onPress={handleLogin} 
                        />
                    </View>
                </SafeAreaView>
                </View>
            </DismissKeyboard>
    )
}
const styles = StyleSheet.create({
    container : {
        backgroundColor : COLORS.background,
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    wrapper: {
        flex: 1,
        marginHorizontal: 20,
        width : '50%',
        marginVertical : 150
    },
    header: {
        marginTop: 20
    },
    inputContainer: {
        marginTop: 40
    },

})