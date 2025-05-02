import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
    FlatList,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import HistoryCard from '../../Components/ProfileCard/HistoryCard';
import HistoryHeader from '../../Components/Header/HistoryHeader';

const { width, height } = Dimensions.get('screen');

const History = () => {
    const { colors } = useTheme();
    const { login_status, guest_status } = useSelector(state => state.User);
    const navigation = useNavigation();
    const viewOffset = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(viewOffset, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);
    const translateY = viewOffset.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });
    const opacity = viewOffset.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });


    return (
        <View style={{ ...styles.Container, }}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: '#f0f0f0', }}
            >
                <View style={{ ...styles.top_view, backgroundColor: 'rgba(10, 104, 201, 1)', }}>
                    <HistoryHeader />

                </View>

                <Animated.View
                    style={[
                        styles.tabView,
                        {
                            backgroundColor: '#f0f0f0',
                            transform: [{ translateY }],
                            opacity,
                            marginTop: moderateScale(-30),
                        },
                    ]}>

                    <View style={styles.card_view}>
                        <Text style={{ ...styles.title_txt, color: colors.secondaryFontColor }}>Select the profile, and the invoice will be delivered to the linked email ID</Text>
                        <FlatList
                            data={[...Array(30)]}
                            keyExtractor={(item) => item?.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <HistoryCard data={item} index={index} />
                            )}
                        />
                    </View>


                </Animated.View>

            </ScrollView>

        </View>
    );
};

export default History;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    top_view: {
        width: width,
        height: moderateScale(230),
        paddingHorizontal: moderateScale(10),
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(10),
        borderTopRightRadius: moderateScale(30),
        borderTopLeftRadius: moderateScale(30),
    },
    card_view: {
        width: '100%',
        paddingTop: moderateScale(15),
        paddingBottom: moderateScale(30)
    },
    title_view: {
        marginTop: moderateScale(70),
        alignItems: 'center'
    },
    title_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.semibold,
        marginTop: moderateScale(10),
        textAlign: 'center',
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateScale(15)
    },

});
