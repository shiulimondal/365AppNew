import React from 'react';
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../Constants/PixelRatio';

const ShimmerLoader = () => {
    return (
        <View style={{ padding: moderateScale(15) }}>
            {[...Array(10)].map((_, i) => (
                <View key={i} style={{ marginTop: moderateScale(20) }}>
                    <ShimmerPlaceholder
                        shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                        LinearGradient={LinearGradient}
                        style={{
                            height: moderateScale(150),
                            borderRadius: moderateScale(10),
                            width: moderateScale(320),
                        }}
                        shimmerStyle={{ borderRadius: moderateScale(10) }}
                    />
                </View>
            ))}
        </View>
    );
};

export default ShimmerLoader;
