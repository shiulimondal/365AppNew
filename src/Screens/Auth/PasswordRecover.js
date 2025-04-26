import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import CustomInput from '../../Ui/CustomInput';
import BackHeader from '../../Components/Header/BackHeader';
import Icon from '../../Ui/Icon';
import NavigationService from '../../Services/Navigation';
import { useRoute } from '@react-navigation/native';
import Toast from "react-native-simple-toast";
import AuthService from '../../Services/Auth';

const { width, height } = Dimensions.get('screen');

const PasswordRecover = () => {
    const route = useRoute()
    const getData = route.params.allData
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

    const [otpData, setOtpData] = useState(['', '', '', '', '', ''])
    const [showOtpBox, setShowOtpBox] = useState(true)
    const inputRefs = useRef([])
    const [otpLoader, setOtpLoader] = useState(false);
    const handleOtpChange = (value, index) => {
        const updatedOtp = [...otpData];
        updatedOtp[index] = value;
        setOtpData(updatedOtp);
        if (value && index < otpData.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace') {
            if (otpData[index] === '' && index > 0) {
                const updatedOtp = [...otpData];
                updatedOtp[index - 1] = '';
                setOtpData(updatedOtp);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };
    const handleOtpSubmit = async () => {
        const getOTP = otpData.join('')
        if (!getOTP) {
            Toast.show('Enter OTP');
            return;
        }
        const payload = {
            email: getData?.email,
            otp: getOTP
        };
        console.log('Sending forgot payload to:', payload);
        try {
            setOtpLoader(true)
            const res = await AuthService.setotpVerify(payload);
            setShowOtpBox(false)
            console.log('✅ otpverifu API response:', res);
            Toast.show(res?.message);
        } catch (error) {
            console.error("otpverifu error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setOtpLoader(false)
        }
    };
    const [password, setPassword] = useState('')
    const [cnf_password, setCnf_Password] = useState('')
    const [hidePassword, setHidePassword] = useState(true);
    const [cnf_hidePassword, setCnf_HidePassword] = useState(true);
    const [buttonLoader, setbuttonLoader] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (password.trim() === "") {
            errors.password = "Password is required";
        }
        if (cnf_password.trim() === "") {
            errors.cnf_password = "Confirm password is required";
        } else if (cnf_password !== password) {
            errors.cnf_password = "Passwords do not match";
        }
        setFormErrors(errors);  // ✅ Always set errors at the end

        return Object.keys(errors).length === 0;  // ✅ return true if no error
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }
        const getOTP = otpData.join('')
        const payload = {
            email: getData?.email,
            otp: getOTP,
            newPassword: password,
            confirmPassword: cnf_password
        };
        console.log('Sending forgot payload to:', payload);
        try {
            setbuttonLoader(true)
            const res = await AuthService.setResetPassword(payload);

            console.log('✅  reallll Password API response:', res);

            Toast.show(res?.message);
        } catch (error) {
            console.error("Full Log error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setbuttonLoader(false)
        }
    };

    return (
        <View style={{ ...styles.Container, }}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: '#f0f0f0', }}
            >
                <View style={{ ...styles.top_view, backgroundColor: 'rgba(10, 104, 201, 1)', }}>
                    <BackHeader icon={false} />

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
                        <Text style={{ ...styles.welcome_txt, color: colors.primaryFontColor }}>Reset Your Password</Text>
                        <Text style={{ ...styles.sub_title, color: colors.tintText }}>Enter and confirm your new password below</Text>
                        {showOtpBox && (
                            <>
                                <View style={styles.inputContainer}>
                                    {otpData.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            style={{
                                                ...styles.otp_sty,
                                                backgroundColor: digit ? colors.cardColor : colors.inputBox,
                                                color: colors.primaryFontColor,
                                                borderColor: digit ? colors.inputBorder : colors.borderColor,
                                            }}
                                            value={digit}
                                            maxLength={1}
                                            keyboardType="numeric"
                                            onChangeText={(value) => handleOtpChange(value, index)}
                                            onKeyPress={(event) => handleKeyPress(event, index)}
                                            ref={(ref) => (inputRefs.current[index] = ref)}
                                            textAlign="center"
                                        />
                                    ))}
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleOtpSubmit()}
                                    style={{ ...styles.buttonotp_sty, backgroundColor: colors.buttonColor }}>
                                    <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>
                                        {otpLoader ? "Verifying..." : "Verify OTP"}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {!showOtpBox && (
                            <>
                                <CustomInput
                                    title="New Password"
                                    titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                                    placeholder="Enter New Password"
                                    inputStyle={{ ...styles.input_sty }}
                                    containerStyle={{ ...styles.input_container }}
                                    secureTextEntry={hidePassword}
                                    leftIcon={{
                                        name: 'lock-outline', type: 'MaterialIcons', color: colors.tintText, size: 20,
                                    }}
                                    rightAction={
                                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                            <Icon
                                                name={hidePassword ? 'eye' : 'eye-off'}
                                                type="Feather"
                                                color={colors.tintText}
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    }
                                    value={password}
                                    onChangeText={(val) => setPassword(val)}
                                />
                                {formErrors.password && (
                                    <Text style={styles.error_message}>{formErrors.password}</Text>
                                )}


                                <CustomInput
                                    title="Confirm Password"
                                    titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                                    placeholder="Re-enter new password"
                                    inputStyle={{ ...styles.input_sty }}
                                    containerStyle={{ ...styles.input_container }}
                                    secureTextEntry={cnf_hidePassword}
                                    leftIcon={{
                                        name: 'lock-outline', type: 'MaterialIcons', color: colors.tintText, size: 20,
                                    }}
                                    rightAction={
                                        <TouchableOpacity onPress={() => setCnf_HidePassword(!cnf_hidePassword)}>
                                            <Icon
                                                name={cnf_hidePassword ? 'eye' : 'eye-off'}
                                                type="Feather"
                                                color={colors.tintText}
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    }
                                    value={cnf_password}
                                    onChangeText={(val) => setCnf_Password(val)}
                                />
                                {formErrors.cnf_password && (
                                    <Text style={styles.error_message}>{formErrors.cnf_password}</Text>
                                )}


                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}    >
                                    {buttonLoader ? (
                                        <ActivityIndicator size="small" color={'#fff'} />
                                    ) : (
                                        <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Submit</Text>
                                    )}

                                </TouchableOpacity>
                            </>
                        )}


                    </View>

                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default PasswordRecover;
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
    inputContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: moderateScale(300),
        justifyContent: 'space-between',
        marginTop: moderateScale(25),
    },
    otp_sty: {
        borderWidth: 1,
        borderRadius: moderateScale(5),
        width: moderateScale(45),
        height: moderateScale(45),
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15)
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
    buttonotp_sty: {
        height: moderateScale(44),
        marginTop: moderateScale(40),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(12),
        marginBottom: moderateScale(15),
        width: moderateScale(120),
        alignSelf: 'center'
    },
    error_message: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
        color: 'red'
    }
});
