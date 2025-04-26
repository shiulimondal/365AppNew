import React from 'react';
import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../Constants/PixelRatio';

const SearchLoader = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header */}
            <View style={{
                backgroundColor: 'rgba(10, 104, 201, 1)',
                paddingHorizontal: moderateScale(20),
                borderBottomLeftRadius: moderateScale(20),
                borderBottomRightRadius: moderateScale(20),
                height: moderateScale(210),
                paddingTop: moderateScale(40)
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <ShimmerPlaceholder
                        shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                        LinearGradient={LinearGradient}
                        style={{
                            width: moderateScale(70),
                            height: moderateScale(40),
                            borderRadius: moderateScale(5),
                            marginBottom: moderateScale(10),
                        }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <ShimmerPlaceholder
                            shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                            LinearGradient={LinearGradient}
                            style={{
                                width: moderateScale(120),
                                height: moderateScale(23),
                                borderRadius: moderateScale(5),
                            }}
                        />
                        <ShimmerPlaceholder
                            shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                            LinearGradient={LinearGradient}
                            style={{
                                width: moderateScale(40),
                                height: moderateScale(40),
                                borderRadius: moderateScale(20),
                                marginLeft: moderateScale(10)
                            }}
                        />
                    </View>

                </View>
                <ShimmerPlaceholder
                    shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                    LinearGradient={LinearGradient}
                    style={{
                        width: moderateScale(80),
                        height: moderateScale(20),
                        borderRadius: moderateScale(5),
                        marginBottom: moderateScale(10),
                        marginTop: moderateScale(20)
                    }}
                />
                <ShimmerPlaceholder
                    shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                    LinearGradient={LinearGradient}
                    style={{
                        width: moderateScale(150),
                        height: moderateScale(18),
                        borderRadius: moderateScale(5),
                        marginBottom: moderateScale(6),
                    }}
                />
                <ShimmerPlaceholder
                    shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                    LinearGradient={LinearGradient}
                    style={{
                        width: moderateScale(220),
                        height: moderateScale(16),
                        borderRadius: moderateScale(5),
                    }}
                />
            </View>

            {/* Sections */}
            <View style={{ padding: moderateScale(15), marginTop: moderateScale(20) }}>

                {[...Array(9)].map((_, i) => (
                    <ShimmerPlaceholder
                        key={i}
                        shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                        LinearGradient={LinearGradient}
                        style={{
                            width: '100%',
                            height: moderateScale(35),
                            borderRadius: moderateScale(7),
                            marginBottom: moderateScale(10),
                        }}
                    />
                ))}

                {/* Unlock Full Details Button */}
                <View style={{ alignItems: 'center', marginTop: moderateScale(20) }}>
                    <ShimmerPlaceholder
                        shimmerColors={['#BCC0C2', '#E1E7EB', '#BCC0C2']}
                        LinearGradient={LinearGradient}
                        style={{
                            width: moderateScale(300),
                            height: moderateScale(45),
                            borderRadius: moderateScale(25),
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default SearchLoader;
