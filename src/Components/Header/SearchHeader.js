import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const SearchHeader = ({ userdata }) => {
    const { login_status, guest_status } = useSelector(state => state.User);
    const navigation = useNavigation();
    const { colors } = useTheme();
    const renderBlurredText = (text) => {
        if (typeof text !== "string") {
            return <Text style={styles.cardText}>{text || ""}</Text>;
        }

        return text.split(/(X+)/g).map((part, index) => (
            <Text
                key={index}
                style={
                    /X+/.test(part)
                        ? {
                            color: "#fff0",
                            textShadowColor: "rgba(255,255,2555,255)",
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: 10,
                            fontSize: 14,
                            fontWeight: "600",
                            textTransform: "lowercase",
                        }
                        : { ...styles.subheadingemail_txt, color: colors.subFontcolor }
                }
            >
                {part}
            </Text>
        ));
    };

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
                                null
                            }
                        }}
                        style={{ ...styles.user_circle, backgroundColor: colors.secondaryThemeColor }}>
                        <Icon name={"user"} type={"FontAwesome"} size={26} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.heading_view}>
                <View >
                    <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>
                        {userdata[0]?.name}
                    </Text>
                    <Text style={[styles.subheadingemail_txt, { color: colors.subFontcolor }]}>
                        {renderBlurredText(userdata[0]?.phoneNumbers[0])}
                    </Text>
                    <Text
                        style={[styles.subheading_txt, { color: colors.subFontcolor, marginTop: 7 }]}>
                        {renderBlurredText(userdata[0]?.addresses[0]?.fullAddress)}
                    </Text>
                </View>
                <View>
                    <View>
                        <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>
                            {userdata[0]?.age} Years
                        </Text>
                        <Text style={[styles.dbo_txt, { color: colors.subFontcolor }]}>
                            {userdata[0]?.dob}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.death_txt, { color: colors.subFontcolor }]}>
                            Death Records
                        </Text>
                        <Text style={[styles.dbo_txt, { color: colors.subFontcolor }]}>
                            {userdata[0]?.deathRecords?.isDeceased ?? userdata[0]?.deathRecord ?? "N/A"}
                        </Text>
                    </View>
                </View>


            </View>

        </View>
    );
};

export default SearchHeader;
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
        paddingHorizontal: moderateScale(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(24),
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
        paddingHorizontal: moderateScale(3),
        flexDirection: 'row',
    },
    heading_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.bold,
    },
    subheading_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
        maxWidth: '65%',
    },
    subheadingemail_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
    },
    dbo_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
    },
    death_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.semibold,
        marginTop: moderateScale(5)
    }
});
