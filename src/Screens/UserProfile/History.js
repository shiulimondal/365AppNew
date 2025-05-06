import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
    FlatList,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import HistoryHeader from '../../Components/Header/HistoryHeader';
import { frontend_api_key, PAY_URL } from '../../Utils/HttpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShimmerLoader from '../../Ui/ShimmerLoader';
import Toast from "react-native-simple-toast";

const { width, height } = Dimensions.get('screen');

const History = () => {
    const { colors } = useTheme();
    const [isOpenModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [historyData, setHistoryData] = useState({})
    // console.log('===============historyData=====================', historyData);
    const [loading, setLoading] = useState(false);
    const [getId, setGetId] = useState('');
    const [getEmail, setGetEmail] = useState('');

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

    useEffect(() => {
        handleShowHistory()
    }, [])


    const handleShowHistory = async () => {
        const userToken = await AsyncStorage.getItem("token");
        const url = `${PAY_URL}/user/search-history`;
        console.log('🔍 URL:', url);
        console.log('🔑 Token:', userToken);
        console.log('🗝️ API Key:', frontend_api_key);
        try {
            setLoading(true);
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'x-frontend-api-key': frontend_api_key,
                },
            });

            const result = await res.json();
            const rawData = result.data || result;

            const reduced = rawData.reduce((acc, curr) => {
                const found = acc.find(item => item.searchID === curr.searchID);
                if (found) {
                    found.value += curr.value;
                } else {
                    acc.push({ ...curr });
                }
                return acc;
            }, []);

            setHistoryData(reduced);
        } catch (err) {
            console.error('History list error:', err);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmitHistory = async () => {
        const userToken = await AsyncStorage.getItem("token");
        const url = `${PAY_URL}/user/search-history/${getId}`;
        // console.log('🔍 --------------------------------------------URL:', url);
        try {
            setIsLoading(true);
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'x-frontend-api-key': frontend_api_key,
                },
                body: JSON.stringify({})
            });
            const result = await res.json();
            // console.log('===================History result=================', result);
            if (result?.success == true) {
                Toast.show(result?.message);
                setOpenModal(false)
            } else {
                Toast.show(result?.message);
            }
        } catch (err) {
            console.error('History error:', err);
            Toast.show('Something Wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


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
                    {loading ? (
                        <View>
                            <ShimmerLoader />
                        </View>

                    ) : historyData?.length === 0 ? (
                        <View style={styles.card_view}>
                            <Text style={{
                                ...styles.title_txt,
                                marginTop: moderateScale(100),
                                color: colors.secondaryFontColor,
                            }}>
                                No data found
                            </Text>
                        </View>

                    ) : (
                        <View style={styles.card_view}>
                            <Text style={{ ...styles.title_txt, color: colors.secondaryFontColor }}>Select the profile, and the invoice will be delivered to the linked email ID</Text>
                            <FlatList
                                data={historyData}
                                keyExtractor={(item, index) => item?.searchID?.toString() || index.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View index={index} style={{ ...styles.main_view, backgroundColor: colors.subFontcolor }}>
                                        <View>
                                            <Text style={{ ...styles.username, color: colors.primaryFontColor }}>{item?.searchItemName}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ ...styles.id_txt, color: colors.primaryFontColor }}>Id : </Text>
                                                <Text style={{ ...styles.email_txt, color: colors.tintText }}>{item?.searchID
                                                }</Text>
                                            </View>

                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setOpenModal(true),
                                                    setGetId(item?.id)
                                                setGetEmail(item?.userEmail)
                                            }}
                                            style={{ ...styles.email_btn, backgroundColor: colors.buttonColor }}>
                                            <Text style={{ ...styles.buttonText_txt, color: colors.secondaryThemeColor }}>Send Mail</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    )}


                </Animated.View>

            </ScrollView>

            <Modal animationType="slide" transparent={true}
                visible={isOpenModal}
                onRequestClose={() => setOpenModal(false)}>

                <View style={styles.modalView}>
                    <View style={{
                        backgroundColor: '#fff', padding: moderateScale(20),
                        borderRadius: moderateScale(10)
                    }}>
                        <Text style={{ ...styles.heading_txt, }}>
                            Request Full Report
                        </Text>

                        <Text style={{ ...styles.subheading_txt, }}>
                            You will receive a full report at your email ({getEmail}) shortly after confirming.
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                onPress={() => setOpenModal(false)}
                                style={{ ...styles.button, backgroundColor: colors.secondaryFontColor }}
                            >
                                <Text style={{ ...styles.buttonText, color: colors.secondaryThemeColor }}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSubmitHistory()}
                                disabled={isLoading}
                                style={{ ...styles.button, backgroundColor: colors.buttonColor }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={colors.secondaryThemeColor} />
                                ) : (
                                    <Text style={{ ...styles.buttonText, color: colors.secondaryThemeColor }}>
                                        Yes
                                    </Text>
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </Modal>

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
    main_view: {
        padding: moderateScale(10),
        marginHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1
    },
    username: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Inter.semibold,
    },
    email_txt: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.medium,
    },
    id_txt: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.semibold,
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
    email_btn: {
        height: moderateScale(30),
        width: moderateScale(80),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(7)
    },
    buttonText_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.medium,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    heading_txt: {
        textAlign: 'center',
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.semibold,
        marginBottom: moderateScale(15)
    },
    subheading_txt: {
        textAlign: 'center',
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.medium,
    },
    button: {
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(5),
        marginTop: moderateScale(20)
    },
    buttonText: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Inter.medium,
    },

});
