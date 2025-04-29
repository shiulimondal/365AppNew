import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale } from '../../../Constants/PixelRatio'
import { FONTS } from '../../../Constants/Fonts'
import Icon from '../../../Ui/Icon'
import { useTheme } from '../../../../ThemeContext'
import LoadingSpinner from '../../../Ui/LoadingSpinner'

const PropertyRecords = ({ propertyRecords, openLock }) => {
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
    const normalpropertyRecords =
        typeof propertyRecords === 'string'
            ? propertyRecords
            : Array.isArray(propertyRecords)
                ? propertyRecords.flatMap(record => record || [])
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
          
            
            {typeof normalpropertyRecords === 'string' ? (
                // Show only this when it's a string
                <TouchableOpacity onPress={toggleCard} style={styles.hide_view}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Property Records:</Text>
                        <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.hide_view}>
                    <TouchableOpacity onPress={toggleCard} style={styles.lockview}>
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Property Records: ({propertyRecords?.length})</Text>
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
                                const isArray = Array.isArray(normalpropertyRecords);
                                const isObjectArray = isArray && typeof normalpropertyRecords[0] === 'object';
                                const isString = typeof normalpropertyRecords === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {normalpropertyRecords}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (isArray && typeof normalpropertyRecords[0] === 'object') {
                                    return normalpropertyRecords.map((item, index) => (
                                        <View key={index} style={{ ...styles.hiddenCard, backgroundColor: colors.secondaryThemeColor }}>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>APN:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.apn)}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Filing Date:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.filingDate)}</Text>
                                            </View>

                                            <View style={styles.lockview}>
                                                <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Record Type:</Text>
                                                <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.recordType)}</Text>
                                            </View>

                                            {item?.assessorData && (
                                                <>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>County Name:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.countyName)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Assessment Year:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.mmAssessmentYear)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Tax Value:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.saTaxVal)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Assessed Value:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.saValAssd)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Market Land Value:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.saValMrktLand)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Transfer Value:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.saValTransfer)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Year Built:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.saYrBlt)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>State Code:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.stateCode)}</Text>
                                                    </View>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>Value:</Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(item?.assessorData?.value)}</Text>
                                                    </View>
                                                </>
                                            )}

                                            {item?.names?.map((name, i) => (
                                                <View key={`owner-${i}`}>
                                                    <View style={styles.lockview}>
                                                        <Text style={{ ...styles.address_txt, color: colors.primaryFontColor }}>
                                                            {name.isOwner === 'Yes' ? 'Owner Name :' : 'Other Name :'}
                                                        </Text>
                                                        <Text style={{ ...styles.address, color: colors.secondaryFontColor }}>{blurrText(name.fullName)}</Text>
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

export default PropertyRecords

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