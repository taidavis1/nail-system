import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import  { RgbColorPicker } from './ColorPicker';
import Loadingcontent from './LoadingConten';
import { useSelector, useDispatch } from 'react-redux';
import { editCategory } from '../store/slices/Category/categoryAction';

export default function Editcategorymodal({ onPress, isVisible, category }) {
    const [catagoryName, setCatagoryName] = useState()
    const [chooseColor, setChooseColor] = useState()

    useEffect(() => {
        if (isVisible) {
            setChooseColor(category.color)
            setCatagoryName(category.category_name)
        }
    }, [isVisible])
    const getInputValue = (value) => {
        setCatagoryName(value)
    }
    const dispatch = useDispatch()
    const clickUpdate = () => {
        Alert.alert(
            "Alert",
            "Do you want to Update ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: 'destructive'
                },
                { text: "OK", onPress: () => {
                    dispatch(editCategory({
                        category_id : category.id,
                        name : catagoryName,
                        color : chooseColor=== 'rgb(0,0,0)' ? category.color : chooseColor
                    })).then(
                        onPress()
                    )
                } }
            ]
        )
    }
    const getColor = (value) => {
        setChooseColor(value)
    }

    const loading = useSelector(state => state.category.loading)
    return (
        <DismissKeyboard>
            <Loadingcontent loading={loading}>
            <ReactNativeModal isVisible={isVisible} style={styles.modalContainer} backdropOpacity={0.3}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Category</Text>
                    <View style={styles.inputContainer}>
                        <Forminput  label={'Category Name'} help={'Example'} 
                                    onChange={(value) => getInputValue(value)}
                                    defaultValue={category?.category_name}/>
                    </View>
                    <View style={styles.colorContainer}>
                        <View style={styles.colorPicker}>
                        <Text style={styles.colorTitle}>Pick Color :</Text>
                        </View>
                        <RgbColorPicker categoryname = {catagoryName} 
                                        getColorFromColorPicker={getColor}/>
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
        flex: 0.7,
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
        width : '100%',
        // justifyContent : 'center',
        alignItems : 'center',
        marginTop : 50
    },
    colorTitle : {
        color : 'green',
        fontWeight : 'bold',
        fontSize : 16
    },
    colorPicker :{
        width : '70%',
        marginBottom : 15
    }
})