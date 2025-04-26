import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../ThemeContext'
import { moderateScale } from '../../Constants/PixelRatio'
import Icon from '../../Ui/Icon'
import { FONTS } from '../../Constants/Fonts'

const Bestseller = ({ item, index }) => {
    const { colors } = useTheme()
    return (
        <View key={index} style={styles.container}>
            <View>
                <View style={{ ...styles.card_sty, backgroundColor: colors.secondaryThemeColor }} />
                <View style={{ position: 'absolute', bottom: 10 }}>
                    <View style={{ marginLeft: moderateScale(5) }}>
                        <Image source={item.img} style={styles.ing_sty} />
                        <View style={{
                            ...styles.img_view,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }}></View>
                    </View>
                    <View style={{
                        marginTop: moderateScale(7),
                        marginHorizontal: moderateScale(10)
                    }}>
                        <Text style={{ ...styles.item_txt, color: colors.primaryFontColor }}>{item.title_item}</Text>

                        <Text style={{ ...styles.subitem_txt, color: colors.primaryFontColor }}>{item.subtitle_item}</Text>
                        <View style={styles.bottom_view}>
                            <Text style={{ ...styles.price_txt, color: colors.primaryFontColor }}>{item.price}</Text>
                            <View style={{ ...styles.deawer_box, backgroundColor: colors.buttonColor }}>
                                <Icon name={'plus'} type={'AntDesign'} size={20} color={colors.secondaryThemeColor} />
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default Bestseller

const styles = StyleSheet.create({
    container: {
        padding: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(1),
        marginTop: moderateScale(20)
    },
    card_sty: {
        borderRadius: moderateScale(7),
        elevation: 2,
        height: moderateScale(160),
        width: moderateScale(145),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ing_sty: {
        height: moderateScale(100),
        width: moderateScale(135),
        resizeMode: 'contain',
    },
    img_view: {
        position: 'absolute',
        height: moderateScale(100),
        width: moderateScale(135),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    deawer_box: {
        height: moderateScale(26),
        width: moderateScale(26),
        borderRadius: moderateScale(7),
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_txt: {
        fontFamily: FONTS.Philosopher.bold,
        fontSize: moderateScale(17),
    },
    subitem_txt: {
        fontFamily: FONTS.Poppins.regular,
        fontSize: moderateScale(10),
    },
    bottom_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price_txt: {
        fontFamily: FONTS.Poppins.bold,
        fontSize: moderateScale(15),
    }
})