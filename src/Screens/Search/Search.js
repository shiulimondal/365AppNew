import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TextInput,
    TouchableOpacity,
    FlatList,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import Icon from '../../Ui/Icon';
import NameSearch from '../../Components/SearchCard/NameSearch';
import AdvancedSearch from '../../Components/SearchCard/AdvancedSearch';
import ShimmerLoader from '../../Ui/ShimmerLoader';
import CommonHeader from '../../Components/Header/CommonHeader';
import HomeService from '../../Services/HomeServises';
import Toast from 'react-native-simple-toast';
import GooglePlacesAutocomplete from '../../Ui/GooglePlacesAutocomplete';

const { width, height } = Dimensions.get('window');

const Search = () => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    const [selectedTab, setSelectedTab] = useState('Name');
    const [isSticky, setIsSticky] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;

    const tabs = [
        { key: 'Name', label: 'Name' },
        { key: 'Phone', label: 'Phone' },
        { key: 'Email', label: 'Email' },
        { key: 'Address', label: 'Address' },
        { key: 'Advanced', label: 'Advanced' },
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

    const splitFullName = (fullName) => {
        const parts = fullName.trim().split(/\s+/);
        return {
            firstName: parts[0] || null,
            middleName: parts.length === 3 ? parts[1] : null,
            lastName: parts.length === 3 ? parts[2] : parts[1] || null
        };
    };

    const renderTabs = () => (
        <View
            style={{
                ...styles.searchCard,
                backgroundColor: colors.secondaryThemeColor,
                elevation: selectedTab === "Advanced" ? 0 : 2,
                zIndex: 999,
                width: width - moderateScale(15),
                position: isSticky ? 'absolute' : 'relative',
                top: isSticky ? moderateScale(100) : moderateScale(50),
                marginTop: moderateScale(-70)
            }}
        >
            <View style={styles.out_tab_view}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => {
                            setSelectedTab(tab.key);
                            setSearchAllData({ text: "", type: tab.key }); // Reset input + assign new type
                            setSearchResult([]);                           // Clear result
                            setCurrentPage(1);                             // Reset page
                        }}
                        style={{
                            ...styles.tab_txt_view,
                            backgroundColor: selectedTab === tab.key ? '#FFFFFF' : '#F0F0F0',
                            borderRightWidth: tab.key === "Advanced" ? 0 : 1,
                            borderRadius: selectedTab === tab.key ? moderateScale(6) : 0,
                            borderRightColor: selectedTab === tab.key ? "#FFFFFF" : '#D9D9D9',
                        }}>
                        <Text
                            style={[
                                {
                                    fontFamily: selectedTab === tab.key ? FONTS.Inter.exBold : FONTS.Inter.light,
                                    color: selectedTab === tab.key ? colors.primaryThemeColor : colors.secondaryFontColor,
                                    fontSize: selectedTab === tab.key ? moderateScale(9) : moderateScale(12)
                                },
                            ]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedTab !== "Advanced" && (
                <>
                    {selectedTab === "Address" ? (
                        <View style={{ ...styles.address_input, borderColor: colors.inputBorder, }}>

                            <View style={{ flex: 1 }}>
                                <GooglePlacesAutocomplete
                                    placeholder="Enter your address"
                                    onSelect={handlePlaceSelect}
                                    country="us"
                                />
                            </View>
                            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 7 }}
                                onPress={() => handleSearch(searchAllData, 1)}>
                                <Icon name={'search'} type={'Feather'} size={22} color={colors.primaryThemeColor} />
                            </TouchableOpacity>
                        </View>

                    ) : (
                        <View style={{ ...styles.input_view, borderColor: colors.inputBorder }}>
                            <TextInput
                                style={{ ...styles.inputsty }}
                                placeholder={
                                    selectedTab === 'Name'
                                        ? 'Search by Name'
                                        : selectedTab === 'Email'
                                            ? 'Search by Email'
                                            : selectedTab === 'Phone'
                                                ? 'Search by Phone'
                                                : `Search by ${selectedTab}`
                                }
                                keyboardType={selectedTab === "Phone" ? 'number-pad' : 'default'}
                                value={searchAllData.text}
                                onChangeText={(text) => setSearchAllData({ text, type: selectedTab })}
                            />
                            {formErrors?.searchAllData?.text && (
                                <Text style={styles.error_message}>{formErrors?.searchAllData?.text}</Text>
                            )}

                            <TouchableOpacity onPress={() => handleSearch(searchAllData, 1)}>
                                <Icon name={'search'} type={'Feather'} size={22} color={colors.primaryThemeColor} />
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}

        </View>
    );

    useEffect(() => {
        handleSearch({}, 1);
    }, []);
    const [dataCache, setDataCache] = useState({})
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    // console.log('dataCache---------------------------', dataCache);
    // console.log('searchResult---------------------------', searchResult);
    const [searchAllData, setSearchAllData] = useState({ text: "", type: "" });
    // console.log('searchAllData------', searchAllData);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listMessage, setListMessage] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handlePlaceSelect = (data, details = null) => {
        // console.log('gettadddddddddddddddddddddddddd---------------', data);
        const main = data?.structured_formatting?.main_text || '';
        let secondary = data?.structured_formatting?.secondary_text || '';
        secondary = secondary.replace(/,\s*USA$/, '');
        setSelectedAddress({
            main_text: main,
            secondary_text: secondary,
        });
        setSearchAllData({
            text: `${main} ${secondary}`,
            type: "Address"
        });
    };



    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|us|org|edu|gov)$/i;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;
        return phoneRegex.test(phone);
    };


    const validateName = (firstName, lastName) => {
        const nameRegex = /^[A-Za-z]+$/;  // Only alphabets
        if (!firstName || !lastName) return false;
        return nameRegex.test(firstName) && nameRegex.test(lastName);
    };

    const validateAddress = (address) => {
        return address?.main_text && address?.secondary_text;
    };

    const handleSearch = async (forAdv = null, page = 1, reusePrevious = false) => {
        const { text, type } = searchAllData;

        setCurrentPage(page);
        let payload = {
            firstName: null,
            middleName: null,
            lastName: null,
            phone: null,
            email: null,
            Addresses: null,
        };

        let errorMessage = null;

        if (type === "Name") {
            const { firstName, middleName, lastName } = splitFullName(text);

            if (!validateName(firstName, lastName)) {
                errorMessage = "Please enter a decent name correctly (e.g., 'Jhon Doe')";
            } else if (!firstName || !lastName) {
                errorMessage = "Please provide both first and last name separately.";
            } else {
                payload.firstName = firstName;
                payload.middleName = middleName;
                payload.lastName = lastName;
            }
        } else if (type === "Phone") {
            if (!validatePhone(text)) {
                errorMessage = "Please enter a valid US phone number (e.g., 123-456-7890 or (123) 456-7890)";
            } else {
                payload.phone = text;
            }
        } else if (type === "Email") {
            if (!validateEmail(text)) {
                errorMessage = "Please enter a valid email ID";
            } else {
                payload.email = text;
            }
        } else if (type === "Address") {
            if (!validateAddress(selectedAddress)) {
                errorMessage = "Please select a valid address.";
            } else {
                payload.Addresses = [{
                    AddressLine1: selectedAddress.main_text || null,
                    AddressLine2: selectedAddress.secondary_text || null,
                }];
            }
        }

        if (errorMessage) {
            Toast.show(errorMessage);
            return;
        }

        try {
            setLoading(true);
            const res = await HomeService.setsearchData(payload, page);
            const persons = res?.data?.persons ?? [];
            setSearchResult(persons);
            setListMessage(res?.data?.summary);
            setDataCache(prev => ({
                ...prev,
                [type]: {
                    ...(prev[type] || {}),
                    [page]: persons,
                }
            }));

            setTotalPages(res?.data?.pagination?.totalPages || 1);
        } catch (error) {
            console.error("Search error:", error);
            // Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages) {
                handleSearch(null, page, true);
            }
        };

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
                <TouchableOpacity
                    onPress={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ ...styles.prev_btn, backgroundColor: currentPage === 1 ? '#ccc' : '#007bff', }}
                >
                    <Text style={{ ...styles.prev_btn_txt, color: colors.primaryFontColor }}>Prev</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 7 }}>
                    <Text style={{ ...styles.prev_btn_txt, color: colors.primaryFontColor }}>
                        Page {currentPage} of {totalPages}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ ...styles.prev_btn, backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff', }}
                >
                    <Text style={{ ...styles.prev_btn_txt, color: colors.primaryFontColor }}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderActiveScreen = useCallback(() => {
        if (loading) return <View style={{ marginTop: moderateScale(15) }}><ShimmerLoader /></View>;
        const listProps = {
            data: dataCache[selectedTab]?.[currentPage] || searchResult,
            keyExtractor: (_, index) => index.toString(),
            showsVerticalScrollIndicator: false,
            contentContainerStyle: {
                paddingBottom: moderateScale(20),
                paddingTop: moderateScale(10),
            },
        };

        const flatList = (Component) => (
            <>
                {(!searchResult.length && !dataCache[selectedTab]?.[currentPage]) ? (
                    <View
                        style={[styles.message_view,
                        { width: width }
                        ]}
                    >
                        <Text style={{ ...styles.message_txt, color: colors.primaryFontColor }}>
                            Start searching today.
                        </Text>
                    </View>
                ) : (
                    <>
                        {listMessage && (
                            <Text style={{ ...styles.summery_message, color: colors.primaryFontColor }}>
                                {listMessage}
                            </Text>
                        )}

                        <FlatList
                            {...listProps}
                            renderItem={({ item, index }) => <Component index={index} item={item} />}
                        />
                        {renderPagination()}
                    </>
                )}
            </>
        );

        switch (selectedTab) {
            case 'Name':
                return flatList(NameSearch);
            case 'Phone':
                return flatList(NameSearch);
            case 'Email':
                return flatList(NameSearch);
            case 'Address':
                return flatList(NameSearch);
            case 'Advanced':
                return (
                    <View>
                        <AdvancedSearch />
                    </View>
                );
            default:
                return null;
        }
    }, [selectedTab, loading, dataCache, currentPage])

    const handleScroll = (e) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        setIsSticky(offsetY > moderateScale(100));
    };

    return (
        <View style={styles.Container}>
            <StatusBar backgroundColor={'rgba(10, 104, 201, 1)'} barStyle="light-content" translucent />
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ backgroundColor: '#f0f0f0', paddingBottom: 20 }}
            >
                {/* Header-------------- */}
                <CommonHeader />
                {/* Tabs (non-sticky) */}

                {!isSticky && renderTabs()}


                {/* Tab Content */}
                <Animated.View
                    style={[
                        styles.tabView,
                        {
                            transform: [{ translateY }],
                            opacity,
                            marginTop: selectedTab === "Advanced" ? moderateScale(-8) : moderateScale(20),
                            marginHorizontal: selectedTab === "Advanced" ? moderateScale(7) : 0,
                        },
                    ]}
                >
                    <View style={{ minHeight: height }}>{renderActiveScreen()}</View>

                </Animated.View>
            </Animated.ScrollView>
            {/* Sticky Tabs------------------- */}
            {isSticky && (
                <View style={{ position: 'absolute', top: 0, width: width }}>
                    {renderTabs()}
                </View>
            )}
        </View>
    );
};

