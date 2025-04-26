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
import DropdownPicker from '../../Ui/DropdownPicker';
import { accountType, Industry } from '../../Constants/options';
import AuthService from '../../Services/Auth';
import Toast from "react-native-simple-toast";
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/User';

const { width, height } = Dimensions.get('screen');

const SignUp = () => {
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

    const [selectAccount, setSelectAccount] = useState('')
    const [selectIndustry, setSelectIndustry] = useState('')
    const [isCustomIndustry, setIsCustomIndustry] = useState(false);
    const [businessName, setBusinessName] = useState('')
    const [position, setPosition] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cnf_password, setCnf_Password] = useState('')
    const [hidePassword, setHidePassword] = useState(true);
    const [cnf_hidePassword, setCnf_HidePassword] = useState(true);
    const [buttonLoader, setbuttonLoader] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    console.log('====================================', email);
    console.log();
    console.log('====================================');


    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|us|org|edu|gov)$/i;
        return emailRegex.test(email);
    };

    const validate = () => {
        const errors = {};
        if (name.trim() === "") {
            errors.name = "Name is required";
        }

        if (email.trim() === "") {
            errors.email = "Email is required";
        } else if (!validateEmail(email)) {
            errors.email = "Enter a valid email ID";
        }

        if (password.trim() === "") {
            errors.password = "Password is required";
        }

        if (cnf_password.trim() === "") {
            errors.cnf_password = "Confirm password is required";
        } else if (cnf_password !== password) {
            errors.cnf_password = "Passwords do not match";
        }

        if (!selectAccount) {
            errors.selectAccount = "Account type is required";
        }

        if (selectAccount === "Business") {
            if (businessName.trim() === "") {
                errors.businessName = "Business name is required";
            }

            if (position.trim() === "") {
                errors.position = "Position/Role is required";
            }

            if (!selectIndustry || selectIndustry.trim() === "") {
                errors.selectIndustry = "Industry selection is required";
            }

            if (selectIndustry === "Other" && isCustomIndustry) {
                errors.selectIndustry = "Specify Industry is required";
            }
        }

        setFormErrors(errors);  // ✅ Always set errors at the end

        return Object.keys(errors).length === 0;  // ✅ return true if no error
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }
        const payload = {
            fullName: name,
            email: email,
            password: password,
            accountType: selectAccount,
            businessName: businessName,
            position: position,
            industry: selectIndustry,
        };
        console.log('Sending register payload to:', payload);
        try {
            setbuttonLoader(true)
            const res = await AuthService.setRegister(payload);
            console.log('✅ Register API response:', res);
            const normalizedUserData = {
                id: res.data?.id,
                fullName: res.data?.fullName,
                email: res.data?.email,
                accountType: res.data?.accountType,
                createdAt: res.data?.createdAt,
            };
            dispatch(setUser(normalizedUserData));
            NavigationService.navigate('Login');
            Toast.show(res?.message);
        } catch (error) {
            console.error("Full Reg error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setbuttonLoader(false);
        }
    };


    return (
        <View style={{ ...styles.Container, }}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    backgroundColor: '#f0f0f0',
                    paddingBottom: selectAccount === "Business" ? moderateScale(260) : 0
                }}
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
                        <Text style={{ ...styles.welcome_txt, color: colors.primaryFontColor }}>Hello there!</Text>
                        <Text style={{ ...styles.sub_title, color: colors.tintText }}>  Join us for the full experience — or just look around for now.</Text>

                        {/* <Text style={{ ...styles.pic_upload_txt, color: colors.primaryFontColor }}>Profile Picture</Text>
                        <View style={{ ...styles.user_circle, backgroundColor: colors.secondaryThemeColor }}>
                            <Image source={require('../../assets/images/upload.png')} style={styles.user_img} />
                        </View> */}
                        <View>
                            <Text style={{ ...styles.title_txt, marginTop: 20, color: colors.primaryFontColor }}>Account Type</Text>
                            <DropdownPicker
                                labelKey="name"
                                valueKey="id"
                                placeholder="Account Type"
                                options={accountType}
                                selectedValue={selectAccount}
                                onValueChange={(val) => setSelectAccount(val)}
                                textStyle={{
                                    fontSize: moderateScale(13),
                                    fontFamily: FONTS.Inter.regular,
                                }}
                            />
                            {formErrors.selectAccount && (
                                <Text style={styles.error_message}>{formErrors.selectAccount}</Text>
                            )}
                        </View>
                        {selectAccount === "Business" && (
                            <>
                                <CustomInput
                                    title="Business Name"
                                    titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                                    placeholder="Business Name"
                                    inputStyle={{ ...styles.input_sty, }}
                                    containerStyle={{ ...styles.input_container }}
                                    leftIcon={{
                                        name: 'business-center',
                                        type: 'MaterialIcons',
                                        color: colors.tintText,
                                        size: 18
                                    }}
                                    value={businessName}
                                    onChangeText={(val) => setBusinessName(val)}
                                />

                                {formErrors.businessName && (
                                    <Text style={styles.error_message}>{formErrors.businessName}</Text>
                                )}
                                <CustomInput
                                    title="Position/Role"
                                    titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                                    placeholder="Position/Role"
                                    inputStyle={{ ...styles.input_sty, }}
                                    containerStyle={{ ...styles.input_container }}
                                    leftIcon={{
                                        name: 'torso-business',
                                        type: 'Foundation',
                                        color: colors.tintText,
                                        size: 18
                                    }}
                                    value={position}
                                    onChangeText={(val) => setPosition(val)}
                                />
                                {formErrors.position && (
                                    <Text style={styles.error_message}>{formErrors.position}</Text>
                                )}


                                <View>
                                    <Text style={{ ...styles.title_txt, color: colors.primaryFontColor }}>Industry</Text>
                                    <DropdownPicker
                                        labelKey="name"
                                        valueKey="id"
                                        placeholder="Select an Industry"
                                        options={Industry}
                                        selectedValue={selectIndustry}
                                        textStyle={{
                                            fontSize: moderateScale(13),
                                            fontFamily: FONTS.Inter.regular,
                                        }}
                                        onValueChange={(val) => {
                                            setSelectIndustry(val);
                                            setIsCustomIndustry(val === 'Other');
                                        }}
                                    />
                                    {formErrors.selectIndustry && (
                                        <Text style={styles.error_message}>{formErrors.selectIndustry}</Text>
                                    )}
                                </View>

                                {selectAccount === "Business" && isCustomIndustry && (
                                    <CustomInput
                                        title="Specify Industry"
                                        titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                                        placeholder="Specify Industry"
                                        inputStyle={{ ...styles.input_sty, }}
                                        containerStyle={{ ...styles.input_container }}
                                        leftIcon={{
                                            name: 'business-center',
                                            type: 'MaterialIcons',
                                            color: colors.tintText,
                                            size: 18
                                        }}
                                        value={selectIndustry === 'Other' ? '' : selectIndustry}
                                        onChangeText={(val) => setSelectIndustry(val)}
                                    />
                                )}
                                {/* {formErrors.selectIndustry && (
                                    <Text style={styles.error_message}>{formErrors.selectIndustry}</Text>
                                )} */}
                            </>
                        )}
                        <CustomInput
                            title="Name"
                            titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                            placeholder="Enter Your Name"
                            inputStyle={{ ...styles.input_sty, }}
                            containerStyle={{ ...styles.input_container }}
                            leftIcon={{
                                name: 'user-o',
                                type: 'FontAwesome',
                                color: colors.tintText,
                                size: 18
                            }}
                            value={name}
                            onChangeText={(val) => setName(val)}
                        />
                        {formErrors.name && (
                            <Text style={styles.error_message}>{formErrors.name}</Text>
                        )}

                        <CustomInput
                            title="Email"
                            titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
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
                            titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
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
                        {formErrors.password && (
                            <Text style={styles.error_message}>{formErrors.password}</Text>
                        )}


                        <CustomInput
                            title="Re-enter Password"
                            titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                            placeholder="Confirm your Password"
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
                            style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}>
                            {buttonLoader ? (
                                <ActivityIndicator size="small" color={'#fff'} />
                            ) : (
                                <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Submit</Text>
                            )}
                        </TouchableOpacity>
                        <Text
                            onPress={() => NavigationService.navigate('Login')}
                            style={{ ...styles.sub_title, color: colors.tintText }}>Signed up already?
                            <Text style={{ color: colors.buttonColor }}>{" "}Let’s log you in</Text> </Text>

                    </View>

                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default SignUp;
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
        height: height,
        width: '100%',
        padding: moderateScale(15),
        paddingTop: moderateScale(20)
    },
    pic_upload_txt: {
        fontSize: moderateScale(15),
        fontFamily: FONTS.Inter.semibold,
        textAlign: 'center',
        marginTop: moderateScale(20)
    },
    welcome_txt: {
        fontSize: moderateScale(26),
        fontFamily: FONTS.Inter.semibold,
        textAlign: 'center'
    },
    user_circle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(100),
        width: moderateScale(100),
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
    input_container: {
        height: moderateScale(50),
        borderRadius: moderateScale(15),
        elevation: moderateScale(1),
        borderWidth: 0.3,
    },
    sub_title: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.medium,
        textAlign: 'center',
        alignSelf: 'center',
    },
    button_sty: {
        height: moderateScale(44),
        marginTop: moderateScale(70),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(12),
        marginBottom: moderateScale(15)
    },
    button_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    error_message: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
        color: 'red'
    }
});
