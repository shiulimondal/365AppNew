import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../ThemeContext';
import Icon from '../../../Ui/Icon';
import { moderateScale } from '../../../Constants/PixelRatio';
import { FONTS } from '../../../Constants/Fonts';
import LoadingSpinner from '../../../Ui/LoadingSpinner';


const { width, height } = Dimensions.get('screen');
const AliasesCard = ({ aliasesData }) => {
    console.log('===============aliasesData==========', aliasesData)

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

    const uniqueAliases =
        typeof aliasesData === 'string'
            ? aliasesData
            : Array.isArray(aliasesData)
                ? aliasesData.flatMap(record => record || [])
                : [];


    return (
        <View>
            <TouchableOpacity onPress={toggleCard} style={styles.hide_view}>
                <View style={styles.lockview}>
                    <Text style={{ ...styles.phone_number, color: colors.secondaryFontColor }}>Aliases: ({aliasesData?.length})</Text>


                </View>
                <TouchableOpacity onPress={toggleCard}>
                    {showHiddenCard === false ?
                        <Icon name={"down"} type={"AntDesign"} size={18} />
                        :
                        <Icon name={"up"} type={"AntDesign"} size={18} />
                    }
                </TouchableOpacity>

            </TouchableOpacity>

            {showHiddenCard && (
                <View style={styles.full_card}>
                    {!showContent ? (
                        <View style={{ marginTop: 10 }}>
                            <LoadingSpinner size={40} color={colors.buttonColor} />
                        </View>

                    ) : (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                            {uniqueAliases.map((name, index) => (
                                <Text key={index} style={styles.aliasText}>
                                    {name}{index !== uniqueAliases.length - 1 ? ', ' : ''}
                                </Text>
                            ))}
                        </View>

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

})