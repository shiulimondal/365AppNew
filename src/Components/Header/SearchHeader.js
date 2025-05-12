import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, StatusBar, TouchableOpacity, useWindowDimensions, ImageBackground } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import Icon from '../../Ui/Icon';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


// const { width, height } = Dimensions.get('window');

const SearchHeader = ({ userdata }) => {
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

    const renderBlurredText = (text) => {
        if (!text || typeof text !== "string") {
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
                                null
                            }
                        }}
                        style={{ ...styles.user_circle, backgroundColor: colors.secondaryThemeColor }}>
                        <Icon name={"user"} type={"FontAwesome"} size={26} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.heading_view}>
                <View style={{
                    width: width - moderateScale(110)
                }}>
                    {userdata && userdata[0]?.name && (
                        <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>
                            {userdata[0]?.name}
                        </Text>
                    )}

                    {userdata && userdata[0]?.phoneNumbers?.[0] && (
                        <Text style={[styles.subheadingemail_txt, { color: colors.subFontcolor }]}>
                            {renderBlurredText(userdata[0]?.phoneNumbers[0])}
                        </Text>
                    )}

                    {userdata && userdata[0]?.addresses?.[0]?.fullAddress && (
                        <View >
                            <Text style={[styles.dbomain_txt, { color: colors.subFontcolor }]}>Current Address : </Text>
                            <Text
                                style={[styles.subheading_txt, { color: colors.subFontcolor, marginTop: 7 }]}>
                                {renderBlurredText(userdata[0]?.addresses[0]?.fullAddress)}
                            </Text>
                        </View>
                    )}

                    <View style={styles.dob_view}>
                        <Text style={[styles.death_txt, { color: colors.subFontcolor }]}>
                            Death Records :{' '}
                        </Text>
                        <Text style={[styles.dbo_txt, { color: colors.subFontcolor }]}>
                            {userdata[0]?.deathRecords?.isDeceased ?? userdata[0]?.deathRecord ?? "No"}
                        </Text>
                    </View>
                </View>
                <View>
                    {userdata && userdata[0]?.age && (
                        <Text style={[styles.heading_txt, { color: colors.subFontcolor }]}>
                            {userdata[0]?.age} Years
                        </Text>
                    )}
                    {userdata && userdata[0]?.dob && (
                        <View style={styles.dob_view}>
                            <Text style={[styles.dbomain_txt, { color: colors.subFontcolor }]}>DOB : </Text>
                            <Text style={[styles.dbo_txt, { color: colors.subFontcolor }]}>
                                {userdata[0]?.dob}
                            </Text>
                        </View>
                    )}


                    {userdata && userdata[0]?.addresses?.[0]?.firstReportedDate && (
                        <View>
                            <Text style={[styles.dbomain_txt, { color: colors.subFontcolor }]}>First Recorded</Text>
                            <Text style={[styles.dbo_txt, { color: colors.subFontcolor }]}>
                                {userdata[0]?.addresses[0]?.firstReportedDate}
                            </Text>
                        </View>
                    )}
                    {userdata && userdata[0]?.addresses?.[0]?.lastReportedDate && (
                        <View>
                            <Text style={[styles.dbomain_txt, { color: colors.subFontcolor }]}>Last Recorded</Text>
                            <Text style={[styles.dbo_txt, { color: colors.subFontcolor }]}>
                                {userdata[0]?.addresses[0]?.lastReportedDate}
                            </Text>
                        </View>
                    )}

                </View>
            </View>
        </ImageBackground>
    );
};

export default SearchHeader;
// define your styles
const styles = StyleSheet.create({
    logo_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingTop: moderateScale(24),
        alignItems: 'center',
        marginRight: moderateScale(20),
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
        paddingHorizontal: moderateScale(3),
        flexDirection: 'row',
    },
    heading_txt: {
        fontSize: moderateScale(19),
        fontFamily: FONTS.Inter.bold,
    },
    subheading_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
        maxWidth: '72%',
    },
    subheadingemail_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
    },
    dbo_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
    },
    dbomain_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.semibold,
    },
    death_txt: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.semibold,
    },
    dob_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(3)
    }
});
