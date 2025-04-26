//import liraries
import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar,
    Animated,
    ImageBackground,
} from 'react-native';
import NavigationService from '../../Services/Navigation';
import { moderateScale } from '../../Constants/PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get('screen');
// create a component
const Splash = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);

    useEffect(() => {
        setTimeout(() => {
            NavigationService.navigate('BottomTab');
        }, 3000);
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'rgba(15, 107, 202, 0.1)'} barStyle="light-content" translucent />
            <ImageBackground
                source={require('../../assets/images/bglogo.png')}
                style={styles.bg_img}>
                <LinearGradient
                    style={styles.back_main}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(10, 104, 201, 0.9)', 'rgba(15, 107, 202, 0.7)']}>
                    <Animated.View
                        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.splash_img}
                        />
                    </Animated.View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg_img: {
        height: '100%',
        width: '100%',
    },
    back_main: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splash_img: {
        height: moderateScale(100),
        width: moderateScale(180),
    },
});

//make this component available to the app
export default Splash;
