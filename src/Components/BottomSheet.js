import { BottomSheet, ListItem } from '@rneui/base'
import React from 'react'
import { SafeAreaView, StyleSheet,TouchableOpacity,View } from 'react-native';

export default function ItemBottomSheet({isVisible,offBottomSheet,listItem, chooseCategory}) {

    
    const list = listItem

    return (
        <BottomSheet isVisible={isVisible}  containerStyle={{
            width : '70%',
            alignSelf : 'center',

        }}>
        {list?.map((item) => (
            <ListItem key={item.id} 
            onPress={() => {
                chooseCategory(item)
                offBottomSheet()
            }}
            containerStyle = {{
                backgroundColor : item.color ? item.color : '#ecf0f1',
                // borderRadius : 10
            }} 
            Component={TouchableOpacity}>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight : 'bold'}}>{item.category_name ? item.category_name : item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        ))}
        <ListItem 
            // containerStyle={{backgroundColor : '#e74c3c'}} 
            onPress={offBottomSheet} >
            <ListItem.Content>
                <ListItem.Title style={{fontWeight : 'bold'}}>Cancel</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    </BottomSheet>

        
    )

    

}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'center'
    }
})