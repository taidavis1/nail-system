import React, { useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../store/slices/Category/categoryAction';
import Categoryitem from './CategoryItem';



const renderRightActions = (
    progress,
    dragX
) => {
    const opacity = dragX.interpolate({
        inputRange: [-150, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.swipedRow}>
            <View style={styles.swipedConfirmationContainer}>
                <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
            </View>
            <Animated.View style={[styles.deleteButton, { opacity }]}>
                <TouchableOpacity style={styles.deleteBox}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styles.editBox}>
                    <Text style={styles.deleteButtonText}>Edit</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const Item = (row) => (
    <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.row}>
            <Text>{row.category_name}</Text>
        </View>
    </Swipeable>
);

const clickCategory  = (item, id) => {
    console.log(item)
    console.log(id)
}

export const SwipeToDelete = (props) => {
    const dispatch = useDispatch()
    let rows = useSelector(state => state.category.category)
    const currentCategoryID = useSelector(state => state.category.currentCategory)
    const currenSubCatID = useSelector(state => state.category.currentSubCat)
    useEffect(() => {
        dispatch(fetchCategory({currentCategoryID : currentCategoryID,currentSubCatID : currenSubCatID}))
    }, [dispatch])
    const renderCategoryItem = ({ item }) => {
        return <Categoryitem categoryname={item.category_name} color={item.color} id={item.id}
            clickCategory={(categoryname, id) => clickCategory(categoryname, id)}/>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={rows}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 300,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#efefef',
        margin: 20,
        minHeight: 50,
    },
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        backgroundColor: '#818181',
        margin: 20,
        minHeight: 50,
    },
    swipedConfirmationContainer: {
        flex: 1,
    },
    deleteConfirmationText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
    },
    deleteButton: {
        // backgroundColor: '#b60000',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        flexDirection : 'row',
        // width : '100%'
    },
    deleteButtonText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        padding: 3,
        // backgroundColor : 'red'
    },
    deleteBox : {
        backgroundColor : 'red',
        height : '100%',
        width :60
    },
    editBox : {
        flex : 1,
        backgroundColor : 'blue',
        width : 60,
        height : '100%'
    }
});