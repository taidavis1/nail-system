import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteService, fetchsServicesBySubCat } from '../store/slices/Services/serviceAction'
import { FlatList } from 'react-native-gesture-handler'
import Serviceitem from './ServiceItem'
import Loadingcontent from './LoadingConten'
import { resetServiceList } from '../store/slices/Services/serviceSlice'



export default function Servicecontainer({ onPress ,onEdit, onFinishEdit}) {

    const dispatch = useDispatch()
    const currentStateCategory = useSelector(state => state.category.currentCategory)
    const subCatIDNow = useSelector(state => state.category.currentSubCat)
    // fetch first time render service item (default fetch by subCat)
    useEffect(() => {
        if (currentStateCategory) {
            dispatch(fetchsServicesBySubCat({categoryID : currentStateCategory,subCatID : subCatIDNow}))
        }else {
            dispatch(resetServiceList())
        }
    }, [currentStateCategory,subCatIDNow])
    // hide delete and Edit when close modal 
    useEffect(() => {
        if (onFinishEdit === true) {
            setholddingItem()
        }
    }, [onFinishEdit])

    const serviceList = useSelector(state => state.services.serviceList)
    const [holddingItem, setholddingItem] = useState()
    const renderData = [{
        id: 'add_service',
        color: '#bdc3c7',
        display_name: '',
        photo: ''
    }, ...serviceList]


    const handleclickItem = (id) => {
        if (id === 'add_service') {
            if (subCatIDNow) {
                onPress()
            }else {
                alert('Dont have subCat')
            }
        }
    }

    const handleHoldItem = (value) => {
        setholddingItem(value)
    }
    const handleDeleteService = (value, display_name) => {
        Alert.alert(
            "Delete!",
            `Do you wanna Delete ${display_name}?`,
            [
                {
                    text: "Cancel",
                    style: "destructive",
                },
                {   text: "OK", 
                    onPress: () => {
                        dispatch(deleteService({serviceID : value}))
                        } ,
                    style : 'default'
                }
            ]
        );

    }

    const handleEditService = (value,item) => {
        onEdit(value,item)
    }
    const renderItem = ({ item }) => {
        return <Serviceitem
            onDelete={handleDeleteService}
            onEdit={handleEditService}
            onLongPress={(value) => handleHoldItem(value)}
            item={item}
            handleclickItem={(value => handleclickItem(value))}
            holddingItem={holddingItem} />
    }

    const loading = useSelector(state => state.services.loading)

    return (
        <Loadingcontent loading={loading}>

        <View style={styles.servicecontainer}>
            <FlatList
                numColumns={3}
                data={renderData}
                renderItem={renderItem}
                key={item => item.id}
                />
        </View>
        </Loadingcontent>
    )
}


const styles = StyleSheet.create({
    servicecontainer: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 10,
        width: '100%',
        height: '100%'
    },

})