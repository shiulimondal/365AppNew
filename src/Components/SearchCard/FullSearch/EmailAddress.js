import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../ThemeContext';
import Icon from '../../../Ui/Icon';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import LoadingSpinner from '../../../Ui/LoadingSpinner';


const { width, height } = Dimensions.get('screen');
const EmailAddress = ({ emailData }) => {
    const { colors } = useTheme();
    const [showContent, setShowContent] = useState(false);
    const [showHiddenCard, setShowHiddenCard] = useState(false);
    const toggleCard = () => {
        setShowHiddenCard(prev => !prev);
    };
    useEffect(() => {
        if (showHiddenCard) {
            setShowContent(false);
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showHiddenCard]);
    const normalemailData =
        typeof emailData === 'string'
            ? emailData
            : Array.isArray(emailData)
                ? emailData.flatMap(record => record || [])
                : [];

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
                            fontWeight: '400',
                            fontSize: 10,
                            textTransform: "lowercase",
                        }
                        : { ...styles.userShow_number, color: colors.secondaryFontColor }
                }
            >
                {part}
            </Text>
        ));
    };
    return (
        <View>
            <View style={styles.hide_view}>
                <View style={styles.lockview}>
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Email Addresses</Text>
                    <Icon name={"lock"} type={"SimpleLineIcons"} size={18} />
                </View>
                <TouchableOpacity onPress={toggleCard}>
                    {showHiddenCard === false ?
                        <Icon name={"down"} type={"AntDesign"} size={18} />
                        :
                        <Icon name={"up"} type={"AntDesign"} size={18} />
                    }
                </TouchableOpacity>

            </View>

            {showHiddenCard && (
                <View style={styles.full_card}>
                    {!showContent ? (
                        <View style={{ marginTop: 10 }}>
                            <LoadingSpinner size={40} color={colors.buttonColor} />
                        </View>

                    ) : (
                        <>
                            {(() => {
                                const isArray = Array.isArray(normalemailData);
                                const isObjectArray = isArray && typeof normalemailData[0] === 'object';
                                const isString = typeof normalemailData === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalemailData}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalemailData[0] === 'string') {
                                    return normalemailData.map((email, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                ...styles.numberHidden_view,
                                                borderBottomWidth: index === normalemailData.length - 1 ? 0 : 1,
                                            }}
                                        >

                                            <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(email)}</Text>
                                        </View>
                                    ));
                                }

                                return null;
                            })()}
                        </>
                    )}
                </View>
            )}
        </View>
    )
}

export default EmailAddress

const styles = StyleSheet.create({
    hide_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(15)
    },
    lockview: {
        flexDirection: 'row',
    },
    phone_number: {
        fontSize: moderateScale(18),
        fontFamily: FONTS.Inter.exBold,
        marginRight: moderateScale(7)
    },
    full_card: {
        padding: moderateScale(5),
        backgroundColor: '#fff',
        borderRadius: moderateScale(7),
        paddingBottom: moderateScale(20),
        marginTop: moderateScale(7)
    },
    hiddenCard: {
        paddingHorizontal: moderateScale(10),
        elevation: 1,
        borderRadius: moderateScale(10),
        marginTop: moderateScale(10),
    },
    numberHidden_view: {
        borderBottomColor: '#ccc',
        padding: moderateScale(10),
    },
    userShow_number: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
    },
    message_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(10)
    },
})