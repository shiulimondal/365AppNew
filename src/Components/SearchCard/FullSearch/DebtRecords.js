import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const DebtRecords = ({ debtRecords, openLock }) => {
    const { colors } = useTheme();
    const [showHiddenCard, setShowHiddenCard] = useState(false);
    const toggleCard = () => {
        setShowHiddenCard(prev => !prev);
    };
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
    const normalDebtRecords =
        typeof debtRecords === 'string'
            ? debtRecords
            : Array.isArray(debtRecords)
                ? debtRecords.flatMap(record => record || [])
                : [];

    const blurrText = (text) => {
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
           

            {typeof normalDebtRecords === 'string' ? (
                // Show only this when it's a string
                <TouchableOpacity onPress={toggleCard} style={styles.hide_view}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Debt Records:</Text>
                        <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.hide_view}>
                    <TouchableOpacity onPress={toggleCard} style={styles.lockview}>
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Debt Records: ({debtRecords?.length})</Text>
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
                                const isArray = Array.isArray(normalDebtRecords);
                                const isObjectArray = isArray && typeof normalDebtRecords[0] === 'object';
                                const isString = typeof normalDebtRecords === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalDebtRecords}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalDebtRecords[0] === 'object') {
                                    return normalDebtRecords.map((item, index) => (
                                        <View key={index} style={{ ...styles.hiddenCard, backgroundColor: colors.secondaryThemeColor }}>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Debt Type:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.debtType)}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Filing Date:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.filingDate)}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Report Date:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.reportDate)}</Text>
                                            </View>

                                            {item?.names?.map((name, i) => (
                                                <View key={`name-${i}`}>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Full Name:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(name.fullName)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Business Name:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(name.businessName)}</Text>
                                                    </View>
                                                </View>
                                            ))}

                                            {item?.addresses?.map((addr, i) => (
                                                <View key={`addr-${i}`} style={styles.lockview}>
                                                    <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Address {i + 1}:</Text>
                                                    <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(addr.fullAddress)}</Text>
                                                </View>
                                            ))}

                                            {item?.courts?.map((court, i) => (
                                                <View key={`court-${i}`}>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Court Name:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(court.name)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Phone:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(court.phone)}</Text>
                                                    </View>
                                                </View>
                                            ))}

                                            {item?.caseDetails?.map((detail, i) => (
                                                <View key={`case-${i}`}>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Case Number:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(detail.caseNumber)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Filing Date:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(detail.filingDate)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Liability:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(detail.liability)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Action Type:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(detail.actionType)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Description:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(detail.actionTypeDescription)}</Text>
                                                    </View>
                                                </View>
                                            ))}
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

export default DebtRecords

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
        paddingBottom: moderateScale(10),
        marginTop: moderateScale(7)
    },
    hiddenCard: {
        padding: moderateScale(10),
        elevation: 3,
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(5),
        marginTop: moderateScale(7)
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