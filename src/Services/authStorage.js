import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setGuest } from '../Redux/reducer/User';

// Function to load user data from AsyncStorage
export const loadUserFromStorage = async (dispatch) => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        const token = await AsyncStorage.getItem('token');

        if (userData && token) {
            const parsedUserData = JSON.parse(userData);
            // Dispatch the action to set the user data in Redux
            dispatch(setUser({
                token: token,
                userData: parsedUserData,
                login_status: true,
                guest_status: false,
            }));
        } else {
            // If no user data is found, dispatch setGuest action
            dispatch(setGuest());
        }
    } catch (error) {
        console.error('Error loading user data from storage:', error);
        // Dispatch setGuest if there's an error loading user data
        dispatch(setGuest());
    }
};

