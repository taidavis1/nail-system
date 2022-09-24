import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import  { RgbColorPicker } from './ColorPicker';
import CategoryServices from '../Services/CategoryServices';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Addsubcatmodal({ onPress, isVisible }) {
    const [subCatName, setSubCatName] = useState()
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const getInputValue = (value) => {
        setSubCatName(value)
    }
    const clickSave = () => {
        axios.post('http://127.0.0.1:5000/Add_Subcat',{
            name : subCatName,
            category : currentCategoryID,
            services : []
        }).then(
            res => {
                console.log(res)
                onPress()  }      
            ).catch(err => console.log(err))
    }

    return (
        <DismissKeyboard>

            <ReactNativeModal isVisible={isVisible} style={styles.modalContainer} backdropOpacity={0.3}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add New SubCat</Text>
                    <View style={styles.inputContainer}>
                        <Forminput label={'SubCategory Name'} help={'Example'} onChange={(value) => getInputValue(value)}/>
                    </View>
                    <View style={styles.btnContainer}>
                        <View>
                            <Button type='outline' title={'Cancel'} style={{ marginLeft: 20 }} onPress={onPress} />
                        </View>
                        <View>
                            <Button title={'Save'} style={{ marginRight: 20 }} onPress={clickSave}/>
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
        flex: 0.3,
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


})