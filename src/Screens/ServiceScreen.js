import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Animated, Alert } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Categoryitem from '../Components/CategoryItem'
import HeaderBase from '../Components/HeaderBase';
import Addcategorymodal from '../Components/AddCategoryModal';
import Subcatitem from '../Components/SubCatItem'

import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@rneui/base'
import Addsubcatmodal from '../Components/AddSubCatModal';
import { deleteCategory, deleteSubCat, fetchCategory } from '../store/slices/Category/categoryAction';
import { addChooseCategory, addCurrentCategoryID, addCurrentSubCatID } from '../store/slices/Category/categorySlice';
import Servicecontainer from '../Components/ServiceContainer';
import Addservicemodal from '../Components/AddServiceModal';
import { fetchServicesByCat, fetchsServicesBySubCat } from '../store/slices/Services/serviceAction';
import Eidtservicemodal from '../Components/EditServiceModal';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicon from '@expo/vector-icons/Ionicons';
import Loadingcontent from '../Components/LoadingConten';
import Editcategorymodal from '../Components/EditCategoryModal';
import EditsubcatModal from '../Components/EditSubCatModal';
import { resetServiceList } from '../store/slices/Services/serviceSlice';



export default function Servicescreen(props) {

    // Toggle Modal Category
    const [isModalVisible, setModalVisible] = useState(false);
    const [isVisible_EditCat, setisVisible_EditCat] = useState(false)
    // Toggle Modal SubCat
    const [isVisible_SubCat, setisVisible_SubCat] = useState(false)
    const [isVisible_EditSubCat, setisVisible_EditSubCat] = useState(false)
    // Toggle Modal Service
    const [isVisible_Service, setisVisible_Services] = useState(false)
    const [isVisible_EditService, setisVisible_EditService] = useState(false)
    // state current data service when choose service to edit
    const [editService, seteditService] = useState()
    // state category data when choose cat to edit
    const [category, setcategory] = useState()

    const dispatch = useDispatch()
    const listCategoryFromStore = useSelector(state => state.category.category)
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const SubCatdata = useSelector(state => state.category.subCatList)
    const currenSubCatID = useSelector(state => state.category.currentSubCat)


    useEffect(() => {
        dispatch(fetchCategory({ currentCategoryID: currentCategoryID, currentSubCatID: currenSubCatID }))
    }, [currentCategoryID, isModalVisible,isVisible_EditSubCat, isVisible_SubCat])

    // Function handle DeleteCategory :
    const handleDeleteCat = (category) => {
        Alert.alert(
            "Alert",
            `Do you wanna Delete ${category.category_name}`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: 'destructive'
                },
                {
                    text: "OK", onPress: () => {
                        dispatch(deleteCategory({ category_id: category.id }))
                        .then(
                            dispatch(resetServiceList())
                        )
                    }
                }
            ]
        )
    }

    // Function handle EditCat :
    const handleEditCat = (category) => {
        toggleModel_EditCat()
        setcategory(category)
    }

    // function handle delete subcat :
    const handleDeleteSubCat = () =>{
        if (!currenSubCatID) {
            alert('Must choose a subCat')
        }else{
            const deleteSubCatItem = SubCatdata.filter(item => item.id === currenSubCatID)
            const {name , id} = deleteSubCatItem[0]
            Alert.alert(
                "Alert",
                `Do you wanna Delete ${name}`,
                [
                    {
                        text: "Cancel",
                        style: 'destructive'
                    },
                    {
                        text: "OK", onPress: () => {
                            const listAfterDelete = SubCatdata.filter(item => item.id !== id)
                            const newSubCatActive = listAfterDelete[0]
                                dispatch(deleteSubCat({subcat_id : currenSubCatID}))
                                .then(
                                    () => {
                                        if (newSubCatActive) {
                                            dispatch(fetchsServicesBySubCat({
                                                categoryID : currentCategoryID,
                                                subCatID : newSubCatActive?.id //Fix 20-10-2022 
                                            }))
                                        }else {
                                            dispatch(resetServiceList())
                                        }
                                    }
                                )
                            
                        }
                    }
                ]
            )
        }
        
    }

    // function handle add subcat : 
    const handleAddSubCat = () => {
            setisVisible_SubCat(true)
    }
    // function handle EditSubCat :
    const handleEditSubCat = () => {
        if (currenSubCatID) {
            setisVisible_EditSubCat(true)
        }else {
            alert('Must choose a SubCat')
        }
    }
    // Action to handle swipeRight
    const renderRightActions = (item) => {
        return (
            <View style={styles.swipe}>
                <Animated.View style={styles.swipeBox} >
                    <TouchableOpacity style={styles.deleteBox} onPress={() => handleDeleteCat(item)}>
                        <Ionicon name='trash-outline' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editBox} onPress={() => handleEditCat(item)}>
                        <Ionicon name='create-outline' size={25} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    const renderCategoryItem = ({ item }) => {
        return (
            <Swipeable renderRightActions={() => renderRightActions(item)} >
                <Categoryitem categoryname={item.category_name} color={item.color} id={item.id}
                    clickCategory={(categoryname, id) => clickCategory(categoryname, id)} />
            </Swipeable>
        )
    }
    // handle hide, show Category Modal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModel_EditCat = () => {
        setisVisible_EditCat(!isVisible_EditCat)
    }
    // handle hide,show SubCat modal
    const toggleModal_SubCat = () => {
        setisVisible_SubCat(!isVisible_SubCat)
    }
    const toggleModal_EditSubCat = () => {
        setisVisible_EditSubCat(!isVisible_EditSubCat)
    }
    // handle show,hide service model
    const toggleModal_Service = () => {
        setisVisible_Services(!isVisible_Service)
    }

    const toggleModal_EditService = (item) => {
        seteditService(item)
        setisVisible_EditService(!isVisible_EditService)
    }
    

    const clickCategory = (categoryname, id) => {
        switch (categoryname) {
            case 'Add new Category':
                toggleModal()
                break;
            case 'All Category':
                console.log('all')
                break;
            default:
                dispatch(addCurrentCategoryID({ id }))
                dispatch(fetchServicesByCat({ categoryID: id }))
                dispatch(addChooseCategory({ categoryID: id }))
                break;
        }
    }

    const handlePressSubCat = (subCatId) => {
        dispatch(addCurrentSubCatID({ id: subCatId }))
        dispatch(fetchsServicesBySubCat({ categoryID: currentCategoryID, subCatID: subCatId }))
    }

    const loading = useSelector(state => state.category.loading)

    return (
        <View style={styles.container}>
            <Addcategorymodal isVisible={isModalVisible} onPress={toggleModal} />
            <Editcategorymodal isVisible={isVisible_EditCat} onPress={toggleModel_EditCat} category={category}/>
            <Addsubcatmodal isVisible={isVisible_SubCat} onPress={toggleModal_SubCat} />
            <EditsubcatModal isVisible={isVisible_EditSubCat} onPress={toggleModal_EditSubCat}/>
            <Addservicemodal isVisible={isVisible_Service} onPress={toggleModal_Service} />
            <Eidtservicemodal isVisible={isVisible_EditService} onPress={toggleModal_EditService} editService={editService} />
            <HeaderBase screenName={'Service'} />
            <View style={styles.wrapper}>
                <Loadingcontent loading={loading}>
                    <View style={styles.categoryContainer}>
                        <FlatList style={{ marginTop: 10 }}
                            data={listCategoryFromStore}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false} />
                        <Categoryitem categoryname={'All Category'} color={'#dfe6e9'} clickCategory={(categoryname, id) => clickCategory(categoryname, id)} id={'all'} />
                        <Categoryitem categoryname={'Add new Category'} color={'#b2bec3'} clickCategory={(categoryname, id) => clickCategory(categoryname, id)} id={'add-cat'} />
                    </View>
                </Loadingcontent>
                <View style={styles.subCatContainer}>
                    <View style={styles.subCatItem}>
                        <ScrollView style={styles.subCatItemLeft}
                            horizontal={true}>
                            {SubCatdata?.map(
                                (item) => <Subcatitem title={item.name} key={item.id} id={item.id} pressSubCat={(value) => handlePressSubCat(value)} />
                            )}
                        </ScrollView>
                        <TouchableOpacity style={[styles.addSubCatContainer,{
                            backgroundColor : '#ff7675'
                        }]}
                            onPress={() => handleDeleteSubCat()}><Icon size={27} type='ionicon' name='trash-outline' style={styles.addSubCat} /></TouchableOpacity>
                        <TouchableOpacity style={styles.addSubCatContainer}
                            onPress={() => handleEditSubCat()}><Icon size={27} type='ionicon' name='create-outline' style={styles.addSubCat} /></TouchableOpacity>
                        <TouchableOpacity style={[styles.addSubCatContainer,{
                            backgroundColor :'#74b9ff'
                        }]}
                            onPress={() => handleAddSubCat()}><Icon size={27} type='ionicon' name='add' style={styles.addSubCat} /></TouchableOpacity>
                    </View>
                    <View style={styles.subCatServices}>
                        <Servicecontainer onPress={() => setisVisible_Services(true)}
                            onEdit={toggleModal_EditService}
                            onFinishEdit={!isVisible_EditService ? true : false} />
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
        marginHorizontal: 7,
        borderRadius: 10,
        marginVertical: 10
    },
    addSubCat: {
        padding: 5,
    },
    swipe: {
        width: '40%',
        height: '100%'
        // flexDirection : 'row'
    },
    swipeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor : 'red',
        height: '100%'
    },
    editBox: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        borderRadius: 15,
        backgroundColor: '#55efc4',
        marginLeft: 5
    },
    deleteBox: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff7675',
        height: '80%',
        borderRadius: 15
    }


})
