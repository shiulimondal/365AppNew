import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../../Constants/PixelRatio'
import { useTheme } from '../../../ThemeContext'
import { FONTS } from '../../Constants/Fonts'

const HomeBanner = () => {
    const { colors } = useTheme()
    return (
        <View>
            <Image source={require('../../assets/images/banner.png')}
                style={styles.banner_img} />
            <View style={{
                ...styles.img_view,
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
                <Text style={{ ...styles.title_txt, color: colors.subFontcolor }}>Brewed for You, Perfect Every Time</Text>
                <Text style={{ ...styles.subtitle_txt, color: colors.tintText }}>Discover your perfect cup of coffee, where exceptional flavor meets cozy comfort.</Text>
            </View>
        </View>
    )
}

export default HomeBanner

const styles = StyleSheet.create({
    banner_img: {
        height: moderateScale(140),
        width: moderateScale(320),
        borderRadius: moderateScale(10),
        resizeMode: 'cover',
        marginHorizontal:moderateScale(7)
    },
    img_view: {
        position: 'absolute',
        height: moderateScale(140),
        width: moderateScale(320),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_txt: {
        fontFamily: FONTS.Philosopher.bold,
        fontSize: moderateScale(18),
        maxWidth:'60%',
        textAlign:'center'
    },
    subtitle_txt:{
        fontFamily: FONTS.Poppins.medium,
        fontSize: moderateScale(10),
        maxWidth:'70%',
        textAlign:'center' 
    }
})