import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Animated,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import CustomTab from '../../Ui/CustomTab';
import BasicPlanCard from '../../Components/SearchCard/BasicPlanCard';
import PaymentCard from '../../Components/SearchCard/PaymentCard';
import SearchHeader from '../../Components/Header/SearchHeader';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import HomeService from '../../Services/HomeServises';
import PhoneNumber from '../../Components/SearchCard/FullSearch/PhoneNumber';
import EmailAddress from '../../Components/SearchCard/FullSearch/EmailAddress';
import Address from '../../Components/SearchCard/FullSearch/Address';
import CreminalRecords from '../../Components/SearchCard/FullSearch/CreminalRecords';
import BusinessRecords from '../../Components/SearchCard/FullSearch/BusinessRecords';
import WorkplaceRecords from '../../Components/SearchCard/FullSearch/WorkplaceRecords';
import ForeclosureRecords from '../../Components/SearchCard/FullSearch/ForeclosureRecords';
import DebtRecords from '../../Components/SearchCard/FullSearch/DebtRecords';
import PropertyRecords from '../../Components/SearchCard/FullSearch/PropertyRecords';
import EvictionRecords from '../../Components/SearchCard/FullSearch/EvictionRecords';
import DomainRecords from '../../Components/SearchCard/FullSearch/DomainRecords';
import Relatives from '../../Components/SearchCard/FullSearch/Relatives';
import { useDispatch, useSelector } from 'react-redux';
import SearchLoader from '../../Ui/SearchLoader ';
import { clearPaymentData } from '../../Redux/reducer/paymentSlice';
import AliasesCard from '../../Components/SearchCard/FullSearch/AliasesCard';

const { width, height } = Dimensions.get('screen');

