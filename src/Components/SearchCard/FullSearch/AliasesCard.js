import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../ThemeContext';
import Icon from '../../../Ui/Icon';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import LoadingSpinner from '../../../Ui/LoadingSpinner';
import Tooltip from 'react-native-walkthrough-tooltip';


const { width, height } = Dimensions.get('screen');
const AliasesCard = ({ aliasesData, openLock }) => {
    console.log('===============aliasesData==========------------------------', aliasesData)

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

    const uniqueAliases =
        typeof aliasesData === 'string'
            ? aliasesData
            : Array.isArray(aliasesData)
                ? aliasesData.flatMap(record => record || [])
                : [];




    return (
        <View>

            {typeof aliasesData === 'string' ? (
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
                                            {aliasesData}
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
                                <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Aliases :</Text>
                                <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                            </TouchableOpacity>
                        )}
                    </Tooltip>

                    {showTooltip && (
                        <TouchableOpacity onPress={() => setShowTooltip(true)} style={styles.touchable}>
                            <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Aliases :</Text>
                            <Icon name={"infocirlceo"} type={"AntDesign"} size={17} color={colors.buttonColor} />
                        </TouchableOpacity>
                    )}

                </View>
            ) : (
                <View style={styles.hide_view}>
                    <TouchableOpacity onPress={toggleCard} style={styles.lockview}>
                        <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Aliases: ({aliasesData?.length})</Text>
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
                                const isArray = Array.isArray(uniqueAliases);
                                const isObjectArray = isArray && typeof uniqueAliases[0] === 'object';
                                const isString = typeof uniqueAliases === 'string';

                                if (isString) {
                                    return (
                                        <View>
                                            <Text style={{ ...styles.message_txt, color: colors.secondaryFontColor }}>
                                                {uniqueAliases}
                                            </Text>
                                        </View>
                                    );
                                }

                                if (Array.isArray(uniqueAliases) && typeof uniqueAliases[0] === 'string') {
                                    return (
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                                            {uniqueAliases.map((name, index) => (
                                                <Text key={index} style={styles.aliasText}>
                                                    {index + 1}. {name}{index !== uniqueAliases.length - 1 ? ', ' : ''}
                                                </Text>
                                            ))}
                                        </View>
                                    );
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

export default AliasesCard

const styles = StyleSheet.create({
    hide_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(10)
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
        paddingBottom: moderateScale(15),
        marginTop: moderateScale(3),
        marginBottom: moderateScale(15)
    },

    aliasText: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.medium,
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: moderateScale(10),
        backgroundColor: '#f0f0f0',
        borderRadius: moderateScale(4),
        marginBottom: moderateScale(10)

    },
    showMessage_txt: {
        fontSize: moderateScale(14),
        textAlign: 'center',
        flexWrap: 'wrap',
        fontFamily: FONTS.Inter.regular,
    }
})