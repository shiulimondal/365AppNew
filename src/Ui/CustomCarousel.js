// PlanCarousel.js
import React from 'react';
import { View, Dimensions, Animated, FlatList } from 'react-native';
import { moderateScale } from '../Constants/PixelRatio';
import { useTheme } from '../../ThemeContext';

const { width } = Dimensions.get('window');

const CustomCarousel = ({
    data,
    scrollX,
    currentIndex,
    onMomentumScrollEnd,
    CARD_WIDTH,
    renderItem
}) => {
    const { colors } = useTheme();
    return (
        <View style={{ height: '98%' }}>
            <Animated.FlatList
                data={data}
                horizontal
                onMomentumScrollEnd={onMomentumScrollEnd}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                decelerationRate="fast"
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 15 }}
                renderItem={renderItem}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(7) }}>
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            height: moderateScale(7),
                            width: currentIndex === i ? 20 : 7,
                            backgroundColor: currentIndex === i ? colors.buttonColor : colors.tintText,
                            borderRadius: moderateScale(4),
                            marginHorizontal: moderateScale(4),
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default CustomCarousel;
