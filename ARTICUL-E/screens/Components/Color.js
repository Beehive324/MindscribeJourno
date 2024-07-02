import {View, Text, ScrollView, Image, StyleSheet} from 'react-native'
import React from 'react'

export const Color = ({color}) => {
    return (
        <ScrollView
          contentContainerStyle={StyleSheet.container}>
            {
                [1,0.8,0.5].map(opacity=> (
                    <View
                     key={opacity}
                     style={[styles.color, {backgroundColor: color, opacity}]}
                     />
                ))
            }
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    color: {
        width: '100%',
        height: 150,
        borderRadius: 25,
        borderCurve: 'continuous',
        marginBottom: 15,

    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
})


