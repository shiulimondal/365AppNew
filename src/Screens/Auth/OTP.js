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
import CustomInput from '../../Ui/CustomInput';
import BackHeader from '../../Components/Header/BackHeader';
import NavigationService from '../../Services/Navigation';
import AuthService from '../../Services/Auth';
import Toast from "react-native-simple-toast";

const { width, height } = Dimensions.get('screen');

const OTP = () => {
    const { colors } = useTheme();
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
    const [email, setEmail] = useState('')
    const [buttonLoader, setbuttonLoader] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async () => {
        const payload = {
            email: email,
        };
        console.log('Sending forgot payload to:', payload);
        try {
            const res = await AuthService.setforgetPassword(payload);
            console.log('✅ Forget Password API response:', res);

            Toast.show(res?.message);
        } catch (error) {
            console.error("Full Log error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        }
    };

    return (
        <View style={{ ...styles.Container, }}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: '#f0f0f0', }}
            >
                <View style={{ ...styles.top_view, backgroundColor: 'rgba(10, 104, 201, 1)', }}>
                    <BackHeader />

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
                        <Text style={{ ...styles.welcome_txt, color: colors.primaryFontColor }}>Forgot Password?</Text>
                        <Text style={{ ...styles.sub_title, color: colors.tintText }}>Enter your registered email and we'll send you an OTP to reset it</Text>

                        <CustomInput
                            title="Email"
                            titleStyle={{ ...styles.title_txt, marginTop: 30 }}
                            placeholder="Enter Your Email"
                            inputStyle={{ ...styles.input_sty, }}
                            containerStyle={{ ...styles.input_container }}
                            leftIcon={{
                                name: 'email',
                                type: 'Fontisto',
                                color: colors.tintText,
                                size: 18
                            }}
                            value={email}
                            onChangeText={(val) => setEmail(val)}
                        />

                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}    >
                            <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Next</Text>
                        </TouchableOpacity>

                    </View>

                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default OTP;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    top_view: {
        width: width,
        height: moderateScale(250),
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
    welcome_txt: {
        fontSize: moderateScale(26),
        fontFamily: FONTS.Inter.semibold,
        textAlign: 'center'
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
        marginTop: moderateScale(15)
    },
    input_sty: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    input_container: {
        height: moderateScale(50),
        borderRadius: moderateScale(15),
        elevation: moderateScale(1),
        borderWidth: 0.3,
    },
    sub_title: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.medium,
        textAlign: 'center'
    },
    button_sty: {
        height: moderateScale(44),
        marginTop: moderateScale(45),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(12),
        marginBottom: moderateScale(15)
    },
    button_txt: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Inter.semibold,
    },

});
