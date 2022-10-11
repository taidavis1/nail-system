import React from 'react'
import { Text, View , TouchableOpacity, StyleSheet , Image, Dimensions, Touchable} from 'react-native'
import Ionicon from '@expo/vector-icons/Ionicons'
import { baseURL } from '../Services/index';
import COLORS from '../Constant/color';

const height = Dimensions.get('screen').height - 100
const width = Dimensions.get('screen').width * 0.75 - 60

export default function Serviceitem({onDelete,onEdit,onLongPress,holddingItem,item,handleclickItem,...props}) {
    const changeToUrl = (item) => {
        const ObjPhotoUrl = item?.split('/')
        const nameImg = ObjPhotoUrl[Object.keys(ObjPhotoUrl).length - 1]
        const ImgUrl =  `${baseURL}/static/images/${nameImg}`
        return ImgUrl
    }

    return (
        <TouchableOpacity style={[item.id === 'add_service' ? styles.addServiceContainer : styles.serviceitem
        ,{
            backgroundColor : item.color
        }]}
        onPress={()=>handleclickItem(item.id)}
        onLongPress={() => onLongPress(item.id)}
        delayLongPress={500}>
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
                    {
                        item.id === holddingItem ? (
                            <View style = {[styles.hideBox,{
                                borderColor : item.color,
                                // display : none
                            }]}>
                                <TouchableOpacity 
                                onPress={() => onDelete(item.id,item.display_name)}
                                style={{
                                    width : '50%',
                                    borderRightColor : item.color,
                                    borderRightWidth : 1,
                                    justifyContent: 'center',
                                    alignItems : 'center'   
                                }}>
                                    <Ionicon name='trash-outline' size={25} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => onEdit(item.id,item)}
                                style={{
                                    width : '50%',
                                    justifyContent: 'center',
                                    alignItems : 'center'
                                }}>
                                    <Ionicon name='create-outline' size={25}/>
                                </TouchableOpacity>
                            </View>
                        ) : <></>
                    }
                        </>
                )
            }
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
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
    },
    hideBox:{
        position : 'absolute' ,
        flexDirection : 'row',
        bottom : 0,
        backgroundColor : '#ecf0f1',
        height : '25%',
        width : '100%',
        borderBottomLeftRadius : 15,
        borderBottomRightRadius : 15,
        borderWidth : 1,
        justifyContent : 'space-around',
        alignItems : 'center'
    }
})