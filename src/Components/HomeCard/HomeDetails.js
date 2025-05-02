import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { dataDetails } from '../../Constants/options';
import NavigationService from '../../Services/Navigation';

const { width, height } = Dimensions.get('window');

const HomeDetails = () => {
    ;
    const { colors } = useTheme();

    return (
        <View style={styles.Container}>
            <View style={styles.subContainer}>
                <Text style={[styles.title_txt, { color: colors.primaryFontColor }]}>
                    Simplified Search Process
                </Text>
                <Text style={[styles.subTitle_txt, { color: colors.tintText }]}>
                    At 365 Instant Check, we prioritize simplicity and protect your search
                    history with complete confidentiality.
                </Text>
                <TouchableOpacity
                    onPress={() => NavigationService.navigate('LearnMore')}
                    style={{
                        ...styles.stylesseatrch_view,
                        backgroundColor: colors.buttonColor,
                    }}>
                    <Text style={[styles.search_txt, { color: colors.subFontcolor }]}>
                        Learn more
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.main_view}>
                <Text style={[styles.public_txt, { color: colors.primaryFontColor }]}>
                    Public Records Search
                </Text>
                <Text style={[styles.publicSub_txt, { color: colors.tintText }]}>
                    Utilizing Public Information such as:
                </Text>
            </View>
            {dataDetails.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={[
                            styles.card_sty,
                            {
                                backgroundColor:
                                    index == 0 ? colors.buttonColor : colors.secondaryThemeColor,
                                elevation: index == 0 ? 0 : 2,
                            },
                        ]}>
                        <View style={styles.card_top}>
                            <Image source={item.icon} style={[
                                styles.icon_sty,
                                {
                                    tintColor:
                                        index == 0
                                            ? colors.secondaryThemeColor
                                            : colors.bottomTab,
                                },
                            ]} />
                            <Text
                                style={[
                                    styles.card_title,
                                    {
                                        color:
                                            index == 0
                                                ? colors.secondaryThemeColor
                                                : colors.primaryFontColor,
                                    },
                                ]}>
                                {item.Dtitle}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.cardsub_title,
                                {
                                    color:
                                        index == 0
                                            ? colors.secondaryThemeColor
                                            : colors.primaryFontColor,
                                },
                            ]}>
                            {item.subTitle}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

export default HomeDetails;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        // backgroundColor: '#f0f0f0',
        paddingBottom: moderateScale(40),
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    main_view: {
        marginTop: moderateScale(20),
        marginHorizontal: moderateScale(15),
    },
    title_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.bold,
        marginTop: moderateScale(17),
        textAlign: 'center',
        maxWidth: '50%',
        // borderWidth: 1,
    },
    subTitle_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.regular,
        textAlign: 'center',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(7),
    },
    stylesseatrch_view: {
        height: moderateScale(38),
        width: moderateScale(145),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(17),
        borderRadius: moderateScale(8),
        marginTop: moderateScale(15),
    },
    search_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    public_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.bold,
    },
    publicSub_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
        marginTop: moderateScale(3),
    },
    card_sty: {
        marginTop: moderateScale(20),
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(10),
    },
    card_top: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_sty: {
        height: moderateScale(30),
        width: moderateScale(30),
        resizeMode: 'contain',
    },
    card_title: {
        fontSize: moderateScale(20),
        fontFamily: FONTS.Inter.bold,
        marginLeft: moderateScale(10),
    },
    cardsub_title: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.light,
        marginTop: moderateScale(5),
    },

    //   leftimg_position: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //   },
    //   left_img: {
    //     height: moderateScale(120),
    //     width: moderateScale(120),
    //     resizeMode: 'contain',
    //   },
});
