import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteService, fetchServices } from '../store/slices/Services/serviceAction'
import { baseURL } from '../Services/index';
import { FlatList } from 'react-native-gesture-handler'
import Serviceitem from './ServiceItem'



export default function Servicecontainer({ onPress }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])
    const serviceList = useSelector(state => state.services.serviceList)
    // console.log('servicelist', serviceList)
    const [holddingItem, setholddingItem] = useState()
    const renderData = [{
        id: 'add_service',
        color: '#bdc3c7',
        display_name: '',
        photo: ''
    }, ...serviceList]


    const handleclickItem = (id) => {
        if (id === 'add_service') {
            onPress()
        }
    }

    const handleHoldItem = (value) => {
        setholddingItem(value)
    }
    const handleDeleteService = (value,display_name) => {
        Alert.alert(
            "Delete!",
            `Do you wanna Delete ${display_name}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    dispatch(deleteService({serviceID : value}))
                }
                }
            ]
        );

    }

    const handleEditService = (value) => {
        console.log(value)
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


    return (
        <View style={styles.servicecontainer}>
            <FlatList
                numColumns={3}
                data={renderData}
                renderItem={renderItem}
                key={item => item.id}
            />
        </View>
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