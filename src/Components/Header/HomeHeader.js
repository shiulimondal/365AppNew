import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const HomeHeader = ({ title = '' }) => {
    const { login_status, guest_status } = useSelector(state => state.User);
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={'rgba(10, 104, 201, 1)'} barStyle="light-content" translucent />
            <View style={styles.img_position}>
                <Image
                    source={require('../../assets/images/headerBG.png')}
                    style={styles.header_bg_img}
                />
            </View>
            <View style={styles.logo_view}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo_img}
                />
                <View style={styles.user_view}>
                    <Text
                        style={[styles.username_txt, { color: colors.subFontcolor }]}>
                        Hello User
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (!login_status && guest_status) {
                                navigation.navigate('Login');
                            } else {
                                navigation.navigate('UserStack', {
                                    screen: 'BottomTab',
                                    params: { screen: 'User' },
                                });
                            }
                        }}
                        style={{
                            ...styles.user_circle,
                            backgroundColor: colors.secondaryThemeColor,
                        }}>
                        <Icon name={"user"} type={"FontAwesome"} size={26} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.heading_view}>
                <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>
                    People
                </Text>
                <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>
                    Search Service
                </Text>
                <Text
                    style={[styles.subheading_txt, { color: colors.subFontcolor }]}>
                    Find Email Addresses, Phone Numbers, Contact Information and More!
                </Text>
            </View>

            <Pressable
                onPress={() => NavigationService.navigate('BottomTab', { screen: 'Search' })}
                style={{
                    ...styles.stylesseatrch_view,
                    backgroundColor: colors.bottomTab,
                }}>
                <Text style={[styles.search_txt, { color: colors.subFontcolor }]}>
                    Search Now
                </Text>
                <Icon
                    name={'search'}
                    type={'Feather'}
                    size={20}
                    color={colors.secondaryThemeColor}
                />
            </Pressable>
        </View>
    );
};

export default HomeHeader;
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
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(22),
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
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.bold,
    },
    heading_view: {
        marginTop: moderateScale(7),
        paddingHorizontal: moderateScale(10),
    },
    heading_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.bold,
    },
    subheading_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
        maxWidth: '80%',
    },
    stylesseatrch_view: {
        height: moderateScale(38),
        width: moderateScale(145),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(17),
        borderRadius: moderateScale(8),
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(10)
    },
    search_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    half_img: {
        height: moderateScale(140),
        width: moderateScale(140),
        resizeMode: 'contain',
    },
});
