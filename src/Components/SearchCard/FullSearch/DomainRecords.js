import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const DomainRecords = ({ domainRecords, openLock }) => {
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
    const normalDomainRecords =
        typeof domainRecords === 'string'
            ? domainRecords
            : Array.isArray(domainRecords)
                ? domainRecords.flatMap(record => record || [])
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
            <View style={styles.hide_view}>
                <View style={styles.lockview}>


                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Domain Records: ({domainRecords?.length})</Text>
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
                                const isArray = Array.isArray(normalDomainRecords);
                                const isObjectArray = isArray && typeof normalDomainRecords[0] === 'object';
                                const isString = typeof normalDomainRecords === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalDomainRecords}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalDomainRecords[0] === 'object') {
                                    return normalDomainRecords.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                ...styles.hiddenCard,
                                                backgroundColor: colors.secondaryThemeColor,
                                            }}
                                        >
                                            {item?.contacts?.map((contact, i) => (
                                                <View key={`contact-${i}`}>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Full Name:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.fullName)}</Text>
                                                    </View>

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Business Name:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.businessName)}</Text>
                                                    </View>

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Business Type:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.businessTypeDesc)}</Text>
                                                    </View>

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Contact Type:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.contactType)}</Text>
                                                    </View>

                                                    {contact?.address?.fullAddress && (
                                                        <View style={styles.lockview}>
                                                            <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Address:</Text>
                                                            <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact.address.fullAddress)}</Text>
                                                        </View>
                                                    )}

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Country:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.country)}</Text>
                                                    </View>

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>County:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{contact?.county}</Text>
                                                    </View>

                                                    {contact?.phones?.length > 0 && (
                                                        <View style={styles.lockview}>
                                                            <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Phone:</Text>
                                                            <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact.phones[0])}</Text>
                                                        </View>
                                                    )}

                                                    {contact?.emails?.length > 0 && (
                                                        <View style={styles.lockview}>
                                                            <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Email:</Text>
                                                            <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact.emails[0])}</Text>
                                                        </View>
                                                    )}

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Gender:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.gender)}</Text>
                                                    </View>

                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Salutation:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(contact?.salutation)}</Text>
                                                    </View>
                                                </View>
                                            ))}

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Domain Name:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.domainName)}</Text>
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

export default DomainRecords

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