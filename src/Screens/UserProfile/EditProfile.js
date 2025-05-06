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
import Icon from '../../Ui/Icon';
import DropdownPicker from '../../Ui/DropdownPicker';
import TypePicker from '../../Ui/TypePicker';
import { accountType, Industry } from '../../Constants/options';

const { width, height } = Dimensions.get('screen');

const EditProfile = () => {
    const { colors } = useTheme();
    const { login_status, guest_status, userData } = useSelector(state => state.User);
    console.log('====================userData----================', userData);

    const [selectAccount, setSelectAccount] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [position, setPosition] = useState('');
    const [selectIndustry, setSelectIndustry] = useState('');
    const [customIndustryValue, setCustomIndustryValue] = useState('');
    const [isCustomIndustry, setIsCustomIndustry] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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

    useEffect(() => {
        if (userData) {
            const industryIds = Industry.map(item => item.id);
            const userIndustry = userData.industry?.trim();
            const isCustom = userIndustry && !industryIds.includes(userIndustry);
            setSelectIndustry(isCustom ? 'Other' : userIndustry);
            setCustomIndustryValue(isCustom ? userIndustry : '');
            setIsCustomIndustry(isCustom);
            setSelectAccount(userData.accountType === 'business' ? 'Business' : 'Individual');
            setBusinessName(userData.businessName || '');
            setPosition(userData.position?.trim() || '');
            setName(userData.fullName || '');
            setEmail(userData.email || '');
        }
    }, [userData]);




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
                            marginTop: moderateScale(-30),
                        },
                    ]}>

                    <View style={styles.card_view}>

                        <View>
                            <Text style={{ ...styles.title_txt, marginTop: 20, color: colors.primaryFontColor }}>Account Type</Text>
                            <TypePicker
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
                                            const custom = val === 'Other';
                                            setIsCustomIndustry(custom);
                                            if (!custom) {
                                                setCustomIndustryValue('');
                                            }
                                        }}
                                    />

                                </View>

                                {selectAccount === "Business" && isCustomIndustry && (
                                    <CustomInput
                                        title="Specify Industry"
                                        titleStyle={{ ...styles.title_txt, color: colors.primaryFontColor }}
                                        placeholder="Specify Industry"
                                        inputStyle={{ ...styles.input_sty }}
                                        containerStyle={{ ...styles.input_container }}
                                        leftIcon={{
                                            name: 'business-center',
                                            type: 'MaterialIcons',
                                            color: colors.tintText,
                                            size: 18
                                        }}
                                        value={customIndustryValue}
                                        onChangeText={(val) => setCustomIndustryValue(val)}
                                    />
                                )}

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

export default EditProfile;
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
