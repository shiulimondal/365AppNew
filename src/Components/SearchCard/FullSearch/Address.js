import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const Address = ({ addressData,openLock }) => {

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
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [showHiddenCard]);
    const normalAddressData =
        typeof addressData === 'string'
            ? addressData
            : Array.isArray(addressData)
                ? addressData.flatMap(record => record || [])
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
                            textShadowColor: "rgba(0,0,0,0.9)",
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
                     <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Addresses: ({addressData?.length})</Text>
                    {
                        openLock === true ?
                        <Icon name={"lock-open"} type={"SimpleLineIcons"} size={18} />
                        :
                        <Icon name={"lock"} type={"SimpleLineIcons"} size={18} />
                    }
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
                                const isArray = Array.isArray(normalAddressData);
                                const isObjectArray = isArray && typeof normalAddressData[0] === 'object';
                                const isString = typeof normalAddressData === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalAddressData}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalAddressData[0] === 'object') {
                                    return normalAddressData.map((address, index) => (
                                        <View key={index}
                                            style={{
                                                ...styles.hiddenCard,
                                                backgroundColor: colors.secondaryThemeColor,
                                            }}
                                        >
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Address : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(address?.fullAddress)}</Text>
                                            </View>
                                            <View style={styles.card_inside}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>First Recorded : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{address?.firstReportedDate}</Text>
                                            </View>
                                            <View style={styles.card_inside}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Last Recorded : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{address?.lastReportedDate}</Text>
                                            </View>
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

export default Address

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
        padding: moderateScale(7),
        elevation: 3,
        borderRadius: moderateScale(10),
        marginTop: moderateScale(8),
        marginHorizontal: moderateScale(5)
    },
    card_inside: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    address_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(12)
    },
    address: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(11),
        width: moderateScale(200),
    },
    message_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(10)
    },
    userShow_number: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.regular,
    },
})