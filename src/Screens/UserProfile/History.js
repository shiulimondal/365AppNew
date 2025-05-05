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
import HomeService from '../../Services/HomeServises';
import { BASE_URL_LOCAL, frontend_api_key } from '../../Utils/HttpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');

const History = () => {
    console.log('==================History Screen==================');
    console.log();
    console.log('====================================');
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

    const [userToken, setUserToken] = useState(null);
    useEffect(() => {
        checkUserStatus()
    }, [])

    const checkUserStatus = async () => {
        const userToken = await AsyncStorage.getItem("token");
        if (userToken) {
            setUserToken(userToken);
        } else {
            setUserToken(null);
        }
    };

    useEffect(() => {
        handleShowHistory()
    }, [])

    const handleShowHistory = async () => {
        const url = `${BASE_URL_LOCAL}/user/search-history`; // Add query params here if needed
        console.log('===================History url=================-------------', url);

        try {
            // setLoading(true);
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    "x-frontend-api-key": frontend_api_key
                },
            });

            const result = await res.json();
            console.log('===================History result=================-------------', result);
            // Handle the result
        } catch (err) {
            console.error('History list error:', err);
        } finally {
            // setLoading(false);
        }
    };


    // const handleSubmitHistory = async () => {
    //     const body = {
    //         // logedinUserID: userData?.id || null || ''
    //     };

    //     const url = `${BASE_URL_LOCAL}user/search-history/1`;
    //     console.log('===========================payment urllllllllllllll=========', url);

    //     try {
    //         // setLoading(true);
    //         const res = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${userToken}`,
    //             },
    //             body: JSON.stringify(body),
    //         });
    //         const result = await res.json();
    //         console.log('===================History submit  result=================', result);

    //     } catch (err) {
    //         console.error('Payment error:', err);
    //         // Toast.show('Payment failed. Please try again.');
    //     } finally {
    //         // setLoading(false);
    //     }
    // };


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
