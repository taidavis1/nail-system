import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from "@rneui/themed";
import Forminput from './FormInput';
import DismissKeyboard from './DismissKeyboard';
import { RgbColorPicker } from './ColorPicker';
import * as ImagePicker from 'expo-image-picker';
import ItemBottomSheet from './BottomSheet';
import Listbox from './ListBox';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Addservicemodal({ onPress, isVisible }) {

    const currenCategoryID = useSelector(state => state.category.currentCategory)
    const listCategoryFromStore = useSelector(state => state.category.category)
    const currentCategory = listCategoryFromStore?.filter(item => item.id === currenCategoryID)[0]


    const [name, setName] = useState()
    const [displayName, setDisplayName] = useState()
    const [price, setPrice] = useState()
    const [Commision, setCommision] = useState()
    const [chooseColor, setChooseColor] = useState()
    const [image, setImage] = useState(null);
    const [testImg, settestImg] = useState()
    const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false);
    const [defaultValueCategory, setdefaultValueCategory] = useState(currentCategory);
    const [fileName, setFileName] = useState()

    const getInputValue = (value) => {
        setName(value)
    }
    const clickSave = () => {
        onPress()
    }
    const getColor = (value) => {
        setChooseColor(value)
    }
    let uri;
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        setFileName(result.fileName);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    console.log('img', image)
    const showListCategory = () => {
        setIsVisibleBottomSheet(true)
    }

    // const handleTestImg = () => {
    //     axios.post('http://127.0.0.1:5000/Add_services', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: {
    //             displayName: 'testDisplay',
    //             name: 'testname',
    //             price: '2000',
    //             commission: 'testcommision',
    //             color: 'red',
    //             // photo: image,
    //             category: '1',
    //             subcat: '1'
    //         }
    //     }).then(
    //         res => console.log(res)
    //     ).catch(
    //         err => console.log(err)
    //     )
    // }
    const handleTestImg = () => {
        let formData = new FormData();
        formData.append('displayName', 'testDisplay');
        formData.append('name', 'testName_1');
        formData.append('price', '2000');
        formData.append('commission', 'testcommision');
        formData.append('color', '#fffff');
        formData.append("photo", { uri: image, name: fileName, type: 'image/jpeg' });
        formData.append('category', 1);
        formData.append('subcat', 1);
        const url = "http://127.0.0.1:5000/Add_Services";
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post(url, formData, config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        // axios('http://127.0.0.1:5000/Add_Services', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },

        // });
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
                        <Button onPress={handleTestImg} title={'Test'} />
                        <View style={styles.listBoxContainer}>

                            <Listbox title={'Category'} onPress={showListCategory} value={defaultValueCategory?.category_name} />
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
                    isVisible={isVisibleBottomSheet}
                    offBottomSheet={() => setIsVisibleBottomSheet(false)}
                    chooseCategory={(value) => setdefaultValueCategory(value)} />
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