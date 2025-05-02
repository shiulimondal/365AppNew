import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../../Constants/PixelRatio'
import { FONTS } from '../../Constants/Fonts'
import { useTheme } from '../../../ThemeContext'

const HistoryCard = ({ item, index }) => {
    const { colors } = useTheme();
    const { width, height } = useWindowDimensions();
    return (
        <TouchableOpacity
            // onPress={() => {
            //     // Check if the item?.personId and item are not null
            //     console.log('Dispatching with personId:', item?.personId);
            //     console.log('Dispatching with item:', item);

            //     dispatch(setSelectedUserId(item?.personId));  // Store selectedUserId
            //     dispatch(setUserData(item));  // Store userData
            //     dispatch(clearPaymentData());
            //     NavigationService.navigate('SearchProfile', { userId: item?.personId });
            // }}
            key={index}
            style={{
                marginHorizontal: moderateScale(10),
                marginTop: moderateScale(15),
                width: width - moderateScale(20)
            }}>
            {/* <Text>{index + 1}</Text> */}
            <View style={{ ...styles.card_top, backgroundColor: colors.cardColor, }}>
                <View>
                    <Text style={{ ...styles.user_name, color: colors.primaryFontColor }}>Jhon Doe</Text>
                    <Text style={{ ...styles.user_email, color: colors.tintText }}>
                        abcd@gmaqil.com
                    </Text>
                </View>
                <View>
                    <Text style={{ ...styles.user_name, color: colors.primaryFontColor }}>30 yrs</Text>
                </View>
            </View>
            <View style={{ ...styles.card_bottom, backgroundColor: colors.secondaryThemeColor, }}>
                <View style={styles.record_view}>
                    <Text style={{ ...styles.user_report, color: colors.primaryFontColor }}>First Recorded : <Text
                        style={{ color: colors.tintText }}
                    >31/12/20</Text></Text>
                    <Text style={{ ...styles.user_report, color: colors.primaryFontColor }}>Last Recorded : <Text
                        style={{ color: colors.tintText }}
                    >12/06/24</Text></Text>

                </View>

                <View>
                    <Text style={{ ...styles.user_address, color: colors.tintText }}>
                        ac,20l,120000
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HistoryCard

const styles = StyleSheet.create({
    card_top: {
        borderTopRightRadius: moderateScale(15),
        borderTopLeftRadius: moderateScale(15),
        padding: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    record_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card_bottom: {
        borderBottomRightRadius: moderateScale(15),
        borderBottomLeftRadius: moderateScale(15),
        elevation: 1,
        padding: moderateScale(10),
    },
    user_name: {
        fontSize: moderateScale(18),
        fontFamily: FONTS.Inter.bold,
    },
    user_email: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
    },
    user_report: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.medium,
    },
    user_address: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
        // maxWidth: '70%',
        marginTop: moderateScale(7)
    }
})