import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
    Image,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import CustomCarousel from '../../Ui/CustomCarousel';
import { planData } from '../../Constants/options';

const { width, height } = Dimensions.get('window');

const BasicPlanCard = ({ setPlanModal, setPaymentModal, setPrice, setPlanName }) => {
    const { colors } = useTheme();
    const scrollX = useRef(new Animated.Value(0)).current;
    const CARD_WIDTH = width - moderateScale(85);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / CARD_WIDTH);
        setCurrentIndex(index);
    };
    const handelPriceSubmit = (price, name) => {
        setPlanModal(false);
        setPaymentModal(true);
        setPrice(price);
        setPlanName(name);
    };



    return (
        <View style={styles.container}>
            <Text style={[styles.title_txt, { color: colors.secondaryThemeColor }]}>Choose Report</Text>

            <View style={{ height: height / 1.3 }}>
                <CustomCarousel
                    data={planData}
                    scrollX={scrollX}
                    currentIndex={currentIndex}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    CARD_WIDTH={CARD_WIDTH}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * CARD_WIDTH,
                            index * CARD_WIDTH,
                            (index + 1) * CARD_WIDTH,
                        ];
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.9, 1, 0.9],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                style={[
                                    styles.plan_card_view,
                                    {
                                        width: CARD_WIDTH,
                                        height: '85%',
                                        backgroundColor: colors.secondaryThemeColor,
                                        borderColor: colors.buttonColor,
                                        transform: [{ scale }],
                                    }
                                ]}
                            >
                                {item?.popular && (
                                    <Image
                                        source={require('../../assets/images/popular.png')}
                                        style={styles.pimg_sty}
                                    />
                                )}
                                <Text style={[styles.plan_title, { color: colors.secondaryFontColor }]}>
                                    {item.title}
                                    <Text style={{ color: colors.buttonColor }}> ${item.price}</Text>
                                </Text>

                                {item?.features?.map((it, ind) => {
                                    const active = it.available;

                                    return (
                                        <View key={ind} style={styles.check_view}>
                                            <Image
                                                source={
                                                    active === true
                                                        ? require('../../assets/images/checked.png')
                                                        : require('../../assets/images/delete.png')
                                                }
                                                style={{
                                                    ...styles.checkimg_sty,
                                                    tintColor:
                                                        active === true
                                                            ? colors.buttonColor
                                                            : colors.tintText
                                                }}
                                            />
                                            <Text
                                                style={[
                                                    styles.plan_details,
                                                    {
                                                        color:
                                                            active === true
                                                                ? colors.secondaryFontColor
                                                                : colors.tintText
                                                    }
                                                ]}
                                            >
                                                {it?.name}
                                            </Text>
                                        </View>
                                    );
                                })}

                                <TouchableOpacity
                                    onPress={() => handelPriceSubmit(item?.price, item?.title)}
                                    style={[styles.button_sty, { backgroundColor: colors.buttonColor }]}
                                >
                                    <Text style={[styles.button_txt, { color: colors.secondaryThemeColor }]}>
                                        Select For ${item?.price}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={() => setPlanModal(false)}
                style={[styles.backbutton_sty, { backgroundColor: colors.buttonColor }]}
            >
                <Text style={[styles.button_txt, { color: colors.secondaryThemeColor }]}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BasicPlanCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.semibold,
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(40)
    },
    backbutton_sty: {
        height: moderateScale(40),
        marginTop: moderateScale(25),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        width: moderateScale(100),
        marginLeft: moderateScale(15)
    },
    plan_card_view: {
        padding: moderateScale(17),
        borderRadius: moderateScale(15),
        marginLeft: moderateScale(15),
        marginTop: moderateScale(25),
        borderWidth: 1,
    },
    pimg_sty: {
        height: moderateScale(28),
        width: moderateScale(75),
        resizeMode: "contain",
        alignSelf: 'flex-end',
    },
    plan_title: {
        fontSize: moderateScale(20),
        fontFamily: FONTS.Inter.semibold,
        marginBottom: moderateScale(5)
    },
    check_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(7)
    },
    checkimg_sty: {
        height: moderateScale(12),
        width: moderateScale(12),
    },
    plan_details: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
        marginLeft: moderateScale(7)
    },
    button_sty: {
        height: moderateScale(40),
        marginTop: moderateScale(10),
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