export default Search;


// define your styles
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchCard: {
        paddingHorizontal: moderateScale(7),
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(7)
    },
    input_view: {
        height: moderateScale(48),
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(25),
        marginTop: moderateScale(15),
    },
    address_input: {
        position: 'relative',
        zIndex: 10,
        borderWidth: 1,
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(25),
        marginTop: moderateScale(10),
    },
    inputsty: {
        height: moderateScale(40),
        width: moderateScale(250),
        fontSize: moderateScale(13),
        fontFamily: FONTS.Inter.regular,
    },
    out_tab_view: {
        padding: moderateScale(5),
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: moderateScale(10),
    },
    tab_txt_view: {
        paddingHorizontal: moderateScale(2),
        flex: 1,
        alignItems: 'center',
        padding: moderateScale(8),
    },
    message_view: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(70),
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
    },
    message_txt: {
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(15),
        textAlign: 'center'
    },
    summery_message: {
        marginTop: moderateScale(50),
        fontFamily: FONTS.Inter.semibold,
        fontSize: moderateScale(14),
        textAlign: 'center'
    },
    prev_btn: {
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(16),
        marginHorizontal: moderateScale(5),
        borderRadius: moderateScale(20),
    },
    prev_btn_txt: {
        fontFamily: FONTS.Inter.medium,
        fontSize: moderateScale(15),
    }
});
