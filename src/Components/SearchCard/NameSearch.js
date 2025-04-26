import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';
import { setSelectedUserId, setUserData } from '../../Redux/reducer/SearchId';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

const NameSearch = ({ item, index }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();

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
                            textShadowColor: "rgba(0,0,0,0.5)",
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: 10,
                            fontSize: 14,
                            fontWeight: "600",
                            textTransform: "lowercase",
                        }
                        : { ...styles.user_address, color: colors.tintText }
                }
            >
                {part}
            </Text>
        ));
    };
    return (
        <TouchableOpacity
            onPress={() => {
                // Check if the item?.personId and item are not null
                console.log('Dispatching with personId:', item?.personId);
                console.log('Dispatching with item:', item);

                dispatch(setSelectedUserId(item?.personId));  // Store selectedUserId
                dispatch(setUserData(item));  // Store userData

                NavigationService.navigate('SearchProfile', { userId: item?.personId });
            }}
            key={index} style={styles.Container}>
            <View style={{ ...styles.card_top, backgroundColor: colors.cardColor, }}>
                <View>
                    <Text style={{ ...styles.user_name, color: colors.primaryFontColor }}>{item?.name}</Text>
                    <Text style={{ ...styles.user_email, color: colors.tintText }}>
                        {renderBlurredText(item?.emailAddresses?.[0] ?? '')}
                    </Text>
                </View>
                <View>
                    <Text style={{ ...styles.user_name, color: colors.primaryFontColor }}>{item.age}yrs</Text>
                    {/* <Text style={{ ...styles.user_email, color: colors.tintText }}>14.05.1998</Text> */}
                </View>
            </View>
            <View style={{ ...styles.card_bottom, backgroundColor: colors.secondaryThemeColor, }}>
                <View style={styles.record_view}>
                    <Text style={{ ...styles.user_report, color: colors.primaryFontColor }}>First Recorded : <Text
                        style={{ color: colors.tintText }}
                    >{item?.addresses[0]?.firstReportedDate}</Text></Text>
                    <Text style={{ ...styles.user_report, color: colors.primaryFontColor }}>Last Recorded : <Text
                        style={{ color: colors.tintText }}
                    >{item?.addresses[0]?.lastReportedDate}</Text></Text>

                </View>

                <View>
                    <Text style={{ ...styles.user_address, color: colors.tintText }}>
                        {renderBlurredText(item?.addresses?.[0]?.fullAddress ?? '')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default NameSearch;
// define your styles
const styles = StyleSheet.create({
    Container: {
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(15),
        width: width - moderateScale(20)
    },
    card_top: {
        borderTopRightRadius: moderateScale(15),
        borderTopLeftRadius: moderateScale(15),
        padding: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    record_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card_bottom: {
        borderBottomRightRadius: moderateScale(15),
        borderBottomLeftRadius: moderateScale(15),
        elevation: 1,
        padding: moderateScale(10),
    },
    user_name: {
        fontSize: moderateScale(18),
        fontFamily: FONTS.Inter.bold,
    },
    user_email: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
    },
    user_report: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.medium,
    },
    user_address: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
        // maxWidth: '70%',
        marginTop: moderateScale(7)
    }
});
