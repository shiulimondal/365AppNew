import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setGuest } from '../Redux/reducer/User';

export const loadUserFromStorage = async (dispatch) => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    const token = await AsyncStorage.getItem('token');

    if (userData && token) {
      // If there's stored user data and token, treat as logged in
      const parsedUserData = JSON.parse(userData);
      dispatch(setUser({
        token,
        userData: parsedUserData,
        login_status: true,
        guest_status: false,
      }));
    } else {
      // No user data means it's a guest user
      dispatch(setGuest());
    }
  } catch (error) {
    console.error('Error loading user from AsyncStorage:', error);
    dispatch(setGuest()); // Default to guest if error occurs
  }
};
