import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './User';


// Call this after login or register success
export async function handleLoginOrRegisterSuccess(response, dispatch) {
    const { token, user } = response; // Make sure your API response has 'token' and 'user'

    if (token && user) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));

        dispatch(setUser({
            token,
            userData: user,
            login_status: true,
            guest_status: false,
        }));
    }
}
