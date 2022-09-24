import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Categoryitem from '../Components/CategoryItem'
import HeaderBase from '../Components/HeaderBase';
import Addcategorymodal from '../Components/AddCategoryModal';
import Subcatitem from '../Components/SubCatItem'
import CategoryServices from '../Services/CategoryServices'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, addListCategory } from '../store/slices/category'
import {  Icon} from '@rneui/base'
import Addsubcatmodal from '../Components/AddSubCatModal';

export default function Servicescreen(props) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isVisible_SubCat, setisVisible_SubCat] = useState(false)
    // const [categoryData, setCategory] = useState([])

    const dispatch = useDispatch()

    const listCategoryFromStore = useSelector(state => state.category.items)
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const currentCategoryData = listCategoryFromStore.filter(item => item.id === currentCategoryID)[0]
    const SubCatdata = currentCategoryData?.subCategories

    useEffect(() => {
        CategoryServices.getCategory().then(
            res => {
                // setCategory(res)
                dispatch(addListCategory({data : res}))
                
                if (currentCategoryID === ''){
                    dispatch(addCategory({id : res[0].id}))
                }
                
            }
        ).catch(err => console.log(err))
    }, [dispatch,isModalVisible,isVisible_SubCat])

    const renderCategoryItem = ({ item }) => {
        return <Categoryitem categoryname={item.category_name} color={item.color} id={item.id}
        clickCategory={(categoryname,id) => clickCategory(categoryname,id)}/>
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModal_SubCat = () => {
        setisVisible_SubCat(!isVisible_SubCat)
    }

    const clickCategory = (categoryname,id) => {
        switch (categoryname) {
            case 'Add new Category':
                toggleModal()
                break;
                
            default:
                dispatch(addCategory({id}))
                break;
        }
    }






    return (
        <View style={styles.container}>
            <Addcategorymodal isVisible={isModalVisible} onPress={toggleModal} />
            <Addsubcatmodal isVisible={isVisible_SubCat} onPress={toggleModal_SubCat}/>
            <HeaderBase screenName={'Service'} />
            <View style={styles.wrapper}>

                <View style={styles.categoryContainer}>
                    <FlatList style={{ marginTop: 10 }}
                        data={listCategoryFromStore}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false} />
                    <Categoryitem categoryname={'All Category'} color={'#dfe6e9'} clickCategory={(categoryname,id) => clickCategory(categoryname,id)} id={'all'}/>
                    <Categoryitem categoryname={'Add new Category'} color={'#b2bec3'} clickCategory={(categoryname,id) => clickCategory(categoryname,id)} id={'add-cat'}/>
                </View>
                <View style={styles.subCatContainer}>
                    <View style={styles.subCatItem}>
                        <View style={styles.subCatItemLeft}>
                        {SubCatdata?.map(
                            (item) => <Subcatitem title={item.name} key={item.id}/>
                        )}
                        </View>
                        <TouchableOpacity style={styles.addSubCatContainer}
                            onPress={() => setisVisible_SubCat(true)}><Icon size={30} type='ionicon' name='add' style={styles.addSubCat}/></TouchableOpacity>
                    </View>
                    <View style={styles.subCatServices}>

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
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        // minHeight : 10
    },
    subCatServices: {
        flex: 9
    },
    subCatItemLeft : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        width : '90%'
    },
    addSubCatContainer :{
        backgroundColor : '#63cdda',
        marginRight : 10,
        borderRadius : 10,
        marginVertical : 10
    },
    addSubCat : {
        padding : 5,
        
    }

})