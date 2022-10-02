import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import { RgbColorPicker } from './ColorPicker';
import * as ImagePicker from 'expo-image-picker';
import ItemBottomSheet from './BottomSheet';
import Listbox from './ListBox';
import { useDispatch, useSelector } from 'react-redux';
import CategoryServices from '../Services/CategoryServices';
import { addChooseCategory, addChooseSubCat } from '../store/slices/Category/categorySlice';
import { addService } from '../store/slices/Services/serviceAction';

export default function Addservicemodal({ onPress, isVisible }) {
    // useDispatch to dispatch action from redux
    const dispatch = useDispatch()

    // Get data from store REDUX
    const chooseCategoryID = useSelector(state => state.category.chooseCategory)
    const listCategoryFromStore = useSelector(state => state.category.category)
    let currentSubCatList
    let currentCategory
    if (chooseCategoryID) {
        currentCategory = listCategoryFromStore?.filter(item => item.id === chooseCategoryID)[0]
        currentSubCatList = listCategoryFromStore?.filter(item => item.id === chooseCategoryID)[0].subCategories
    }

    const listSubCatByCategory = listCategoryFromStore?.filter(item => item.id === chooseCategoryID)[0]?.subCategories

    const choosesubCatID = useSelector(state=> state.category.chooseSubCat)
    let currentSubCat;
    if (!choosesubCatID) {
        currentSubCat = listSubCatByCategory ? listSubCatByCategory[0] : null
    }else {
        currentSubCat = listSubCatByCategory?.filter(item => item.id === choosesubCatID)
    }
    const [valueSubCat, setvalueSubCat, onClose] = useState()
    
    // State handle change input
    const [name, setName] = useState()
    const [displayName, setDisplayName] = useState()
    const [price, setPrice] = useState()
    const [commision, setCommision] = useState()
    const [chooseColor, setChooseColor] = useState()
    const [image, setImage] = useState(null);
    const [isVisibleCategorySheet, setIsVisibleCategorySheet] = useState(false);
    const [isVisibleSubCatSheet, setisVisibleSubCatSheet] = useState(false)


    const getInputValue = (value) => {
        setName(value)
    }
    const clickSave = () => {
        Alert.alert(
            "Alert",
            "Do you want to save ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    dispatch(addService({
                        displayName : displayName,
                        name : name,
                        price : price,
                        commision : commision,
                        chooseColor : chooseColor,
                        image : image,
                        chooseCategoryID : chooseCategoryID,
                        valueSubCat : valueSubCat.id
                    }))
                    setImage()
                    setvalueSubCat()
                    onPress()
                } }
            ]
        )
    }
    const getColor = (value) => {
        setChooseColor(value)
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const showListCategory = () => {

        setIsVisibleCategorySheet(true)
    }

    const showListSubCat = () => {
        setisVisibleSubCatSheet(true)
    }
    const handleChooseCategory = (cat) => {
        dispatch(addChooseCategory({categoryID : cat.id}))
        setvalueSubCat()
    }

    const handleChooseSubCat = (subCat) => {
        setvalueSubCat(subCat)
        // console.log(valueSubCat)
        dispatch(addChooseSubCat({subCatID : subCat[0]?.id}))
    }
    return (
        <DismissKeyboard>

            <ReactNativeModal isVisible={isVisible} style={styles.modalContainer} backdropOpacity={0.3}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add New Services</Text>
                    <View style={styles.inputContainer}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Forminput label={'Service name'} help={'Example'}
                                onChange={(value) => getInputValue(value)} width={'50%'} />
                            <Forminput label={'Display name'} help={'8 characters max'}
                                onChange={(value) => setDisplayName(value)} width={'35%'} />
                            <Forminput label={'Price'} help={''} onChange={(value) => setPrice(value)} width={'50%'} />
                            <Forminput label={'Commision'} help={''} onChange={(value) => setCommision(value)}
                                width={'35%'} />
                        </View>

                    </View>
                    <View style={styles.colorContainer}>
                        <View style={styles.colorPicker}>
                            <Text style={styles.colorTitle}>Pick Color :</Text>
                        </View>
                        <RgbColorPicker categoryname={''}
                            getColorFromColorPicker={(value) => getColor(value)} />
                    </View>
                    <View style={styles.img_listmenu}>
                        <View style={styles.imgpick}>
                            <Button title="Upload New Photo" onPress={pickImage} />
                            {image && <Image source={{ uri: image }} style={{ width: 180, height: 150 }} />}
                        </View>
                        <View style={styles.listBoxContainer}>

                            <Listbox title={'Category'} onPress={showListCategory} 
                                    value={currentCategory ? currentCategory?.category_name : ''} />
                            <Listbox title={'SubCat'} onPress={showListSubCat} 
                                    value={valueSubCat?.name} />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <View>
                            <Button type='outline' title={'Cancel'} style={{ marginLeft: 20 }} onPress={onPress} />
                        </View>
                        <View>
                            <Button title={'Save'} style={{ marginRight: 20 }} onPress={clickSave} />
                        </View>
                    </View>
                </View>
                <ItemBottomSheet
                    listItem={listCategoryFromStore}
                    isVisible={isVisibleCategorySheet}
                    offBottomSheet={() => setIsVisibleCategorySheet(false)}
                    chooseCategory={(value) => handleChooseCategory(value)} />
                <ItemBottomSheet
                    listItem={listSubCatByCategory}
                    isVisible={isVisibleSubCatSheet}
                    offBottomSheet={() => setisVisibleSubCatSheet(false)}
                    chooseCategory={(value) => handleChooseSubCat(value)} />
                {/*  */}
            </ReactNativeModal>
        </DismissKeyboard>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        // backgroundColor : 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    colorContainer: {
        // flex: 1,
        width: '100%',
        // justifyContent : 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    colorTitle: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16
    },
    colorPicker: {
        width: '70%',
    },
    img_listmenu: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgpick: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3498db'
    },
    listBoxContainer: {
        width: '70%'
    }

})