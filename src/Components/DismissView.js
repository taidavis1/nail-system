import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard = ({ children }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {children}
        </TouchableWithoutFeedback>
    );
}

export default DismissKeyboard