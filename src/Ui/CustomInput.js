import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const CustomInput = ({
    title,
    titleStyle = {},
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    leftIcon,
    rightAction,
    inputStyle = {},
    containerStyle = {},
}) => {
    return (
        <View style={[{ width: '100%', }]}>
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

            <View style={[styles.inputWrapper, containerStyle]}>
                {leftIcon && (
                    typeof leftIcon === 'object' && leftIcon.source ? (
                        <Image
                            source={leftIcon.source}
                            style={[styles.leftIcon, leftIcon.style]}
                            resizeMode="contain"
                        />
                    ) : (
                        <Icon
                            name={leftIcon.name}
                            size={leftIcon.size || 20}
                            color={leftIcon.color || '#666'}
                            type={leftIcon.type}
                            style={[styles.leftIcon, leftIcon.style]}
                        />
                    )
                )}

                {/* Input Field */}
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                />

                {/* Right Element (icon/button etc.) */}
                <TouchableOpacity>
                    {rightAction && <View style={styles.rightIcon}>{rightAction}</View>}
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 48,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    leftIcon: {
        marginRight: 8,
        width: 20,
        height: 20,
    },
    rightIcon: {
        marginLeft: 8,
    },
});

export default CustomInput;
