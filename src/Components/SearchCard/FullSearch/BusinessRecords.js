import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const BusinessRecords = ({ businessRecords, openLock }) => {
    const { colors } = useTheme();
    const [showHiddenCard, setShowHiddenCard] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (showHiddenCard) {
            setShowContent(false);
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [showHiddenCard]);

    const toggleCard = () => {
        setShowHiddenCard(prev => !prev);
    };

    const normalBusinessRecords =
        typeof businessRecords === 'string'
            ? businessRecords
            : Array.isArray(businessRecords)
                ? businessRecords.flatMap(record => record || [])
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
        
            {typeof normalBusinessRecords === 'string' ? (
                // Show only this when it's a string
                <TouchableOpacity onPress={toggleCard} style={styles.hide_view}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Business Records:</Text>
                        <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.hide_view}>
                    <TouchableOpacity onPress={toggleCard} style={styles.lockview}>
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Business Records: ({businessRecords?.length})</Text>
                        {openLock ? (
                            <Icon name={"lock-open"} type={"SimpleLineIcons"} size={18} />
                        ) : (
                            <Icon name={"lock"} type={"SimpleLineIcons"} size={18} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleCard}>
                        {showHiddenCard ? (
                            <Icon name={"up"} type={"AntDesign"} size={18} />
                        ) : (
                            <Icon name={"down"} type={"AntDesign"} size={18} />
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {showHiddenCard && (
                <View style={styles.full_card}>
                    {!showContent ? (
                        <View style={{ marginTop: 10 }}>
                            <LoadingSpinner size={40} color={colors.buttonColor} />
                        </View>

                    ) : (
                        <>
                            {(() => {
                                const isArray = Array.isArray(normalBusinessRecords);
                                const isObjectArray = isArray && typeof normalBusinessRecords[0] === 'object';
                                const isString = typeof normalBusinessRecords === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalBusinessRecords}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalBusinessRecords[0] === 'object') {
                                    return normalBusinessRecords.map((item, index) => (
                                        <View key={index}
                                            style={{
                                                ...styles.hiddenCard,
                                                backgroundColor: colors.secondaryThemeColor,
                                            }}
                                        >
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Business Name : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.businessName)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Corp. Type : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.corpType)}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Employee Size : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.employeeSize)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Owner Size : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.ownerSize)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Tax ID : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.taxId)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Filing Date : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.filingDate)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Filing State : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{renderBlurredText(item?.filingState)}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Address:</Text>
                                                <>
                                                    {Array.isArray(item.addresses) &&
                                                        item.addresses.map((add, ind) => (
                                                            <View key={ind}>
                                                                <Text style={{ ...styles.address_real, color: colors.secondaryFontColor }}>
                                                                    {renderBlurredText(`${ind + 1}. ${add.addressLine1}, ${add.city}, ${add.state}`)}
                                                                </Text>
                                                            </View>
                                                        ))
                                                    }
                                                </>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Is Corporation : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.isCorporation}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Is Franchis : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.isFranchise}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Is Non-profit : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.isNonProfit}</Text>
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

export default BusinessRecords

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
        padding: moderateScale(10),
        elevation: 1,
        borderRadius: moderateScale(10),
        marginTop: moderateScale(10),
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
        width: moderateScale(190),
    },
    address_real: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(11),
        width: moderateScale(300),
    },
    userShow_number: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.regular,
    },
    message_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(10)
    },
})