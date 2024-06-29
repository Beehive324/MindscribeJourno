import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import react from "react"
import SIZES from './constants/Sizes'
import COLORS from './constants/Colors'
import FONTS from './constants/Fonts'

export default Button = (props) => {
    return (
        <TouchableOpacity
         style={{...StyleSheet.btn, ...props.style }}
         onPress={props.onPress}
        >

        <Text style={{
            ...FONTS.body2,
            fontFamily: "semiBold",
            color: COLORS.white

        }}>{props.title}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btn: {
        width: SIZES.width - 500,
        paddingVertical: SIZES.padding,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary

    }
})