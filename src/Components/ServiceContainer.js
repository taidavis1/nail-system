import React,{useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text } from 'react-native'
import Ionicon from '@expo/vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../store/slices/Services/serviceAction'
import { baseURL } from '../Services/index';
import { FlatList } from 'react-native-gesture-handler'

const height = Dimensions.get('screen').height - 100
const width = Dimensions.get('screen').width * 0.75 - 60

export default function Servicecontainer({onPress}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])
    const serviceList = useSelector(state => state.services.serviceList)

    const renderData = [{
        id : 'add_service',
        color : '#bdc3c7',
        display_name : '',
        photo : ''
    },...serviceList]
    const changeToUrl = (item) => {
        const ObjPhotoUrl = item.split('/')
        const nameImg = ObjPhotoUrl[Object.keys(ObjPhotoUrl).length - 1]
        const ImgUrl =  `${baseURL}/static/images/${nameImg}`
        return ImgUrl
    }

const handleclickItem = (id) => {
    if (id === 'add_service') {
        onPress()
    }else{
        console.log(id)
    }
}

const renderItem = ({item}) => {
    return (
        <TouchableOpacity style={[item.id === 'add_service' ? styles.addServiceContainer : styles.serviceitem
        ,{
            backgroundColor : item.color
        }]}
        onPress={()=>handleclickItem(item.id)}
        onLongPress={item.id === 'add_servies' ? ()=>console.log('Do nothing') : () => {alert(`Holding item ${item.display_name}`)}}
        delayLongPress={1000}>
            {
                item.id === 'add_service' ? (
                    <Ionicon name='add-outline' size={50}/>
                ) : (
                    <>
                    <View style={styles.itemTop}>
                        <View style={{
                            witdh : '35%'
                        }}>

                        <Text style={styles.price}>
                            Price :
                        </Text>
                        <Text style={styles.price}>
                            {item.price}
                        </Text>
                        </View>
                        <View style={styles.imgContainer}>
                        <Image source={{uri : changeToUrl(item.photo)}}
                        style={{
                            width : '100%',
                            height : '100%',
                            resizeMode : 'contain'
                        }}/>
                        </View>
                    </View>
                    <View style={styles.itemBottom}>
                        <Text style={{
                            fontSize : 18,
                            fontWeight : 'bold',
                            fontStyle : 'italic',
                        }}>
                            {item.display_name}
                        </Text>
                    </View>
                        </>
                )
            }
        </TouchableOpacity>
    )
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


const styles =  StyleSheet.create({
    servicecontainer : {
        flex : 1,
        marginHorizontal : 15,
        marginVertical : 10,
        width  : '100%',
        height : '100%'
    },
    addServiceContainer :{
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        height : height/4,
        width : width/3,
        marginVertical : 10,
        marginHorizontal : 5,
        backgroundColor : 'gray',
        opacity : 0.7,
        borderRadius : 15
    },
    addTop :{
        flexDirection : 'row',
        alignItems : 'center'
    },
    serviceitem : {
        backgroundColor : 'pink',
        height : height/4,
        width : width/3,
        marginVertical : 10,
        marginHorizontal : 5,
        borderRadius : 15
    },
    itemTop : {
        flex : 3,
        flexDirection : 'row',
    },
    price : {
        fontWeight : 'bold',
        fontSize : 16,
        fontStyle : 'italic',
        marginVertical : 10,
        marginHorizontal : 10
    },
    itemBottom : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    imgContainer : {
        width : '65%',
        marginHorizontal : 5,
        marginVertical : 10,
        // backgroundColor : 'pink'
    }
})