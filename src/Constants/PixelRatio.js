import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

// Account for pixel density
const pixelRatio = PixelRatio.get();
const isTablet = Math.min(width, height) >= 600;

const scale = size => (width / guidelineBaseWidth) * size;

const verticalScale = size => (height / guidelineBaseHeight) * size;

// Slightly more flexible moderateScale, factoring in tablets and pixel ratio
const moderateScale = (size, factor = 0.5) => {
    const scaledSize = scale(size);
    let adjusted = size + (scaledSize - size) * factor;
    // Apply conditional tweaks for high DPI devices or tablets
    if (pixelRatio >= 3 || isTablet) {
        adjusted *= 0.95; // Reduce slightly to prevent oversized scaling
    }
    // Optional: further tuning for very high resolutions (e.g., Note 10+)
    if (width >= 1080 && height >= 2000) {
        adjusted *= 0.92;
    }
    return Math.round(PixelRatio.roundToNearestPixel(adjusted));
};


// Optional: for truly responsive fonts
const responsiveFontSize = (fontSize) => {
    const heightPercent = (fontSize * height) / guidelineBaseHeight;
    return Math.round(heightPercent);
};

export {
    scale,
    verticalScale,
    moderateScale,
    responsiveFontSize,
    isTablet,
    pixelRatio,
    width,
    height
};
