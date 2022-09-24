import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import ColorPicker from './ColorPicker';

export default function Addcategorymodal({ onPress, isVisible }) {
    const [color,setColor] = useState('fff')

    return (
        <DismissKeyboard>

            <ReactNativeModal isVisible={isVisible} style={styles.modalContainer} backdropOpacity={0.3}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add New Category</Text>
                    <View style={styles.inputContainer}>
                        <Forminput label={'Category Name'} help={'Example'} />
                    </View>
                    <View style={styles.colorContainer}>
                    {/* <ColorPicker
                        colors={COLORS}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={gradientStyles}
                        maxWidth={PICKER_WIDTH}
                        onColorChanged={onColorChanged}
                    /> */}
                    </View>
                    <View style={styles.btnContainer}>
                        <View>
                            <Button type='outline' title={'Cancel'} style={{ marginLeft: 20 }} onPress={onPress} />
                        </View>
                        <View>
                            <Button title={'Save'} style={{ marginRight: 20 }} />
                        </View>

                    </View>
                </View>
            </ReactNativeModal>
        </DismissKeyboard>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        // backgroundColor : 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '70%',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ff7675',
        marginTop: 20
    },
    btnContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        marginBottom: 20
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorContainer : {
        flex : 1,
        width : '100%'
    }
})