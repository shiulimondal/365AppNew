import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const BackHeader = ({ icon = true }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={'rgba(10, 104, 201, 1)'} barStyle="light-content" translucent />
            <View style={{ backgroundColor: 'rgba(10, 104, 201, 1)' }}>
                <View style={styles.img_position}>
                    <Image source={require('../../assets/images/headerBG.png')} style={styles.header_bg_img} />
                </View>
                {icon && (
                    <TouchableOpacity
                        style={styles.icon_sty}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon
                            name={'angle-left'}
                            type={'FontAwesome6'}
                            size={22}
                            color={colors.secondaryThemeColor}
                        />
                    </TouchableOpacity>
                )}

                <View style={styles.logo_view}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo_img} />

                </View>

            </View>
        </View>
    );
};

export default BackHeader;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    header_bg_img: {
        height: moderateScale(240),
        width: moderateScale(420),
        resizeMode: 'cover',
    },
    icon_sty: {
        position: 'absolute',
        top: moderateScale(30),
        left: moderateScale(10)
    },
    img_position: {
        position: 'absolute',
        top: moderateScale(30),
    },
    logo_view: {
        paddingHorizontal: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: moderateScale(35),
    },
    logo_img: {
        height: moderateScale(180),
        width: moderateScale(180),
        resizeMode: 'contain',
    },

});
