import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import HomeDetails from '../../Components/HomeCard/HomeDetails';
import NavigationService from '../../Services/Navigation';
import HomeHeader from '../../Components/Header/HomeHeader';

const { width, height } = Dimensions.get('window');

const Home = () => {
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

    return (
        <View
            style={{
                ...styles.Container,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: '#f0f0f0', }}>
                <View style={{ ...styles.top_view, backgroundColor: 'rgba(10, 104, 201, 1)', }}>

                    <HomeHeader />
                </View>
                <Animated.View
                    style={[
                        styles.tabView,
                        {
                            backgroundColor: '#f0f0f0',
                            transform: [{ translateY }],
                            opacity,
                        },
                    ]}>
                    <HomeDetails />
                </Animated.View>
            </ScrollView>
        </View>
    );
};

export default Home;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(10, 104, 201, 1)',
    },
    top_view: {
        width: width,
        height: moderateScale(280),
        paddingHorizontal: moderateScale(7),
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopRightRadius: moderateScale(30),
        borderTopLeftRadius: moderateScale(30),
        marginTop: moderateScale(-20),
    },
});
