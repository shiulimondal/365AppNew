import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
    Animated,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import CustomInput from '../../Ui/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const UserProfile = () => {
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
                    <ProfileHeader />

                </View>

                <Animated.View
                    style={[
                        styles.tabView,
                        {
                            backgroundColor: '#f0f0f0',
                            transform: [{ translateY }],
                            opacity,
                            marginTop: moderateScale(-50),
                        },
                    ]}>
                    <View style={styles.card_view}>
                        {
                            !login_status && guest_status ?
                                <View style={styles.title_view}>
                                    <Text style={{
                                        ...styles.pic_upload_txt,
                                        color: colors.primaryFontColor
                                    }}>Hold On!</Text>
                                    <Text style={{
                                        ...styles.subtitle_header, color: colors.tintText
                                    }}> It looks like you’re not signed in. To access your profile, view your saved details, update your information, and enjoy a personalized experience, you need to log in first. Please sign in to continue.</Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Login')}
                                        style={{ ...styles.con_button_sty, backgroundColor: colors.buttonColor }}    >
                                        <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <>
                                    <CustomInput
                                        title="Name"
                                        titleStyle={{ ...styles.title_txt, marginTop: 25 }}
                                        placeholder="Enter Your Name"
                                        inputStyle={{ ...styles.input_sty, }}
                                        leftIcon={{
                                            name: 'user-o',
                                            type: 'FontAwesome',
                                            color: colors.tintText,
                                            size: 18
                                        }}
                                    />

                                    <CustomInput
                                        title="Email"
                                        titleStyle={{ ...styles.title_txt }}
                                        placeholder="Enter Your Email"
                                        inputStyle={{ ...styles.input_sty, }}
                                        leftIcon={{
                                            name: 'email',
                                            type: 'Fontisto',
                                            color: colors.tintText,
                                            size: 18
                                        }}

                                    />



                                </>
                        }
                    </View>

                </Animated.View>

            </ScrollView>
            {(login_status && !guest_status) && (
                <TouchableOpacity
                    // onPress={() =>}
                    style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}    >
                    <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Submit</Text>
                </TouchableOpacity>
            )}


        </View>
    );
};

export default UserProfile;
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
        padding: moderateScale(15),
        paddingTop: moderateScale(20)
    },
    title_view: {
        marginTop: moderateScale(70),
        alignItems: 'center'
    },
    pic_upload_txt: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.semibold,
        textAlign: 'center'
    },
    subtitle_header: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.medium,
        textAlign: 'center',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(10)
    },
    user_circle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(80),
        width: moderateScale(80),
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        marginTop: moderateScale(15)
    },
    user_img: {
        height: moderateScale(60),
        width: moderateScale(60),
        resizeMode: 'cover',
    },
    title_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.semibold,
        marginTop: moderateScale(10)
    },
    input_sty: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },

    button_sty: {
        height: moderateScale(44),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(12),
        marginBottom: moderateScale(15)
    },
    con_button_sty: {
        height: moderateScale(44),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        width: moderateScale(300)
    },
    button_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },

});
