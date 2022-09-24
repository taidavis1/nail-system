import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Categoryitem from '../Components/CategoryItem'
import HeaderBase from '../Components/HeaderBase'
import Modal from 'react-native-modal';
import { Button } from 'react-native'
import Addcategorymodal from '../Components/AddCategoryModal';
import Subcatitem from '../Components/SubCatItem'
import CategoryServices from '../Services/CategoryServices'
import { useDispatch, useSelector } from 'react-redux'
import { addListCategory } from '../store/slices/category'

export default function Servicescreen(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [categoryData, setCategory] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        CategoryServices.getCategory().then(
            res => {
                setCategory(res)
                dispatch(addListCategory({data : res}))
            }
        )
    }, [])
    const listCategoryfromStore = useSelector(state =>  state)
    console.log(listCategoryfromStore)
    console.log(categoryData)
    const renderCategoryItem = ({ item }) => {
        return <Categoryitem categoryname={item.category_name} color={item.color} />
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const clickCategory = (categoryname) => {
        switch (categoryname) {
            case 'Add new Category':
                toggleModal()
                break;

            default:
                break;
        }
    }
    return (
        <View style={styles.container}>
            <Addcategorymodal isVisible={isModalVisible} onPress={toggleModal} />
            <HeaderBase screenName={'Service'} />
            <View style={styles.wrapper}>

                <View style={styles.categoryContainer}>
                    <FlatList style={{ marginTop: 10 }}
                        data={categoryData}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false} />
                    <Categoryitem categoryname={'All Category'} color={'#dfe6e9'} clickCategory={(categoryname) => clickCategory(categoryname)} />
                    <Categoryitem categoryname={'Add new Category'} color={'#b2bec3'} clickCategory={(categoryname) => clickCategory(categoryname)} />
                </View>
                <View style={styles.subCatContainer}>
                    <View style={styles.subCatItem}>
                        <Subcatitem title={'Item1'} />
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
        flex: 1,
        backgroundColor: '#dfe6e9',
        justifyContent: 'center',
    },
    subCatServices: {
        flex: 9
    },

})