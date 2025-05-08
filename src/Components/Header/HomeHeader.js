import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, StatusBar, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


// const { width, height } = Dimensions.get('window');

const HomeHeader = ({ title = '' }) => {
    const { login_status, guest_status, userData } = useSelector(state => state.User);
    const navigation = useNavigation();
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();

    const [username, setUserName] = useState('')
    useEffect(() => {
        if (userData) {
            if (userData.fullName) {
                setUserName(userData.fullName);
            }

        }
    }, [userData]);

    return (
        <ImageBackground source={require('../../assets/images/headerBG.png')}
            resizeMode="cover"
            style={{ height: moderateScale(260), width: width }}>
            <StatusBar backgroundColor={'rgba(10, 104, 201, 0.1)'} barStyle="light-content" translucent />

            <View style={styles.logo_view}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo_img}
                />
                <View style={styles.user_view}>
                    {userData && userData.fullName ? (
                        <View>
                            <Text style={[styles.username_txt, { color: colors.subFontcolor }]}>Hello </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontFamily: FONTS.Inter.medium,
                                    fontSize: moderateScale(14),
                                    color: colors.subFontcolor,
                                    marginTop: moderateScale(-6)
                                }}>
                                {username?.split(' ')[0]}
                            </Text>
                        </View>
                    ) : (
                        <Text style={[styles.username_txt, { color: colors.subFontcolor, alignSelf: 'center' }]}>Hello</Text>
                    )}

                    <Pressable
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
                    </Pressable>
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
        </ImageBackground>
    );
};

export default HomeHeader;
// define your styles
const styles = StyleSheet.create({
    logo_view: {
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(24),
        alignItems: 'center',
        marginRight: moderateScale(10),
        marginHorizontal: 0
    },
    logo_img: {
        height: moderateScale(55),
        width: moderateScale(55),
        resizeMode: 'contain',
    },
    user_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: moderateScale(2)
    },
    user_circle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(38),
        width: moderateScale(38),
        borderRadius: moderateScale(23),
        marginLeft: moderateScale(10),
    },
    username_txt: {
        fontSize: moderateScale(18),
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
