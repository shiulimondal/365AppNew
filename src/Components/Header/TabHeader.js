import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useTheme } from '../../../ThemeContext';
import NavigationService from '../../Services/Navigation';
import Icon from '../../Ui/Icon';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TabHeader = ({ title = '' }) => {
    const { colors } = useTheme();
      const navigation = useNavigation();
  
    return (
        <View style={styles.main_view}
         >
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent={true}
            />
            <Text style={{...styles.title_txt,color:colors.primaryFontColor}}>{title}</Text> 

            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    main_view:{
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        paddingTop: moderateScale(30),
        paddingBottom: moderateScale(20),
    },
    title_txt:{
        fontFamily: FONTS.Poppins.medium,
        fontSize: moderateScale(14),
        textAlign:'center'
    }

});

export default TabHeader;