const SearchProfile = () => {
    const dispatch = useDispatch()
    const { colors } = useTheme();
    const route = useRoute();
    const getUserId = route?.params?.userId
    const token = useSelector(state => state.Payment.token);
    const transactionId = useSelector(state => state.Payment.transactionId);
    const selectedUserId = useSelector(state => state.UserId.selectedUserId);
    // console.log('=================reali  fulll user data    dddddddddddiiiii======', getUserId);
    // console.log('payment data---------------<<<<<setPaymentData------------------', token, transactionId);
    // console.log('userdata with iddddddddddddddddddddddddddd---------------<------------------', selectedUserId);
    const [isplanModal, setPlanModal] = useState(false);
    const [ispaymentModal, setPaymentModal] = useState(false);
    const [price, setPrice] = useState('');
    const [planName, setPlanName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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

    const [userdata, setUserData] = useState({})
    const [phoneNumber, setphoneNumber] = useState({})
    const [aliasesData, setAliasesData] = useState({})
    const [emailData, setEmailData] = useState({})
    const [addressData, setaddressData] = useState({})
    const [criminalRecords, setCriminalRecords] = useState({})
    const [businessRecords, setBusinessRecords] = useState({})
    const [workplaceRecords, setWorkplaceRecords] = useState({})
    const [foreclosureRecords, setForeclosureRecords] = useState({})
    const [debtRecords, setDebtRecords] = useState({})
    const [propertyRecords, setPropertyRecords] = useState({})
    const [evictionRecords, setEvictionRecords] = useState({})
    const [domainRecords, setDomainRecords] = useState({})
    const [associatesRecords, setAssociatesRecords] = useState({})
    const [showButton, setShowButton] = useState(true)
    const [openLock, setOpenLock] = useState(false)

    useEffect(() => {
        if (token && transactionId) {
            handleFullUpdateSearch();
        } else if (!token && !transactionId) {
            handleFullSearch();
        } else {
            console.log(' Incomplete data: token or transactionId is missing.');
        }
    }, [token, transactionId, selectedUserId]);



    const handleFullUpdateSearch = async () => {
        const payload = {
            transactionId,
            tahoeId: selectedUserId
        };
        console.log('📤 Sending update payload to API:', payload);
        try {
            setIsLoading(true);
            const res = await HomeService.setFullUpdateData(payload, token);
            console.log('✅ +++++++++++++++++++++++++++++++Full update response data:', res);
            if (res?.success === true) {
                setShowButton(false)
                setOpenLock(true)
                const persons = res?.data?.persons ?? [];
                setUserData(persons);
                setphoneNumber(persons[0]?.phoneNumbers)
                setAliasesData(persons[0]?.otherObservedNames)
                setEmailData(persons[0]?.emailAddresses)
                setaddressData(persons[0]?.addresses)
                setCriminalRecords(persons[0]?.criminalRecords)
                setBusinessRecords(persons[0]?.businessRecords)
                setWorkplaceRecords(persons[0]?.workplaceRecords)
                setForeclosureRecords(persons[0]?.foreclosureRecords)
                setDebtRecords(persons[0]?.debtRecords)
                setPropertyRecords(persons[0]?.propertyRecords)
                setEvictionRecords(persons[0]?.evictionRecords)
                setDomainRecords(persons[0]?.domainRecords)
                setAssociatesRecords(persons[0]?.relatives)
                console.log('✅ Full update response data:', persons);

            }


        } catch (error) {
            console.error("❌ Full update error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFullSearch = async () => {
        const userRealId = getUserId;
        const payload = {
            "tahoeId": getUserId,
        };
        console.log('--------------- ***********Sending  in complete payload to:------------------------------', userRealId);
        try {
            setIsLoading(true);
            const res = await HomeService.setFullData(userRealId, payload);
            const persons = res?.data?.persons ?? [];
            console.log('✅ Incomplete Fulll data ------------------------------------: .', persons);
            setUserData(persons);
            setphoneNumber(persons[0]?.phoneNumbers)
            setAliasesData(persons[0]?.otherObservedNames)
            setEmailData(persons[0]?.emailAddresses)
            setaddressData(persons[0]?.addresses)
            setCriminalRecords(persons[0]?.criminalRecords)
            setBusinessRecords(persons[0]?.businessRecords)
            setWorkplaceRecords(persons[0]?.workplaceRecords)
            setForeclosureRecords(persons[0]?.foreclosureRecords)
            setDebtRecords(persons[0]?.debtRecords)
            setPropertyRecords(persons[0]?.propertyRecords)
            setEvictionRecords(persons[0]?.evictionRecords)
            setDomainRecords(persons[0]?.domainRecords)
            setAssociatesRecords(persons[0]?.relatives)
        } catch (error) {
            console.error("Full user error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={{ ...styles.Container, }}>
            {isLoading ? (
                <View>
                    <SearchLoader />
                </View>
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ backgroundColor: '#f0f0f0', paddingBottom: 20 }}
                    >
                        <View style={{ ...styles.top_view, backgroundColor: 'rgba(10, 104, 201, 1)', }}>
                            <SearchHeader userdata={userdata} />
                        </View>

                        <Animated.View
                            style={[
                                styles.tabView,
                                {
                                    backgroundColor: '#f0f0f0',
                                    transform: [{ translateY }],
                                    opacity,
                                    marginTop: moderateScale(-30),
                                },
                            ]}>


                            <View style={styles.card_view}>
                                {aliasesData !== undefined && (
                                    <AliasesCard aliasesData={aliasesData} />
                                )}

                                {phoneNumber !== undefined && (
                                    <PhoneNumber openLock={openLock} phoneNumber={phoneNumber} />
                                )}

                                {emailData !== undefined && (
                                    <EmailAddress openLock={openLock} emailData={emailData} />
                                )}

                                {addressData !== undefined && (
                                    <Address openLock={openLock} addressData={addressData} />
                                )}

                                {associatesRecords !== undefined && (
                                    <Relatives openLock={openLock} associatesRecords={associatesRecords} />
                                )}

                                {criminalRecords !== undefined && (
                                    <CreminalRecords openLock={openLock} criminalRecords={criminalRecords} />
                                )}

                                {businessRecords !== undefined && (
                                    <BusinessRecords openLock={openLock} businessRecords={businessRecords} />
                                )}

                                {workplaceRecords !== undefined && (
                                    <WorkplaceRecords openLock={openLock} workplaceRecords={workplaceRecords} />
                                )}

                                {foreclosureRecords !== undefined && (
                                    <ForeclosureRecords openLock={openLock} foreclosureRecords={foreclosureRecords} />
                                )}

                                {debtRecords !== undefined && (
                                    <DebtRecords openLock={openLock} debtRecords={debtRecords} />
                                )}

                                {propertyRecords !== undefined && (
                                    <PropertyRecords openLock={openLock} propertyRecords={propertyRecords} />
                                )}

                                {evictionRecords !== undefined && (
                                    <EvictionRecords openLock={openLock} evictionRecords={evictionRecords} />
                                )}

                                {domainRecords !== undefined && (
                                    <DomainRecords openLock={openLock} domainRecords={domainRecords} />
                                )}


                            </View>
                        </Animated.View>
                    </ScrollView>

                    {/* --------------open plan modal------------------- */}
                    <Modal animationType="slide" transparent={true}
                        visible={isplanModal}
                        onRequestClose={() => setPlanModal(false)}>
                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <BasicPlanCard
                                    setPlanModal={setPlanModal}
                                    setPaymentModal={setPaymentModal}
                                    setPrice={setPrice}
                                    setPlanName={setPlanName}
                                />
                            </ScrollView>
                        </View>
                    </Modal>

                    {/* ----------- Payment Modal ----------- */}
                    <Modal animationType="slide" transparent={true}
                        visible={ispaymentModal}
                        onRequestClose={() => setPaymentModal(false)}>
                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <PaymentCard setPaymentModal={setPaymentModal} planName={planName} price={price} />
                            </ScrollView>
                        </View>
                    </Modal>
                    {showButton && (
                        <TouchableOpacity onPress={() => setPlanModal(true)}
                            style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}    >
                            <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Unlock Full Details</Text>
                        </TouchableOpacity>
                    )}


                    <CustomTab />
                </>
            )}

        </View>
    );
};

export default SearchProfile;
// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    top_view: {
        width: width,
        height: moderateScale(270),
        paddingHorizontal: moderateScale(10),
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(10),
        borderTopRightRadius: moderateScale(30),
        borderTopLeftRadius: moderateScale(30),
    },
    card_view: {
        width: '100%',
        padding: moderateScale(15),
        paddingTop: moderateScale(20)
    },
    hide_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lockview: {
        flexDirection: 'row',
    },
    phone_number: {
        fontSize: moderateScale(18),
        fontFamily: FONTS.Inter.exBold,
        marginRight: moderateScale(7)
    },
    hiddenCard: {
        paddingHorizontal: moderateScale(10),
        elevation: 1,
        borderRadius: moderateScale(10),
        marginTop: moderateScale(15),
    },
    numberHidden_view: {
        borderBottomColor: '#ccc',
        padding: moderateScale(10),
    },
    userShow_number: {
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
    },
    button_sty: {
        height: moderateScale(44),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(12),
        marginBottom: moderateScale(15)
    },
    button_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },


});
