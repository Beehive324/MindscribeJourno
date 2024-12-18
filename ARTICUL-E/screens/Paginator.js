import React from "react";
import {View, Animated, useWindowDimensions, StyleSheet} from "react-native"


export default Paginator = ({ data, scrollX }) => {

    const { width } = useWindowDimensions();
    return (
        <View style={{flexDirection: 'row', height:64}}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });

                return <Animated.View style= {[styles.dot, {width: dotWidth}]} key={i.toString()} />;

            })}
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
        marginHorizontal: 8

    }
});