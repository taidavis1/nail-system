import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Categoryitem from '../Components/CategoryItem'
import HeaderBase from '../Components/HeaderBase';
import Addcategorymodal from '../Components/AddCategoryModal';
import Subcatitem from '../Components/SubCatItem'

import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@rneui/base'
import Addsubcatmodal from '../Components/AddSubCatModal';
import { fetchCategory } from '../store/slices/Category/categoryAction';
import { addChooseCategory, addCurrentCategoryID, addCurrentSubCatID } from '../store/slices/Category/categorySlice';
import Servicecontainer from '../Components/ServiceContainer';
import Addservicemodal from '../Components/AddServiceModal';
import { fetchServicesByCat, fetchsServicesBySubCat } from '../store/slices/Services/serviceAction';

export default function Servicescreen(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isVisible_SubCat, setisVisible_SubCat] = useState(false)
    const [isVisible_Service,setisVisible_Services] = useState(false)

    const dispatch = useDispatch()
    const listCategoryFromStore = useSelector(state => state.category.category)
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const SubCatdata = listCategoryFromStore?.filter(item => item.id === currentCategoryID)[0]?.subCategories
    const currenSubCatID = useSelector(state => state.category.currentSubCat)
    const [rerenderServiceContainer, setrerenderServiceContainer] = useState(false)

    useEffect(() => {
        dispatch(fetchCategory({currentCategoryID : currentCategoryID,currentSubCatID : currenSubCatID}))
    }, [dispatch, isModalVisible, isVisible_SubCat,isVisible_Service])
    

    const renderCategoryItem = ({ item }) => {
        return <Categoryitem categoryname={item.category_name} color={item.color} id={item.id}
            clickCategory={(categoryname, id) => clickCategory(categoryname, id)}/>
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModal_SubCat = () => {
        setisVisible_SubCat(!isVisible_SubCat)
    }

    const toggleModal_Service = () => {
        setisVisible_Services(!isVisible_Service)
    }

    const clickCategory = (categoryname, id) => {
        switch (categoryname) {
            case 'Add new Category':
                toggleModal()
                break;
            default:
                dispatch(addCurrentCategoryID({id}))
                dispatch(fetchServicesByCat({categoryID : id}))
                dispatch(addChooseCategory({categoryID : id}))
                break;
        }
    }

    const handlePressSubCat = (subCatId) => {
        dispatch(addCurrentSubCatID({id : subCatId}))
        dispatch(fetchsServicesBySubCat({categoryID : currentCategoryID,subCatID : subCatId}))
    }



    return (
        <View style={styles.container}>
            <Addcategorymodal isVisible={isModalVisible} onPress={toggleModal} />
            <Addsubcatmodal isVisible={isVisible_SubCat} onPress={toggleModal_SubCat} />
            <Addservicemodal isVisible={isVisible_Service} onPress={toggleModal_Service}/>
            <HeaderBase screenName={'Service'} />
            <View style={styles.wrapper}>

                <View style={styles.categoryContainer}>
                    <FlatList style={{ marginTop: 10 }}
                        data={listCategoryFromStore}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false} />
                    <Categoryitem categoryname={'All Category'} color={'#dfe6e9'} clickCategory={(categoryname, id) => clickCategory(categoryname, id)} id={'all'} />
                    <Categoryitem categoryname={'Add new Category'} color={'#b2bec3'} clickCategory={(categoryname, id) => clickCategory(categoryname, id)} id={'add-cat'} />
                </View>
                <View style={styles.subCatContainer}>
                    <View style={styles.subCatItem}>
                        <ScrollView style={styles.subCatItemLeft}
                            horizontal={true}>
                            {SubCatdata?.map(
                            (item) => <Subcatitem title={item.name} key={item.id}   id ={item.id} pressSubCat={(value)=> handlePressSubCat(value)}/>
                        )}
                        </ScrollView>
                        <TouchableOpacity style={styles.addSubCatContainer}
                            onPress={() => setisVisible_SubCat(true)}><Icon size={30} type='ionicon' name='add' style={styles.addSubCat} /></TouchableOpacity>
                    </View>
                    <View style={styles.subCatServices}>
                        <Servicecontainer onPress={() => setisVisible_Services(true)} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    categoryContainer: {
        width: '25%',
        backgroundColor: 'gray',
        // opacity : 0.2
    },
    subCatContainer: {
        width: '75%'
    },
    subCatContainer: {
        flex: 1
    }
    ,
    subCatItem: {
        // flex: 1,
        backgroundColor: '#dfe6e9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // minHeight : 10
    },
    subCatServices: {
        flex: 9,
        // flexDirection : 'row'
    },
    subCatItemLeft: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%'
    },
    addSubCatContainer: {
        backgroundColor: '#63cdda',
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10
    },
    addSubCat: {
        padding: 5,

    }

})