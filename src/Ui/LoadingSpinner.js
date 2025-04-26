import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Image, View } from 'react-native';

const LoadingSpinner = ({ size = 50, color = '#3b82f6' }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
                source={require('../assets/images/loading.png')}
                style={{
                    width: size,
                    height: size,
                    transform: [{ rotate: spin }],
                }}
            />
        </View>
    );
};

export default LoadingSpinner;
