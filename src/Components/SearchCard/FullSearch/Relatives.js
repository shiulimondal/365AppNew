import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const Relatives = ({ associatesRecords }) => {
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
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showHiddenCard]);
    const normalAssociatesRecords =
        typeof associatesRecords === 'string'
            ? associatesRecords
            : Array.isArray(associatesRecords)
                ? associatesRecords.flatMap(record => record || [])
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
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Relatives & Associates</Text>
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
                                const isArray = Array.isArray(normalAssociatesRecords);
                                const isObjectArray = isArray && typeof normalAssociatesRecords[0] === 'object';
                                const isString = typeof normalAssociatesRecords === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalAssociatesRecords}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalAssociatesRecords[0] === 'object') {
                                    return normalAssociatesRecords.map((item, index) => (
                                        <View key={index}
                                            style={{
                                                ...styles.hiddenCard,
                                                backgroundColor: colors.secondaryThemeColor,
                                            }}
                                        >
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Name : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.fullName)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>DBO : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.dob)}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Age : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.age)}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Death Records : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>
                                                    {item?.deathRecords?.isDeceased ?? userdata[0]?.deathRecord ?? "N/A"}
                                                </Text>
                                            </View>

                                            <View>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Address:</Text>
                                                <>
                                                    {Array.isArray(item.addresses) &&
                                                        item.addresses.map((add, ind) => (
                                                            <View style={styles.address_card} key={ind}>
                                                                <View style={styles.lockview}>
                                                                    <Text style={{ ...styles.number_txt, color: colors.primaryFontColor }}>{ind + 1} .</Text>
                                                                    <Text style={{ ...styles.address_real, color: colors.secondaryFontColor }}>
                                                                        {blurrText(`${add?.fullAddress}`)}
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.card_inside}>
                                                                    <Text style={{ ...styles.number_txt, color: colors.primaryFontColor }}>First Recorded : </Text>
                                                                    <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{add?.firstReportedDate}</Text>
                                                                </View>
                                                                <View style={styles.card_inside}>
                                                                    <Text style={{ ...styles.number_txt, color: colors.primaryFontColor }}>Last Recorded : </Text>
                                                                    <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{add?.lastReportedDate}</Text>
                                                                </View>
                                                            </View>
                                                        ))
                                                    }
                                                </>
                                            </View>

                                            <View>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Email Address:</Text>
                                                <>
                                                    {Array.isArray(item.phoneNumbers) &&
                                                        item.emailAddresses
                                                            .map((email, ind) => (
                                                                <View style={styles.address_card} key={ind}>
                                                                    <View style={styles.lockview}>
                                                                        <Text style={{ ...styles.number_txt, color: colors.primaryFontColor }}>{ind + 1} .</Text>
                                                                        <Text style={{ ...styles.address_real, color: colors.secondaryFontColor }}>
                                                                            {blurrText(`${email}`)}
                                                                        </Text>
                                                                    </View>

                                                                </View>
                                                            ))
                                                    }
                                                </>
                                            </View>

                                            <View>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Phone Number:</Text>
                                                <>
                                                    {Array.isArray(item.phoneNumbers) &&
                                                        item.phoneNumbers
                                                            .map((phnumber, ind) => (
                                                                <View style={styles.address_card} key={ind}>
                                                                    <View style={styles.lockview}>
                                                                        <Text style={{ ...styles.number_txt, color: colors.primaryFontColor }}>{ind + 1} .</Text>
                                                                        <Text style={{ ...styles.address_real, color: colors.secondaryFontColor }}>
                                                                            {blurrText(`${phnumber}`)}
                                                                        </Text>
                                                                    </View>

                                                                </View>
                                                            ))
                                                    }
                                                </>
                                            </View>


                                            {/* <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Street Name : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.streetName}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>City : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.city}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>State : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.state}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Zip : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.zip}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Website : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.website}</Text>
                                            </View> */}

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

export default Relatives

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
    address_card: {
        padding: moderateScale(4),
        marginTop: moderateScale(4),
        borderRadius: moderateScale(4),
        elevation: 1,
        backgroundColor: '#ffffff'
    },
    address: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(11),
        width: moderateScale(190),
    },
    address_real: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(10),
        width: moderateScale(260),
    },
    message_txt: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginTop: moderateScale(10)
    },
    number_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(11)
    },
    userShow_number: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.regular,
    },
})