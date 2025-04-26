import React from 'react';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Brands';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6Brands';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';


const iconTypes = {
    AntDesign, 
    MaterialIcons,
    FontAwesome,
    Ionicons,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome5,
    // FontAwesome5Brands,
    FontAwesome6,
    // FontAwesome6Brands,
    Fontisto,
    Foundation,
    MaterialCommunityIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
};

const Icon = ({ name, type, color, size }) => {
    const IconComponent = iconTypes[type];

    if (!IconComponent) {
        console.warn(`Icon type "${type}" is not supported.`);
        console.log(`Icon type "${type}" is not supported.`);
        
        return null;
    }

    return (
        <View>
            <IconComponent name={name} size={size} color={color} />
        </View>
    );
};

export default Icon;
