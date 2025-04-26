import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput, Dimensions } from 'react-native';
import Icon from './Icon';
import { FONTS } from '../Constants/Fonts';
import { moderateScale } from '../Constants/PixelRatio';

const { height, width } = Dimensions.get('screen');
const CustomPicker = ({ label, options, selectedValue, onValueChange, labelKey = "name", valueKey = "value", placeholder = "Select" }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOptionPress = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.pickerText}>
                    {selectedValue ? options?.find(option => option[valueKey] === selectedValue)?.[labelKey] : placeholder}
                </Text>
                <Icon name="down" type='AntDesign' size={16} style={styles.icon} />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            data={options}
                            keyExtractor={(item) => item[valueKey].toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleOptionPress(item[valueKey])}
                                >
                                    <Text style={styles.optionText}>{item[labelKey]}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: -20
    },
    label: {
        fontSize: 16,
        color: '#000'
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'rgba(240, 240, 240, 1)',
        padding: 10,
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 7,
        width: 160,
        height: 48
    },
    pickerText: {
        fontSize: 14,
        fontFamily: FONTS.Inter.regular,
        color: '#000'
    },
    icon: {
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: moderateScale(8),
        padding: moderateScale(16),
        height: moderateScale(300)
    },
    option: {
        padding: moderateScale(15),
        borderBottomWidth: 1,
        paddingBottom: moderateScale(5),
        borderColor: '#f3f3f3'
    },
    optionText: {
        fontSize: moderateScale(14),
        fontFamily: FONTS.Inter.medium,
        color: '#000'
    },
});

export default CustomPicker;
