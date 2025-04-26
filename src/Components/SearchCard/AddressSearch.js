import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import Icon from '../../Ui/Icon';

const { width, height } = Dimensions.get('window');

const AddressSearch = ({ title = '' }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.Container}>
            <View style={{ ...styles.card_top, backgroundColor: colors.cardColor, }}>
                <View>
                    <Text style={{ ...styles.user_name, color: colors.primaryFontColor }}>Melody Wills</Text>
                    <Text style={{ ...styles.user_email, color: colors.tintText }}>example@email.com</Text>
                </View>
                <View>
                    <Text style={{ ...styles.user_name, color: colors.primaryFontColor }}>25yrs</Text>
                    <Text style={{ ...styles.user_email, color: colors.tintText }}>14.05.1998</Text>
                </View>
            </View>
            <View style={{ ...styles.card_bottom, backgroundColor: colors.secondaryThemeColor, }}>
                <View>
                    <Text style={{ ...styles.user_email, color: colors.tintText }}>+9876543210</Text>
                    <Text style={{ ...styles.user_address, color: colors.tintText }}>20 Cooper Square, New York, NY 10003, USAm</Text>
                </View>
                {/* <Icon name={"hearto"} type={"AntDesign"} size={22} color={colors.buttonColor} /> */}
            </View>
        </View>
    );
};

export default AddressSearch;
// define your styles
const styles = StyleSheet.create({
    Container: {
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(15),
        width: width - moderateScale(20)
    },
    card_top: {
        borderTopRightRadius: moderateScale(15),
        borderTopLeftRadius: moderateScale(15),
        padding: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card_bottom: {
        borderBottomRightRadius: moderateScale(15),
        borderBottomLeftRadius: moderateScale(15),
        elevation: 1,
        padding: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    user_name: {
        fontSize: moderateScale(18),
        fontFamily: FONTS.Inter.bold,
    },
    user_email: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
    },
    user_address: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
        // maxWidth: '70%',
        marginTop: moderateScale(7)
    }
});
