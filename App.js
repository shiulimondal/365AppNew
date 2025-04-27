import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationService from './src/Services/Navigation';
import AuthStack from './src/Navigations/AuthStack';
import UserStack from './src/Navigations/UserStack';
import { ThemeProvider, useTheme } from './ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { setGuest, setUser } from './src/Redux/reducer/User';
import { loadUserFromStorage } from './src/Services/authStorage';

const Stack = createStackNavigator();

const App = () => {
    const dispatch = useDispatch();
    const { login_status, guest_status } = useSelector((state) => state.User || {});

    console.log('=========app.js=========guest_status==================', guest_status);
    console.log('==========app.js==========login_status================', login_status);

    useEffect(() => {
        console.log('Checking user status on app launch...');
        loadUserFromStorage(dispatch);
    }, [dispatch]);

    useEffect(() => {
        console.log('login_status:', login_status);
        console.log('guest_status:', guest_status);
        if (!login_status && !guest_status) {
            console.log('Dispatching setGuest');
            dispatch(setGuest());
        }
    }, [login_status, guest_status, dispatch]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <SafeAreaProvider>
                    <ThemeContent login_status={login_status} guest_status={guest_status} />
                </SafeAreaProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

const ThemeContent = ({ login_status, guest_status }) => {
    const { colors } = useTheme();
    const navigatorRef = useRef(null);

    return (
        <NavigationContainer
            ref={(ref) => {
                navigatorRef.current = ref;
                NavigationService.setTopLevelNavigator(ref);
            }}
        >
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {login_status || guest_status ? (
                        <Stack.Screen name="UserStack" component={UserStack} />
                    ) : (
                        <Stack.Screen name="AuthStack" component={AuthStack} />
                    )}
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

export default App;
