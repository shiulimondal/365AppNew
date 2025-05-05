import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';;
import CommonHeader from '../../Components/Header/CommonHeader';
import { FONTS } from '../../Constants/Fonts';
import { Learnmore, reports } from '../../Constants/options';
import Icon from '../../Ui/Icon';

const { width, height } = Dimensions.get('window');

const LearnMore = () => {
    const { colors } = useTheme();

    const viewOffset = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(viewOffset, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateY = viewOffset.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const opacity = viewOffset.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View
            style={{
                ...styles.Container,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: '#f0f0f0', }}>
                {/* <View style={{ ...styles.top_view, backgroundColor: 'rgba(10, 104, 201, 1)', }}> */}

                <CommonHeader />
                {/* </View> */}
                <Animated.View
                    style={[
                        styles.tabView,
                        {
                            backgroundColor: '#f0f0f0',
                            transform: [{ translateY }],
                            opacity,
                        },
                    ]}>
                    <View style={{
                        padding: moderateScale(15),
                        paddingBottom: moderateScale(30)
                    }}>
                        {
                            Learnmore.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={{
                                            ...styles.title_txt,
                                            color: colors.primaryFontColor
                                        }}>{item?.title}</Text>

                                        <Text style={{
                                            ...styles.subtitle_txt,
                                            color: colors.primaryFontColor
                                        }}>{item.sub}</Text>
                                    </View>
                                )
                            })
                        }
                        <Text style={{
                            ...styles.title_txt,
                            color: colors.primaryFontColor,
                            marginTop: moderateScale(20)
                        }}>Reports May Include (When Available):</Text>
                        {
                            reports.map((itm, it) => {
                                return (
                                    <View key={it} style={styles.radio_view}>
                                        <Icon name={'radio-btn-active'} type={'Fontisto'} size={18} />
                                        <Text style={{
                                            ...styles.radiotitle_txt,
                                            color: colors.primaryFontColor,
                                        }}>{itm?.name}</Text>
                                    </View>
                                )
                            })
                        }


                    </View>


                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default LearnMore;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(10, 104, 201, 1)',
    },
    top_view: {
        width: width,
        height: moderateScale(280),
        paddingHorizontal: moderateScale(7),
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopRightRadius: moderateScale(30),
        borderTopLeftRadius: moderateScale(30),
        marginTop: moderateScale(-50),
    },
    title_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(16),
        marginTop: moderateScale(10)
    },
    subtitle_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        marginTop: moderateScale(7)
    },
    radiotitle_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(14),
        marginLeft: moderateScale(7)
    },
    radio_view: {
        marginTop: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center'
    }
});
