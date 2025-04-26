import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const EvictionRecords = ({ evictionRecords }) => {
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
    const normalEvictionRecords =
        typeof evictionRecords === 'string'
            ? evictionRecords
            : Array.isArray(evictionRecords)
                ? evictionRecords.flatMap(record => record || [])
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
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Eviction Records</Text>
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
                                const isArray = Array.isArray(normalEvictionRecords);
                                const isObjectArray = isArray && typeof normalEvictionRecords[0] === 'object';
                                const isString = typeof normalEvictionRecords === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalEvictionRecords}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalEvictionRecords[0] === 'object') {
                                    return normalEvictionRecords.map((item, index) => (
                                        <View key={index}
                                            style={{
                                                ...styles.hiddenCard,
                                                backgroundColor: colors.secondaryThemeColor,
                                            }}
                                        >
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Job Title : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.jobTitle}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Employer : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.employer}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Start Date : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.startDate}</Text>
                                            </View>
                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>End Date : </Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{item?.endDate}</Text>
                                            </View>
                                            <View style={styles.lockview}>
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

export default EvictionRecords

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