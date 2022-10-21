import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import { useSelector, useDispatch } from 'react-redux';
import Loadingcontent from './LoadingConten';
import { editSubCat, fetchCategory } from '../store/slices/Category/categoryAction';


export default function EditsubcatModal({ onPress, isVisible }) {
    const [subCatName, setSubCatName] = useState()
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const currentSubCatID = useSelector(state => state.category.currentSubCat)
    const subCatList = useSelector(state => state.category.subCatList)
    const currentSubCatData = subCatList.filter(item => item.id === currentSubCatID)
    const getInputValue = (value) => {
        setSubCatName(value)
    }
    const dispatch = useDispatch()
    const clickUpdate = () => {
        Alert.alert(
            "Alert",
            `Do you wanna Update`,
            [
                {
                    text: "Cancel",
                    style: 'destructive'
                },
                {
                    text: "OK", onPress: () => {
                            dispatch(editSubCat({
                                subcat_id : currentSubCatID,
                                name : !subCatName ? currentSubCatData[0]?.name : subCatName
                            })).then(
                                res => {
                                    dispatch(fetchCategory({ currentCategoryID: currentCategoryID, currentSubCatID: currentSubCatID }))
                                    onPress()
                                }
                            )
                        
                    }
                }
            ]
        )
    }
    const loading = useSelector(state => state.category.loading)
    return (
        <DismissKeyboard>
            <Loadingcontent loading={loading}>
            <ReactNativeModal isVisible={isVisible} style={styles.modalContainer} backdropOpacity={0.3}>
                <View style={styles.container}>
                    <Text style={styles.title}>Eidt SubCat</Text>
                    <View style={styles.inputContainer}>
                        <Forminput  label={'SubCategory Name'} help={'Example'} 
                                    onChange={(value) => getInputValue(value)}
                                    defaultValue={currentSubCatData[0]?.name}/>
                    </View>
                    <View style={styles.btnContainer}>
                        <View>
                            <Button type='outline' title={'Cancel'} style={{ marginLeft: 20 }} onPress={onPress} />
                        </View>
                        <View>
                            <Button title={'Update'} style={{ marginRight: 20 }} onPress={clickUpdate}/>
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