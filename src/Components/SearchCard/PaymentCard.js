import React, { useRef, useState } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity,
    TextInput, ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useTheme } from '../../../ThemeContext';
import { WebView } from 'react-native-webview';
import { frontend_api_key, PAY_URL, payment_api_key } from '../../Utils/HttpClient';
import NavigationService from '../../Services/Navigation';
import { setPaymentData } from '../../Redux/reducer/paymentSlice';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

const PaymentCard = ({ price, setPaymentModal, planName }) => {
    console.log('=================paymentttttttttttttttt===================', planName, price);
    const dispatch = useDispatch()
    const { colors } = useTheme();
    const cvvRef = useRef(null);
    const webViewRef = useRef(null);
    const [cardHolder, setCardHolder] = useState('');
    const [emailID, setEmailID] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState({ code: '', error: '', loading: false, applied: false });
    const [discountedAmount, setDiscountedAmount] = useState(null);
    // const [paymentLoading, setPaymentLoading] = useState(false);

    

    const handleCouponApply = async () => {
        try {
            setCoupon(prev => ({ ...prev, loading: true, error: '' }));
            const response = await fetch(`${PAY_URL}/coupon/${coupon.code}/${planName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-payment-api-key': payment_api_key,
                    'x-frontend-api-key': frontend_api_key,
                },
            });

            const data = await response.json();
            if (data?.success) {
                const { discount, expiryDate, type } = data.data;
                const now = new Date();
                if (now >= new Date(expiryDate)) {
                    setCoupon({ code: '', error: 'Coupon expired!', applied: false, loading: false });
                    setDiscountedAmount(null);
                    return;
                }

                let finalAmount = parseFloat(price);
                if (type === 'percentage') {
                    finalAmount = finalAmount - (finalAmount * discount) / 100;
                } else if (type === 'fixed') {
                    finalAmount = finalAmount - discount;
                }
                setDiscountedAmount(finalAmount.toFixed(2));
                setCoupon(prev => ({ ...prev, applied: true, loading: false }));
            } else {
                throw new Error(data?.message || 'Invalid coupon');
            }
        } catch (error) {
            setCoupon({ code: '', error: error.message, applied: false, loading: false });
            setDiscountedAmount(null);
        }
    };


    const validateInputs = () => {
        const newErrors = {};
        const [expMonth, expYear] = expiry.split('/');

        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
            newErrors.cardNumber = 'Card number must be 16 digits.';
        }

        if (!expiry || !/^\d{2}\/\d{4}$/.test(expiry)) {
            newErrors.expiry = 'Enter expiry as MM/YYYY.';
        } else {
            const month = parseInt(expMonth, 10);
            const year = parseInt(expYear, 10);
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            if (month < 1 || month > 12) {
                newErrors.expiry = 'Invalid month.';
            } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiry = 'Card is expired.';
            }
        }

        if (!cvv || !/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'CVV must be 3 or 4 digits.';
        }

        if (!emailID || !/\S+@\S+\.\S+/.test(emailID)) {
            newErrors.email = 'Enter a valid email.';
        }

        if (!cardHolder) {
            newErrors.cardHolder = 'Cardholder name is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [webViewLoaded, setWebViewLoaded] = useState(false);
    const handlePayment = () => {
        const isValid = validateInputs();
        if (!isValid) return;

        const [expMonth, expYear] = expiry.split('/');
        const cardData = {
            cardNumber,
            expMonth,
            expYear,
            cvv,
        };
        console.log('===================== masterrrrr  cardData===============', cardData);
        if (webViewLoaded) {
            webViewRef.current?.postMessage(JSON.stringify(cardData));
        } else {
            Toast.show('WebView not ready', 'Please wait for the payment screen to load.');
        }

    }

    const handlePaymentSubmit = async (nonce) => {
        console.log('===============payment nonce=====================', nonce);
        if (!validateInputs()) return;
        const [mm, yyyy] = expiry.split('/');

        const body = {
            amount: discountedAmount ? parseFloat(discountedAmount) : parseFloat(price),
            productOriginalPrice: parseFloat(price),
            productType: planName,
            firstName: cardHolder.split(' ')[0] || '',
            lastName: cardHolder.split(' ')[1] || '',
            email: emailID,
            paymentNonce: nonce,
            couponCode: coupon.code,
            expiryMonth: mm,
            expiryYear: yyyy,
        };
        console.log('===================payment payloade=================', body);
        try {
            setLoading(true);
            const res = await fetch(`${PAY_URL}/payment/v2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-payment-api-key': payment_api_key,
                    'x-frontend-api-key': frontend_api_key,
                },
                body: JSON.stringify(body),
            });
            const result = await res.json();
            console.log('===================payment result=================', result);
            if (result?.success == true) {
                dispatch(setPaymentData({
                    token: result?.data?.token,
                    transactionId: result?.data?.transactionId,
                }));
                Toast.show(result?.message);
                setPaymentModal(false);
                NavigationService.navigate('SearchProfile');

            } else {
                Toast.show(result?.message);
            }
        } catch (err) {
            console.error('Payment error:', err);
            Toast.show('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: colors.inputBox,
        borderColor: colors.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 10,
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.secondaryThemeColor }]}>Pay Now</Text>

            <View style={[styles.card, { backgroundColor: colors.secondaryThemeColor }]}>
                <Text style={[styles.label, { color: colors.secondaryFontColor }]}>After making the payment:</Text>
                {[
                    '1. Payment confirms in minutes.',
                    '2. Confirmation email sent.',
                    '3. Features unlocked.',
                ].map((text, i) => (
                    <Text key={i} style={[styles.subtext, { color: colors.tintText }]}>{text}</Text>
                ))}

                <View style={styles.row}>
                    <TextInput
                        ref={cvvRef}
                        placeholder="Enter a coupon code"
                        value={coupon}
                        onChangeText={(text) => setCoupon(prev => ({ ...prev, code: text }))}

                        style={[styles.flexInput, inputStyle]}
                    />
                    <TouchableOpacity
                        style={[styles.applyButton, { backgroundColor: colors.buttonColor }]}
                        onPress={() => handleCouponApply()}
                    >
                        <Text style={[styles.buttonText, { color: colors.secondaryThemeColor }]}>Apply</Text>
                    </TouchableOpacity>
                </View>

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
                                    // if (formatted.length === 7) {
                                    //     cvvRef.current?.focus();
                                    // }
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
        fontSize: moderateScale(11),
        fontFamily: FONTS.Inter.regular,
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
});
