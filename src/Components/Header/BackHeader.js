import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, StatusBar, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


// const { width, height } = Dimensions.get('window');

const BackHeader = ({ icon = true }) => {
    const { login_status, guest_status } = useSelector(state => state.User);
    const navigation = useNavigation();
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    return (
        <ImageBackground source={require('../../assets/images/headerBG.png')}
            resizeMode="cover"
            style={{ height: moderateScale(240), width: width }}>
            <StatusBar backgroundColor={'rgba(10, 104, 201, 0.1)'} barStyle="light-content" translucent />
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

        </ImageBackground>
    );
};

export default BackHeader;
// define your styles
const styles = StyleSheet.create({
    icon_sty: {
        position: 'absolute',
        top: moderateScale(30),
        left: moderateScale(10)
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
