import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import CategoryServices from '../Services/CategoryServices';
import { useSelector } from 'react-redux';
import Loadingcontent from './LoadingConten';


export default function Addsubcatmodal({ onPress, isVisible }) {
    const [subCatName, setSubCatName] = useState()
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const getInputValue = (value) => {
        setSubCatName(value)
    }
    const clickSave = () => {
        CategoryServices.addSubCat(subCatName,`${currentCategoryID}`)
        .then(res => {
            console.log(res)
            onPress()
        })
        .catch(err => console.log(err))

    }
    const loading = useSelector(state => state.category.loading)
    return (
        <DismissKeyboard>
            <Loadingcontent loading={loading}>
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
            </Loadingcontent>
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