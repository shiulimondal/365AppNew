import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import CustomPicker from '../../Ui/CustomPicker';
import AdvancedSearchData from './AdvancedSearchData';
import HomeService from '../../Services/HomeServises';
import Toast from 'react-native-simple-toast';
import { ageOptions, stateOptions } from '../../Constants/options';
import ShimmerLoader from '../../Ui/ShimmerLoader';

const { width, height } = Dimensions.get('window');

const AdvancedSearch = () => {
    const { colors } = useTheme();

    const [selectedAge, setSelectedAge] = useState('');
    const [selecteState, setSelectedState] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const fullName = `${firstName} ${lastName}`.trim();
    const [city, setCity] = useState('');
    const [advPhone, setAdvPhone] = useState('');
    const [advEmail, setAdvEmail] = useState('');
    const [relativeName, setRelativeName] = useState('');
    const [errors, setErrors] = useState({});
    const [dataCache, setDataCache] = useState({})
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [listMessage, setListMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // console.log('dataCache---------------------------', dataCache);
    console.log('advanceeeeeeeeeeeeeeehResult-------------addd--------------', searchResult);

    const isEmail = (input) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/.test(input);
    const isName = (input) => /^[a-zA-Z ]*$/.test(input) && input.trim().length > 2;
    const isPhone = (input) => /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/.test(input);

    const handleAdvSearch = async (page = 1) => {

        let validationErrors = {};

        // Ensure `firstName` and `lastName` are not undefined
        const trimmedFirstName = firstName?.trim() || "";
        const trimmedLastName = lastName?.trim() || "";

        if (!trimmedFirstName) {
            validationErrors.firstName = 'First Name is required';
        } else if (!isName(trimmedFirstName)) {
            validationErrors.firstName = 'Enter a valid first name (min 3 letters, no numbers)';
        }

        if (!trimmedLastName) {
            validationErrors.lastName = 'Last Name is required';
        } else if (!isName(trimmedLastName)) {
            validationErrors.lastName = 'Enter a valid last name';
        }

        // Ensure `city`, `advPhone`, `advEmail`, and `relativeName` are not undefined
        const trimmedCity = city?.trim() || "";
        const trimmedAdvPhone = advPhone?.trim() || "";
        const trimmedAdvEmail = advEmail?.trim() || "";
        const trimmedRelativeName = relativeName?.trim() || "";

        if (trimmedCity && !isName(trimmedCity)) {
            validationErrors.city = 'Enter a valid city name';
        }
        if (trimmedAdvPhone && !isPhone(trimmedAdvPhone)) {
            validationErrors.advPhone = 'Enter a valid phone number';
        }
        if (trimmedAdvEmail && !isEmail(trimmedAdvEmail)) {
            validationErrors.advEmail = 'Enter a valid email';
        }
        if (trimmedRelativeName && !isName(trimmedRelativeName)) {
            validationErrors.relativeName = 'Enter a valid relative name';
        }

        // If there are any validation errors, set them and stop
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setCurrentPage(page);
        // Split the full name into first, middle, and last names
        const nameParts = fullName?.split(" ") || [];

        // Destructure to assign the first, middle, and last names
        const [first, middle = null, last = ""] = nameParts;
        const finalData = {
            firstName: first.trim(),
            middleName: middle?.trim() || null,
            lastName: last.trim(),
            phone: trimmedAdvPhone || null,
            email: trimmedAdvEmail || null,
            Addresses: [{
                AddressLine1: null, // or selectedAddress?.main_text || null
                AddressLine2: city || selecteState ? `${selecteState}` : null
            }],
            AgeRange: selectedAge || null,
            Relatives: relativeName ? [{
                firstName: relativeName.split(" ")[0],
                lastName: relativeName.split(" ")[1] || ""
            }] : []
        };

        console.log('------------------finalData addddddd---------------', finalData);

        try {
            setLoading(true);
            const res = await HomeService.setsearchData(finalData, page);
            console.log('---------res------------------>>>>>>>>>>>>>>>>>>>>>>>>', res);
            const persons = res?.data?.persons ?? [];
            setSearchResult(persons);
            setListMessage(res?.data?.summary)
            // setDataCache(prev => ({
            //     ...prev,
            //     [type]: {
            //         ...(prev[type] || {}),
            //         [page]: persons,
            //     }
            // }));

            setTotalPages(res?.data?.pagination?.totalPages || 1);
        } catch (error) {
            console.error("Search error:", error);
            Toast.show("Oops! Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                handleAdvSearch(page);
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

    return (
        <View>
            {loading ? (
                <View style={styles.loder_view}>
                    <ShimmerLoader />
                </View>
            ) : searchResult?.length >= 1 ? (
                <View style={styles.sec_view}>
                    {listMessage && (
                        <Text style={{ ...styles.summery_message, color: colors.primaryFontColor }}>
                            {listMessage}
                        </Text>
                    )}

                    <FlatList
                        data={searchResult}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: moderateScale(20),
                            paddingTop: moderateScale(10),
                        }}
                        renderItem={({ item, index }) => <AdvancedSearchData index={index} item={item} />}
                    />
                    {renderPagination()}
                </View>
            ) : (
                <View style={styles.main_card_view}>
                    <View style={styles.Container}>

                        <Text style={{ ...styles.userFname, color: colors.primaryFontColor }}>First Name</Text>
                        <TextInput
                            style={{
                                ...styles.fullInput,
                                backgroundColor: colors.inputBox,
                                borderColor: colors.inputBorder
                            }}
                            value={firstName}
                            onChangeText={(val) => setFirstName(val)}
                        />
                        {errors.firstName && (
                            <Text style={styles.error_message}>{errors.firstName}</Text>
                        )}
                        <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>Last Name</Text>
                        <TextInput
                            style={{
                                ...styles.fullInput,
                                backgroundColor: colors.inputBox,
                                borderColor: colors.inputBorder
                            }}
                            value={lastName}
                            onChangeText={(val) => setlastName(val)}
                        />
                        {errors.lastName && (
                            <Text style={styles.error_message}>{errors.lastName}</Text>
                        )}
                        <View style={styles.cityState_view}>
                            <View>
                                <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>City</Text>
                                <TextInput
                                    style={{
                                        ...styles.halfInput,
                                        backgroundColor: colors.inputBox,
                                        borderColor: colors.inputBorder
                                    }}
                                    value={city}
                                    onChangeText={(val) => setCity(val)}
                                />
                                {errors.city && (
                                    <Text style={styles.error_message}>{errors.city}</Text>
                                )}
                            </View>
                            <View>
                                <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>State</Text>
                                <CustomPicker
                                    labelKey="name"
                                    valueKey="id"
                                    placeholder="Select State"
                                    options={stateOptions}
                                    selectedValue={selecteState}
                                    onValueChange={(val) => setSelectedState(val)}
                                    textStyle={{
                                        fontSize: moderateScale(13),
                                        fontFamily: FONTS.Inter.regular,
                                    }}
                                />
                                {errors.selecteState && (
                                    <Text style={styles.error_message}>{errors.selecteState}</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.cityState_view}>
                            <View>
                                <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>Age</Text>
                                <CustomPicker
                                    labelKey="name"
                                    valueKey="id"
                                    placeholder="Select age"
                                    options={ageOptions}
                                    selectedValue={selectedAge}
                                    onValueChange={(val) => setSelectedAge(val)}
                                    textStyle={{
                                        fontSize: moderateScale(13),
                                        fontFamily: FONTS.Inter.regular,
                                    }}
                                />
                                {errors.selectedAge && (
                                    <Text style={styles.error_message}>{errors.selectedAge}</Text>
                                )}
                            </View>
                            <View>
                                <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>Phone Number</Text>
                                <TextInput
                                    style={{
                                        ...styles.halfInput,
                                        backgroundColor: colors.inputBox,
                                        borderColor: colors.inputBorder
                                    }}
                                    maxLength={10}
                                    keyboardType='number-pad'
                                    value={advPhone}
                                    onChangeText={(val) => setAdvPhone(val)}
                                />
                                {errors.advPhone && (
                                    <Text style={styles.error_message}>{errors.advPhone}</Text>
                                )}
                            </View>
                        </View>

                        <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>Email</Text>
                        <TextInput
                            style={{
                                ...styles.fullInput,
                                backgroundColor: colors.inputBox,
                                borderColor: colors.inputBorder
                            }}
                            value={advEmail}
                            onChangeText={(val) => setAdvEmail(val)}
                        />
                        {errors.advEmail && (
                            <Text style={styles.error_message}>{errors.advEmail}</Text>
                        )}

                        <Text style={{ ...styles.userlastname, color: colors.primaryFontColor }}>Relative Name</Text>
                        <TextInput
                            style={{
                                ...styles.fullInput,
                                backgroundColor: colors.inputBox,
                                borderColor: colors.inputBorder
                            }}
                            value={relativeName}
                            onChangeText={(val) => setRelativeName(val)}
                        />
                        {errors.relativeName && (
                            <Text style={styles.error_message}>{errors.relativeName}</Text>
                        )}

                        <TouchableOpacity
                            onPress={() => handleAdvSearch()}
                            style={{ ...styles.button_sty, backgroundColor: colors.buttonColor }}    >
                            <Text style={{ ...styles.button_txt, color: colors.secondaryThemeColor }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </View>
    );
};

export default AdvancedSearch;
// define your styles
const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#FFFFFF',
        width: width - moderateScale(15),
        marginTop: moderateScale(50),
        paddingHorizontal: moderateScale(7)
    },
    main_card_view: {
        backgroundColor: '#FFFFFF',
        paddingBottom: moderateScale(30),
        borderBottomRightRadius: moderateScale(25),
        borderBottomLeftRadius: moderateScale(25),
        elevation: 1
    },
    sec_view: {
        marginTop: moderateScale(50),
        paddingHorizontal: moderateScale(7)
    },
    loder_view: {
        marginTop: moderateScale(35),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 0,
        width: width - moderateScale(15),
    },
    userFname: {
        marginTop: moderateScale(20),
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    userlastname: {
        marginTop: moderateScale(15),
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    error_message: {
        color: 'red',
        fontSize: moderateScale(12),
        fontFamily: FONTS.Inter.regular,
        marginTop: moderateScale(3)
    },

    fullInput: {
        height: moderateScale(48),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        marginTop: moderateScale(7)
    },
    halfInput: {
        height: moderateScale(48),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        marginTop: moderateScale(7),
        width: moderateScale(155)
    },
    cityState_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button_sty: {
        height: moderateScale(48),
        marginTop: moderateScale(20),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_txt: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.regular,
    },
    message_view: {
        width: width,
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
