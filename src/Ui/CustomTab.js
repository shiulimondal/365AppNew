import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { moderateScale } from '../Constants/PixelRatio';
import { useTheme } from '../../ThemeContext';
import { FONTS } from '../Constants/Fonts';
import NavigationService from '../Services/Navigation';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const CustomTab = ({ }) => {
    const { login_status, guest_status } = useSelector(state => state.User);
    const { colors } = useTheme();
    return (
        <View style={{ ...styles.Container, backgroundColor: colors.bottomTab }}>
            <Pressable
                onPress={() => NavigationService.navigate('BottomTab', { screen: 'Home' })}
                style={[
                    styles.tabItem,
                    {
                        backgroundColor: colors.bottomTab,
                    },
                ]}>
                <Image
                    source={require('../assets/images/home.png')}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                />
                <Text style={[styles.tabLabel, { color: colors.subFontcolor }]}>
                    Home
                </Text>
            </Pressable>
            <View
                style={[
                    styles.tabItem,
                    {
                        backgroundColor: colors.buttonColor

                    },
                ]}>
                <Image
                    source={require('../assets/images/search.png')}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                />
                <Text style={[styles.tabLabel, { color: colors.subFontcolor }]}>
                    Search
                </Text>
            </View>

            <Pressable
                onPress={() => {
                    if (!login_status && guest_status) {
                        NavigationService.navigate('Login');
                    } else {
                        NavigationService.navigate('UserStack', {
                            screen: 'BottomTab',
                            params: { screen: 'User' },
                        });
                    }
                }}

                style={[
                    styles.tabItem,
                    {
                        backgroundColor: colors.bottomTab,
                    },
                ]}>
                <Image
                    source={require('../assets/images/profile.png')}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                />
                <Text style={[styles.tabLabel, { color: colors.subFontcolor }]}>
                    Profile
                </Text>
            </Pressable>
        </View>
    );
};

export default CustomTab;
// define your styles
const styles = StyleSheet.create({
    Container: {
        height: moderateScale(50),
        borderRadius: moderateScale(30),
        marginBottom: moderateScale(20),
        marginHorizontal: moderateScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10)
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: moderateScale(90),
        padding: moderateScale(8),
        borderRadius: moderateScale(17),
    },
    tabIcon: {
        height: moderateScale(18),
        width: moderateScale(18),
        marginRight: moderateScale(7),
    },
    tabLabel: {
        fontSize: moderateScale(15),
        fontFamily: FONTS.Inter.light,
    },
});
