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
    Modal,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import ProfileHeader from '../../Components/Header/ProfileHeader';
import CustomInput from '../../Ui/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../Ui/Icon';
import NavigationService from '../../Services/Navigation';
import { logoutUser } from '../../Redux/reducer/User';

const { width, height } = Dimensions.get('screen');

const UserProfile = () => {
    const { colors } = useTheme();
    const { login_status, guest_status, userData } = useSelector(state => state.User);
    const dispatch = useDispatch();
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
    const [isOpenModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    const handleLogout = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setOpenModal(false);
            logoutUser();
            navigation.navigate('Login')
        }, 500);
    };


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
                            marginTop: moderateScale(-15),
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
                                    <TouchableOpacity
                                        onPress={() => NavigationService.navigate('EditProfile')}
                                        style={{ ...styles.hide_view, backgroundColor: colors.subFontcolor }}>
                                        <View style={styles.lockview}>
                                            <Image source={require('../../assets/images/showProfile.png')} style={styles.profile_img_sty} />
                                            <Text style={{ ...styles.phone_number, color: colors.primaryFontColor }}>My Profile</Text>
                                        </View>
                                        <Icon name={"right"} type={"AntDesign"} size={18} />

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => NavigationService.navigate('History')}
                                        style={{ ...styles.hide_view, backgroundColor: colors.subFontcolor }}>
                                        <View style={styles.lockview}>
                                            <Image source={require('../../assets/images/history.png')} style={styles.profile_img_sty} />
                                            <Text style={{ ...styles.phone_number, color: colors.primaryFontColor }}>Purchase History</Text>
                                        </View>
                                        <Icon name={"right"} type={"AntDesign"} size={18} />
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        onPress={() => setOpenModal(true)}
                                        style={{ ...styles.hide_view, backgroundColor: colors.subFontcolor }}>
                                        <View style={styles.lockview}>
                                            <Image source={require('../../assets/images/logout.png')} style={styles.profile_img_sty} />
                                            <Text style={{ ...styles.phone_number, color: colors.primaryFontColor }}>Logout</Text>
                                        </View>
                                        <Icon name={"right"} type={"AntDesign"} size={18} />
                                    </TouchableOpacity>

                                </>
                        }
                    </View>


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
                            Log Out
                        </Text>

                        <Text style={{ ...styles.subheading_txt, }}>
                            Are you sure you want to log out of your account?
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                onPress={() => setOpenModal(false)}
                                style={{ ...styles.button, backgroundColor: colors.secondaryFontColor }}
                            >
                                <Text style={{ ...styles.buttonText, color: colors.secondaryThemeColor }}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleLogout()}
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

export default UserProfile;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    top_view: {
        width: width,
        height: moderateScale(260),
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
    hide_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(15),
        padding: moderateScale(15),
        borderRadius: moderateScale(10),
    },
    lockview: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    phone_number: {
        fontSize: moderateScale(18),
        fontFamily: FONTS.Inter.medium,
        marginRight: moderateScale(7)
    },
    profile_img_sty: {
        height: moderateScale(24),
        width: moderateScale(24),
        resizeMode: 'contain',
        marginRight: moderateScale(10),
        tintColor: '#0E192A'
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
