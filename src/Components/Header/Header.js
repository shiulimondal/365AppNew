import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { useTheme } from '../../../ThemeContext';
import NavigationService from '../../Services/Navigation';
import Icon from '../../Ui/Icon';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Header = ({ title = '' }) => {
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
            <View style={styles.container}>
                <TouchableOpacity nPress={() => navigation.goBack()}>
                   <Icon name={'chevron-thin-left'} type={'Entypo'} size={22} color={colors.primaryFontColor}/>
                </TouchableOpacity>

                <Text style={{ ...styles.battle_txt, color: colors.primaryFontColor }}>Back</Text>

               
            </View>

            <Text style={{...styles.title_txt,color:colors.primaryFontColor}}>{title}</Text> 

            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    main_view:{
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: moderateScale(15),
        paddingTop: moderateScale(30),
        paddingBottom: moderateScale(20),
        // justifyContent:'center'
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        width:moderateScale(140)
    },
    battle_txt: {
        fontFamily: FONTS.Poppins.regular,
        fontSize: moderateScale(14),
        marginLeft:moderateScale(10)
    },
    title_txt:{
        fontFamily: FONTS.Poppins.medium,
        fontSize: moderateScale(14),
    }

});

export default Header;
