import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import BottomTab from './BottomTab';
import SearchProfile from '../Screens/Search/SearchProfile';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Email from '../Screens/Auth/Email';
import PasswordRecover from '../Screens/Auth/PasswordRecover';
import Splash from '../Screens/Auth/Splash';
import EditProfile from '../Screens/UserProfile/EditProfile';
import History from '../Screens/UserProfile/History';
import LearnMore from '../Screens/Home/LearnMore';

const Stack = createStackNavigator();

// create a component
const UserStack = () => {
    const { login_status, guest_status } = useSelector(state => state.User);
    return (
        <Stack.Navigator
            initialRouteName={login_status || guest_status ? "Splash" : "Login"}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="SearchProfile" component={SearchProfile} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen name="PasswordRecover" component={PasswordRecover} />

            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="LearnMore" component={LearnMore} />
        </Stack.Navigator>
    );
};

export default UserStack;
