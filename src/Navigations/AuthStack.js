import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Splash from '../Screens/Auth/Splash';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Email from '../Screens/Auth/Email';
import PasswordRecover from '../Screens/Auth/PasswordRecover';


const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen name="PasswordRecover" component={PasswordRecover} />
        </Stack.Navigator>
    );
};

export default AuthStack;
