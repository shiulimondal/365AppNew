import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
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
import Toast from "react-native-simple-toast";
import AuthService from '../../Services/Auth';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../../Redux/reducer/User';

const { width, height } = Dimensions.get('screen');

const Login = () => {
    const dispatch = useDispatch()
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
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const [buttonLoader, setbuttonLoader] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|us|org|edu|gov)$/i;
        return emailRegex.test(email);
    };
    const validate = () => {
        const errors = {};
        if (email.trim() === "") {
            errors.email = "Email is required";
        } else if (!validateEmail(email)) {
            errors.email = "Enter a valid email ID";
        }
        if (password.trim() === "") {
            errors.password = "Password is required";
        }
        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // ----------------------------for original one -------------------------------------

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }
        const payload = {
            email: email,
            password: password,
        };
        console.log('Sending log payload to:', payload);

        try {
            setbuttonLoader(true);
            const res = await AuthService.setLogin(payload);
            console.log('✅ Log API response:---------------------------', res);

            const normalizedUserData = {
                id: res.data?.user_data?.id,
                fullName: res.data?.user_data?.fullName,
                email: res.data?.user_data?.email,
                phNumber: res.data?.user_data?.phNumber,
                address: res.data?.user_data?.address,
                imageUrl: res.data?.user_data?.imageUrl,
                accountType: res.data?.user_data?.accountType,
                position: res.data?.user_data?.position,
                businessName: res.data?.user_data?.businessName,
                industry: res.data?.user_data?.industry
            };

            const token = res.data?.token;

            // Save token separately
            await AsyncStorage.setItem('token', token);
            // Save userData
            await AsyncStorage.setItem('userData', JSON.stringify(normalizedUserData));

            // Dispatch properly
            dispatch(setUser({
                token,
                userData: normalizedUserData,
                login_status: true,
                guest_status: false,
            }));

            AuthService.setAccount(res.data);
            NavigationService.navigate('BottomTab');
            Toast.show(res?.message);
        } catch (error) {
            console.error("Full Log error:", error);
            Toast.show(error?.message || 'Oops! Something went wrong. Please try again.');
        } finally {
            setbuttonLoader(false);
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
                        <Text style={{ ...styles.welcome_txt, color: colors.primaryFontColor }}>Wellcome Back!</Text>
                        <Text style={{ ...styles.sub_title, color: colors.tintText }}>Glad to see you again. Login to continue</Text>

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
                        {formErrors.email && (
                            <Text style={styles.error_message}>{formErrors.email}</Text>
                        )}

                        <CustomInput
                            title="Password"
                            titleStyle={{ ...styles.title_txt }}
                            placeholder="Enter Your Password"
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

                        <Text
                            onPress={() => NavigationService.navigate('Email')}
                            style={{
                                ...styles.forget_password,
                                color: colors.bottomTab
                            }}>Forget Password ?</Text>

                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            disabled={buttonLoader}
                            style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}>
                            {buttonLoader ? (
                                <ActivityIndicator size="small" color={'#fff'} />
                            ) : (
                                <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Login</Text>
                            )}

                        </TouchableOpacity>
                        <Text
                            onPress={() => NavigationService.navigate('SignUp')}
                            style={{ ...styles.sub_title, color: colors.tintText }}>Don't have an account?
                            <Text style={{ color: colors.buttonColor }}>{" "}Create one</Text> </Text>
                    </View>

                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default Login;
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
        // height: height,
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
    forget_password: {
        fontFamily: FONTS.Inter.regular,
        fontSize: moderateScale(13),
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(15),
        textAlign: 'right'
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
    error_message: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
        color: 'red'
    }
});
