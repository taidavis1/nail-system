import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function Loadingcontent({ loading,children, ...props }) {

    return (
        <>
            {
                loading ? (
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" />
                        </View>
                )
                    : <></>
            }
            {children}
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        // backgroundColor : 'red',
        position : 'absolute',
        width : '100%',
        height : '100%',
        zIndex : 10000
    },
    horizontal: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});