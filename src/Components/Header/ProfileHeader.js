import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const ProfileHeader = ({ title = '' }) => {
    const { login_status, guest_status } = useSelector(state => state.User);
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={'rgba(10, 104, 201, 1)'} barStyle="light-content" translucent />
            <View style={{ backgroundColor: 'rgba(10, 104, 201, 1)' }}>
                <View style={styles.img_position}>
                    <Image source={require('../../assets/images/headerBG.png')} style={styles.header_bg_img} />
                </View>
                <View style={styles.logo_view}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo_img} />
                    <View style={styles.user_view}>
                        <Text style={[styles.username_txt, { color: colors.subFontcolor }]}>Hello User</Text>

                        <TouchableOpacity
                            onPress={() => {
                                if (!login_status && guest_status) {
                                    navigation.navigate('Login');
                                } else {
                                    null
                                }
                            }}
                            style={{ ...styles.user_circle, backgroundColor: colors.secondaryThemeColor }}>
                            <Icon name={"user"} type={"FontAwesome"} size={26} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.heading_view}>
                    <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>Personal Information</Text>

                    <Text style={[styles.subheading_txt, { color: colors.subFontcolor }]}>
                        Let’s get to know you better. Your details stay private.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ProfileHeader;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    header_bg_img: {
        height: moderateScale(260),
        width: moderateScale(420),
        resizeMode: 'cover',
    },
    img_position: {
        position: 'absolute',
        top: moderateScale(30),
    },
    logo_view: {
        paddingHorizontal: moderateScale(7),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(23),
        alignItems: 'center',
    },
    logo_img: {
        height: moderateScale(65),
        width: moderateScale(65),
        resizeMode: 'contain',
    },
    user_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_circle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(23),
        marginLeft: moderateScale(10),
    },
    user_img: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(22),
        resizeMode: 'cover',
    },
    time_txt: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.light,
    },
    username_txt: {
        fontSize: moderateScale(21),
        fontFamily: FONTS.Inter.bold,
    },
    heading_view: {
        marginTop: moderateScale(7),
        paddingHorizontal: moderateScale(7),
    },
    heading_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.bold,
    },
    subheading_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
        maxWidth: '70%',
    },
});
