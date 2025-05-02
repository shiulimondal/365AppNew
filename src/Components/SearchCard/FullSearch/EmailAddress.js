import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../ThemeContext';
import Icon from '../../../Ui/Icon';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import LoadingSpinner from '../../../Ui/LoadingSpinner';
import Tooltip from 'react-native-walkthrough-tooltip';


const { width, height } = Dimensions.get('screen');
const EmailAddress = ({ emailData, openLock }) => {
    const { colors } = useTheme();
    const [showContent, setShowContent] = useState(false);
    const [showHiddenCard, setShowHiddenCard] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
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
        <TouchableOpacity>

            {typeof normalemailData === 'string' ? (
                // Show only this when it's a string
                <View>
                    <Tooltip
                        isVisible={showTooltip}
                        content={
                            <View style={{
                                minWidth: 250,
                                maxWidth: 300,
                                padding: 5,
                            }}>
                                {
                                    !openLock ?
                                        <Text style={{ ...styles.showMessage_txt, color: colors.secondaryFontColor }}>
                                            These details, if available, would be unlocked with a Premium Report.
                                        </Text>
                                        :
                                        <Text style={{ ...styles.showMessage_txt, color: colors.secondaryFontColor }}>
                                            {normalemailData}
                                        </Text>
                                }

                            </View>
                        }
                        placement="top"
                        onClose={() => setShowTooltip(false)}
                        backgroundColor="rgba(0,0,0,0.5)"
                        displayInsets={{ top: 15, bottom: 15, left: 10, right: 10 }}
                    >
                        {!showTooltip && (
                            <TouchableOpacity onPress={() => setShowTooltip(true)} style={styles.touchable}>
                                <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Email Addresses:</Text>
                                <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                            </TouchableOpacity>
                        )}
                    </Tooltip>

                    {showTooltip && (
                        <TouchableOpacity onPress={() => setShowTooltip(true)} style={styles.touchable}>
                            <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Email Addresses:</Text>
                            <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <View style={styles.hide_view}>
                    <TouchableOpacity onPress={toggleCard} style={styles.lockview}>
                        <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>
                            Email Addresses: ({emailData?.length})
                        </Text>
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
        </TouchableOpacity>
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
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10),
        backgroundColor: '#f0f0f0',
        borderRadius: moderateScale(4),
    },
    showMessage_txt: {
        fontSize: moderateScale(14),
        textAlign: 'center',
        flexWrap: 'wrap',
        fontFamily: FONTS.Inter.regular,
    }
})