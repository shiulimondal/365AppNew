import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../../Constants/PixelRatio'
import { useTheme } from '../../../ThemeContext'
import { FONTS } from '../../Constants/Fonts'

const ServingCard = ({ item, index }) => {
    const { colors } = useTheme()
    return (
        <View key={index} style={styles.container}>
            <View>
            <View style={{ ...styles.card_sty, backgroundColor: colors.secondaryThemeColor }}/>
            <View style={{
                position:'absolute',
                bottom:10
            }}>
            <Image source={item.img} style={styles.ing_sty} />
            </View>
            </View>
            <Text style={{ ...styles.item_txt, color: colors.primaryFontColor }}>{item.title_item}</Text>
        </View>
    )
}

export default ServingCard

const styles = StyleSheet.create({
    container: {
        padding: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(1),
        marginTop:moderateScale(20)
    },
    card_sty: {
        borderRadius: moderateScale(7),
        elevation: 2,
        height: moderateScale(75),
        width: moderateScale(85),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ing_sty: {
        height: moderateScale(95),
        width: moderateScale(90),
        resizeMode: 'contain'
    },
    item_txt: {
        fontFamily: FONTS.Poppins.regular,
        fontSize: moderateScale(12),
        textAlign: 'center',
        marginTop: moderateScale(5)
    }
})