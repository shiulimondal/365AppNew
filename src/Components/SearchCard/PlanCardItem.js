import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';

const PlanCardItem = ({ item, index, CARD_WIDTH, scrollX, colors, setPlanModal, setPaymentModal }) => {

    // Define inputRange for interpolation
    const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
    ];

    // Interpolated scale value using Animated
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
    });

    return (
        // <ScrollView contentContainerStyle={{
        //     paddingBottom: moderateScale(30),
        // }}>
        <Animated.View style={[
            styles.plan_card,
            {
                width: CARD_WIDTH,
                height: '85%',
                backgroundColor: colors.secondaryThemeColor,
                borderColor: colors.buttonColor,
                transform: [{ scale }],
            }
        ]}>
            {item?.popular && (
                <Image source={require('../../assets/images/popular.png')} style={styles.pimg_sty} />
            )}
            <Text style={[styles.plan_title, { color: colors.secondaryFontColor }]}>
                {item.planT}
                <Text style={{ color: colors.buttonColor }}> {item.price}</Text>
            </Text>

            {item?.planD?.map((it, ind) => {
                const text = Object.values(it)[0];
                const active = it.active;

                return (
                    <View key={ind} style={styles.check_view}>
                        <Image
                            source={active === 'Yes'
                                ? require('../../assets/images/checked.png')
                                : require('../../assets/images/delete.png')}
                            style={{
                                ...styles.checkimg_sty,
                                tintColor: active === 'Yes' ? colors.buttonColor : colors.tintText
                            }}
                        />
                        <Text style={[
                            styles.plan_details,
                            { color: active === 'Yes' ? colors.secondaryFontColor : colors.tintText }
                        ]}>
                            {text}
                        </Text>
                    </View>
                );
            })}

            <TouchableOpacity
                onPress={() => {
                    setPlanModal(false);
                    setPaymentModal(true);
                }}
                style={[styles.button_sty, { backgroundColor: colors.buttonColor }]}>
                <Text style={[styles.button_txt, { color: colors.secondaryThemeColor }]}>
                    Select For {item?.price}
                </Text>
            </TouchableOpacity>
        </Animated.View>

        // </ScrollView>
    );
};

export default PlanCardItem;

const styles = StyleSheet.create({
    plan_card: {
        padding: moderateScale(20),
        borderRadius: moderateScale(15),
        marginLeft: moderateScale(15),
        marginTop: moderateScale(25),
        borderWidth: 1,
    },
    pimg_sty: {
        height: moderateScale(30),
        width: moderateScale(80),
        resizeMode: "contain",
        alignSelf: 'flex-end',
    },
    plan_title: {
        fontSize: moderateScale(24),
        fontFamily: FONTS.Inter.semibold,
        maxWidth: '80%',
        marginBottom: moderateScale(10)
    },
    check_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    checkimg_sty: {
        height: moderateScale(13),
        width: moderateScale(13),
    },
    plan_details: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.medium,
        marginLeft: moderateScale(7)
    },
    button_sty: {
        height: moderateScale(40),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(15)
    },
    button_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
});
