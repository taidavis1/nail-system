import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

export default function Categoryitem({categoryname,color,clickCategory}) {

    const handleOnpress = () => {
        clickCategory(categoryname)
    }
    return (
        <TouchableOpacity style={{marginHorizontal : 10,marginVertical : 5}} onPress={handleOnpress}>
        <ListItem
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
                colors: [color, color],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
            }}
            ViewComponent={LinearGradient}
            >
            <ListItem.Content>
                <ListItem.Title style={{ color: '#2d3436', fontWeight: 'bold' }}>
                    {categoryname}
                </ListItem.Title>
                {/* <ListItem.Subtitle style={{ color: 'white' }}>
                    Vice Chairman
                </ListItem.Subtitle> */}
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        borderRadius : 10
    }
})



