import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity,
    TextInput, ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useTheme } from '../../../ThemeContext';
import { WebView } from 'react-native-webview';
import { COUPON_URL, frontend_api_key, PAY_URL, payment_api_key } from '../../Utils/HttpClient';
import NavigationService from '../../Services/Navigation';
import { setPaymentData } from '../../Redux/reducer/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const PaymentCard = ({ price, setPaymentModal, planName }) => {
    const { login_status, guest_status, userData } = useSelector(state => state.User);

    // console.log('=================payment daaaaaaaaaaaaaaaa user===================', userData);

    const [userToken, setUserToken] = useState(null);
    useEffect(() => {
        checkUserStatus()
    }, [])

    const checkUserStatus = async () => {
        const userToken = await AsyncStorage.getItem("token");
        if (userToken) {
            setUserToken(userToken);
        } else {
            setUserToken(null);
        }
    };

    useEffect(() => {
        if (userData) {
            if (!cardHolder && userData.fullName) {
                setCardHolder(userData.fullName);
            }
            if (!emailID && userData.email) {
                setEmailID(userData.email);
            }
        }
    }, [userData, cardHolder, emailID]);


    const dispatch = useDispatch()
    const { colors } = useTheme();
    const cvvRef = useRef(null);
    const webViewRef = useRef(null);
    const [cardHolder, setCardHolder] = useState('');
    const [emailID, setEmailID] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);

    const [discountedAmount, setDiscountedAmount] = useState(null);
    const [coupon, setCoupon] = useState({ code: '' });
    const [couponError, setCouponError] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponApplied, setCouponApplied] = useState(false);


    const handleCouponApply = async () => {
        try {
            setCouponLoading(true);
            setCouponError({ message: '', type: '' });

            const url = `${COUPON_URL}/coupons/${coupon.code}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'x-payment-api-key': payment_api_key,
                    'x-frontend-api-key': frontend_api_key,
                },
            });

            let data;
            try {
                data = await response.json();
            } catch (err) {
                const text = await response.text();
                console.error('Raw response text:', text);
                throw new Error('Invalid JSON response from server');
            }

            if (data?.success) {
                const { discountType, discountValue, expiryDate } = data.data;
                const now = new Date();
                if (now >= new Date(expiryDate)) {
                    setCoupon({ code: '' });
                    setCouponError({ message: 'Coupon expired!', type: 'error' });
                    setCouponApplied(false);
                    setDiscountedAmount(null);
                    return;
                }

                let finalAmount = parseFloat(price);
                if (discountType.toLowerCase() === 'percentage') {
                    finalAmount = finalAmount - (finalAmount * discountValue) / 100;
                } else if (discountType.toLowerCase() === 'fixed') {
                    finalAmount = finalAmount - discountValue;
                }
                setDiscountedAmount(finalAmount.toFixed(2));
                setCouponApplied(true);

                setCouponError({ message: 'Coupon applied successfully!', type: 'success' });
            } else {
                throw new Error(data?.message || 'Invalid coupon');
            }
        } catch (error) {
            setCoupon({ code: '' });
            setCouponError({ message: error.message, type: 'error' });
            setCouponApplied(false);
            setDiscountedAmount(null);
        } finally {
            setCouponLoading(false);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validateCardNumber = (cardNumber) => {
        return /^\d{16}$/.test(cardNumber); // 16 digits for card number
    };

    const validateCVV = (cvv) => {
        return /^\d{3,4}$/.test(cvv); // CVV must be 3 or 4 digits
    };

    const validateExpiry = (expiry) => {
        const [expMonth, expYear] = expiry.split('/');
        const month = parseInt(expMonth, 10);
        const year = parseInt(expYear, 10);
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        if (!expiry || !/^\d{2}\/\d{4}$/.test(expiry)) return 'Enter expiry as MM/YYYY.';
        if (month < 1 || month > 12) return 'Invalid month.';
        if (year < currentYear || (year === currentYear && month < currentMonth)) return 'Card is expired.';
        return null;
    };

    const validateInputs = () => {
        if (!cardHolder.trim()) {
            Toast.show('Cardholder name is required');
            return false;
        }
        if (!emailID.trim()) {
            Toast.show('Email is required');
            return false;
        } else if (!validateEmail(emailID)) {
            Toast.show('Enter a valid email ID');
            return false;
        }

        if (!cardNumber.trim()) {
            Toast.show('Card number is required');
            return false;
        } else if (!validateCardNumber(cardNumber)) {
            Toast.show('Card number must be 16 digits');
            return false;
        }

        const expiryError = validateExpiry(expiry);
        if (expiryError) {
            Toast.show(expiryError);
            return false;
        }

        // Validate CVV
        if (!cvv.trim()) {
            Toast.show('CVV is required');
            return false;
        } else if (!validateCVV(cvv)) {
            Toast.show('CVV must be 3 or 4 digits');
            return false;
        }

        return true;
    };

    const [webViewLoaded, setWebViewLoaded] = useState(false);

    // const handlePayment = () => {
    //     const isValid = validateInputs();
    //     if (!isValid) return;

    //     const [expMonth, expYear] = expiry.split('/');
    //     const cardData = {
    //         cardNumber,
    //         expMonth,
    //         expYear,
    //         cvv,
    //     };
    //     // console.log('===================== masterrrrr  cardData===============', cardData);
    //     if (webViewLoaded) {
    //         webViewRef.current?.postMessage(JSON.stringify(cardData));
    //     } else {
    //         Toast.show('WebView not ready', 'Please wait for the payment screen to load.');
    //     }

    // }

    const handlePayment = () => {
        const isValid = validateInputs();
        if (!isValid) return;

        setLoading(true); // ✅ Show loader immediately after validation

        const [expMonth, expYear] = expiry.split('/');
        const cardData = {
            cardNumber,
            expMonth,
            expYear,
            cvv,
        };

        if (webViewLoaded) {
            webViewRef.current?.postMessage(JSON.stringify(cardData));
        } else {
            setLoading(false); // ❌ Stop loader if WebView isn't ready
            Toast.show('WebView not ready', 'Please wait for the payment screen to load.');
        }
    };


    const handlePaymentSubmit = async (nonce) => {
        if (!validateInputs()) {
            setLoading(false); // stop loader if invalid
            return;
        }

        const body = {
            amount: discountedAmount ? parseFloat(discountedAmount) : parseFloat(price),
            productOriginalPrice: parseFloat(price),
            productType: planName,
            firstName: cardHolder.split(' ')[0] || userData?.fullName?.split(' ')[0] || '',
            lastName: cardHolder.split(' ')[1] || userData?.fullName?.split(' ')[1] || '',
            email: emailID || userData?.email,
            paymentNonce: nonce,
            couponCode: coupon?.code || '',
            logedinUserID: userData?.id || '',
        };

        const url = `${PAY_URL}/payment/v2`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-payment-api-key': payment_api_key,
                    'x-frontend-api-key': frontend_api_key,
                },
                body: JSON.stringify(body),
            });

            const result = await res.json();
            console.log('Payment result:', result);

            if (result?.success) {
                dispatch(setPaymentData({
                    token: result?.data?.token,
                    transactionId: result?.data?.transactionId,
                }));
                Toast.show(result?.message);
                setPaymentModal(false);
                NavigationService.navigate('SearchProfile');
            } else {
                Toast.show(result?.message || 'Payment failed');
            }
        } catch (err) {
            console.error('Payment error:', err);
            Toast.show('Payment failed. Please try again.');
        } finally {
            setLoading(false); // ✅ stop loader here no matter what
        }
    };


    const inputStyle = {
        backgroundColor: colors.inputBox,
        borderColor: colors.inputBorder,
        borderWidth: 1,
        borderRadius: moderateScale(10),
        height: moderateScale(40),
        paddingHorizontal: 10,
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.secondaryThemeColor }]}>Pay Now</Text>

            <View style={[styles.card, { backgroundColor: colors.secondaryThemeColor }]}>
                <Text style={[styles.label, { color: colors.secondaryFontColor }]}>After making the payment:</Text>
                {[
                    '1. Person search details will be unlocked in the app.',
                    '2. A copy of your invoice will be emailed to you.',
                    '3. A copy of the background report will also be emailed to you.',
                ].map((text, i) => (
                    <Text key={i} style={[styles.subtext, { color: colors.tintText }]}>{text}</Text>
                ))}

                <View style={styles.row}>
                    <TextInput
                        ref={cvvRef}
                        placeholder="Enter a coupon code"
                        placeholderTextColor={colors.tintText}
                        value={coupon}
                        autoCapitalize="characters"
                        onChangeText={(text) => setCoupon(prev => ({ ...prev, code: text.toUpperCase() }))}
                        style={[styles.flexInput, inputStyle]}
                    />
                    <TouchableOpacity
                        style={[styles.applyButton, { backgroundColor: colors.buttonColor }]}
                        onPress={handleCouponApply}
                        disabled={couponLoading}
                    >
                        {couponLoading ? (
                            <ActivityIndicator size="small" color={colors.secondaryThemeColor} />
                        ) : (
                            <Text style={[styles.buttonText, { color: colors.secondaryThemeColor }]}>Apply</Text>
                        )}
                    </TouchableOpacity>
                </View>
                {couponError?.message ? (
                    <Text style={[
                        styles.error_message,
                        { color: couponError.type === 'success' ? 'green' : 'red' }
                    ]}>
                        {couponError.message}
                    </Text>
                ) : null}

                <Text style={[styles.sectionTitle, { color: colors.secondaryFontColor }]}>Pay With Card</Text>

                <Text style={[styles.inputLabel, { color: colors.primaryFontColor }]}>Card Holder Name</Text>
                <TextInput
                    ref={cvvRef}
                    value={cardHolder}
                    onChangeText={(val) => setCardHolder(val)}
                    style={[styles.fullInput, inputStyle]}
                />


                <Text style={[styles.inputLabel, { color: colors.primaryFontColor }]}>Email Address</Text>
                <TextInput
                    ref={cvvRef}
                    value={emailID}
                    onChangeText={(val) => setEmailID(val)}
                    style={[styles.fullInput, inputStyle]}
                    keyboardType="email-address"
                />

                <Text style={[styles.inputLabel, { color: colors.primaryFontColor }]}>Card Number</Text>
                <TextInput
                    ref={cvvRef}
                    value={cardNumber}
                    onChangeText={(val) => setCardNumber(val)}
                    style={[styles.fullInput, inputStyle]}
                    keyboardType="numeric"
                    maxLength={16}
                />


                <View style={styles.row}>
                    <View>
                        <Text style={[styles.inputLabel, { color: colors.primaryFontColor }]}>Expiry Date</Text>
                        <View style={[styles.expiryInput, inputStyle]}>

                            <TextInput
                                value={expiry}
                                onChangeText={(text) => {
                                    let cleaned = text.replace(/[^\d]/g, '');
                                    if (cleaned.length > 6) return;
                                    let mm = cleaned.slice(0, 2);
                                    let yyyy = cleaned.slice(2, 6);
                                    if (mm.length === 1 && parseInt(mm, 10) > 1) mm = '0' + mm;
                                    if (parseInt(mm, 10) > 12) mm = '12';
                                    let formatted = mm;
                                    if (cleaned.length >= 3) {
                                        formatted += '/' + yyyy;
                                    } else if (cleaned.length >= 2) {
                                        formatted += '/';
                                    }
                                    setExpiry(formatted);
                                }}
                                placeholder="MM/YYYY"
                                keyboardType="numeric"
                                style={styles.expiryText}
                                maxLength={7}
                            />


                        </View>
                    </View>

                    <View>
                        <Text style={[styles.inputLabel, { color: colors.primaryFontColor }]}>CVV</Text>
                        <TextInput
                            value={cvv}
                            ref={cvvRef}
                            onChangeText={(val) => setCvv(val)}
                            style={[styles.cvvInput, inputStyle]}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handlePayment}
                    style={[styles.mainButton, { backgroundColor: colors.buttonColor }]}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.secondaryThemeColor} />
                    ) : (
                        <>
                            {discountedAmount && discountedAmount < price ? (
                                <Text style={[styles.buttonText, { color: colors.secondaryThemeColor }]}>
                                    ${discountedAmount} Pay Now
                                </Text>
                            ) : (
                                <Text style={[styles.buttonText, { color: colors.secondaryThemeColor }]}>
                                    ${price} Pay Now
                                </Text>
                            )}
                        </>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => setPaymentModal(false)}
                style={[styles.backButton, { backgroundColor: colors.buttonColor }]}
            >
                <Text style={[styles.buttonText, { color: colors.secondaryThemeColor }]}>Back</Text>
            </TouchableOpacity>


            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ uri: 'https://simpreative.com/365paymentTest/index.html' }}
                javaScriptEnabled={true}
                onLoad={() => {
                    console.log('WebView content loaded');
                    setWebViewLoaded(true); // Optional but useful
                }}
                onMessage={(event) => {
                    console.log('Message received in React Native:', event.nativeEvent.data);
                    try {
                        const data = JSON.parse(event.nativeEvent.data);
                        if (data.nonce) {
                            console.log('Received nonce:', data.nonce); // ✅ Your nonce is here!
                            handlePaymentSubmit(data.nonce);
                        } else if (data.error) {
                            Toast.show('Payment Error', data.error);
                        }
                    } catch (e) {
                        console.warn('Invalid JSON from WebView:', event.nativeEvent.data);
                    }
                }}
                style={{ flex: 1 }}
            />





        </View>
    );
};

export default PaymentCard;

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        fontSize: moderateScale(22),
        fontFamily: FONTS.Inter.semibold,
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(50),
    },
    card: {
        padding: moderateScale(15),
        borderRadius: moderateScale(15),
        marginHorizontal: moderateScale(40),
        width: width - moderateScale(70),
        marginTop: moderateScale(25),
        alignSelf: 'center',
    },
    label: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.exBold,
    },
    subtext: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
        marginTop: moderateScale(3),
    },
    sectionTitle: {
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.exBold,
        marginTop: moderateScale(10),
    },
    inputLabel: {
        marginTop: moderateScale(7),
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
    },
    fullInput: { marginTop: moderateScale(5) },
    flexInput: { width: moderateScale(180) },
    expiryInput: {
        width: moderateScale(120),
        marginTop: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(5),
    },
    expiryText: {
        width: moderateScale(90),
        height: moderateScale(36),
    },
    cvvInput: {
        width: moderateScale(120),
        marginTop: moderateScale(5),
    },
    applyButton: {
        height: moderateScale(40),
        width: moderateScale(60),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButton: {
        height: moderateScale(40),
        marginTop: moderateScale(15),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        height: moderateScale(40),
        marginTop: moderateScale(25),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        width: moderateScale(100),
        marginLeft: moderateScale(15),
    },
    buttonText: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(5),
    },
    error_message: {
        fontSize: moderateScale(10),
        fontFamily: FONTS.Inter.medium,
        color: 'red'
    }
});
