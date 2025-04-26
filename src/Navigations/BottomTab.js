import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text, StyleSheet, Keyboard } from 'react-native';
import { moderateScale } from '../Constants/PixelRatio';
import { useTheme } from '../../ThemeContext';
import Home from '../Screens/Home/Home';
import Search from '../Screens/Search/Search';
import UserProfile from '../Screens/UserProfile/UserProfile';
import { FONTS } from '../Constants/Fonts';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Bottom = createBottomTabNavigator();

const UserTabWrapper = () => {
    const { login_status, guest_status } = useSelector(state => state.User);
    const navigation = useNavigation();

    console.log('==================guest_status==================', guest_status);
    console.log('====================login_status================', login_status);

    useEffect(() => {
        // If neither logged in nor guest, navigate to Login screen
        if (!login_status && guest_status) {
            navigation.navigate('Login');
        }
    }, [login_status, guest_status, navigation]);

    // Only show UserProfile if logged in, else show nothing or navigate to login screen
    return login_status ? <UserProfile /> : null;
};

const BottomTab = () => {
    const { colors } = useTheme();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <Bottom.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#e0e0e0',
                tabBarStyle: isKeyboardVisible
                    ? { display: 'none' }
                    : {
                        backgroundColor: colors.bottomTab,
                        height: moderateScale(50),
                        paddingTop: moderateScale(7),
                        borderRadius: moderateScale(30),
                        marginBottom: moderateScale(20),
                        marginHorizontal: moderateScale(15),
                    },
            }}
        >
            <Bottom.Screen
                name="Home"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[
                                styles.tabItem,
                                {
                                    backgroundColor: focused
                                        ? colors.buttonColor
                                        : colors.bottomTab,
                                },
                            ]}
                        >
                            <Image
                                source={require('../assets/images/home.png')}
                                resizeMode="contain"
                                style={styles.tabIcon}
                            />
                            <Text style={[styles.tabLabel, { color: colors.subFontcolor }]}>
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />

            <Bottom.Screen
                name="Search"
                component={Search}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[
                                styles.tabItem,
                                {
                                    backgroundColor: focused
                                        ? colors.buttonColor
                                        : colors.bottomTab,
                                },
                            ]}
                        >
                            <Image
                                source={require('../assets/images/search.png')}
                                resizeMode="contain"
                                style={styles.tabIcon}
                            />
                            <Text style={[styles.tabLabel, { color: colors.subFontcolor }]}>
                                Search
                            </Text>
                        </View>
                    ),
                }}
            />

            <Bottom.Screen
                name="User"
                component={UserProfile}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[
                                styles.tabItem,
                                {
                                    backgroundColor: focused
                                        ? colors.buttonColor
                                        : colors.bottomTab,
                                },
                            ]}
                        >
                            <Image
                                source={require('../assets/images/profile.png')}
                                resizeMode="contain"
                                style={styles.tabIcon}
                            />
                            <Text style={[styles.tabLabel, { color: colors.subFontcolor }]}>
                                User
                            </Text>
                        </View>
                    ),
                }}
            />
        </Bottom.Navigator>
    );
};

const styles = StyleSheet.create({
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: moderateScale(90),
        padding: moderateScale(8),
        borderRadius: moderateScale(17),
    },
    tabIcon: {
        height: moderateScale(18),
        width: moderateScale(18),
        marginRight: moderateScale(7),
    },
    tabLabel: {
        fontSize: moderateScale(15),
        fontFamily: FONTS.Inter.light,
    },
});

export default BottomTab;
