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

    const dataDetailos = [
        {
            icon: require('../../assets/images/report.png'),
            Dtitle: 'Arrest Reports',
            subTitle: 'Discover if individuals have ever been arrested through our comprehensive public records search.',
        },
        {
            icon: require('../../assets/images/traffic.png'),
            Dtitle: 'Traffic Reports',
            subTitle: 'Access information on collisions, traffic violations, DUIs, and speeding tickets for individuals under scrutiny.',
        },
        {
            icon: require('../../assets/images/civil.png'),
            Dtitle: 'Civil Records',
            subTitle: "Examine non-criminal court cases, such as child custody disputes, personal injury claims, or restraining orders, to gain insights into individuals' legal interactions.",
        },

        {
            icon: require('../../assets/images/lawsuits.png'),
            Dtitle: 'Lawsuits',
            subTitle: 'Public records encompass filed lawsuits and legal actions involving individuals, providing insight into their legal history.',
        },
        {
            icon: require('../../assets/images/liens.png'),
            Dtitle: 'Liens',
            subTitle: 'When individuals fail to pay their debts, their property may be temporarily seized through a lien until the debts are resolved. This information is essential for understanding financial responsibility.',
        },
        {
            icon: require('../../assets/images/phoneli.png'),
            Dtitle: 'Phone Listings',
            subTitle: 'Our online public records search makes it easy to locate individuals by name or phone number, eliminating the need for outdated phone book searches.',
        },
        {
            icon: require('../../assets/images/criminal-database.png'),
            Dtitle: 'Criminal Records',
            subTitle: 'Reveal convictions and charges against individuals to help make informed decisions about personal and professional interactions.',
        },
        {
            icon: require('../../assets/images/bankrupt.png'),
            Dtitle: 'Bankruptciess',
            subTitle: 'Bankruptcies are crucial for business partnerships and relationships, as this information discloses past financial difficulties and promotes transparency.',
        },
    ];

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
                    <HomeDetails homeData={dataDetailos} />
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
        // paddingTop: moderateScale(7),
        borderTopRightRadius: moderateScale(30),
        borderTopLeftRadius: moderateScale(30),
        marginTop: moderateScale(-20),
    },
});
