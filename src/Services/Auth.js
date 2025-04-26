import HttpClient from "../Utils/HttpClient"
import MainStorage from "../Utils/MainStorage";

const getAccount = async () => {
    return MainStorage.get('account');
}
const setAccount = async (data) => {
    return MainStorage.set('account', data);
}

const setRegister = async (data) => {
    return HttpClient.post('/user/auth/signup', data);
}
const setLogin = async (data) => {
    return HttpClient.post('/user/auth/login', data);
}
const setforgetPassword = async (data) => {
    return HttpClient.post('/user/auth/forget-password', data);
}
const setotpVerify = async (data) => {
    return HttpClient.post('/user/auth/verify-otp', data);
}
const setResetPassword = async (data) => {
    return HttpClient.patch('/user/auth/reset-password', data);
}


const AuthService = {
    getAccount,
    setAccount,
    setRegister,
    setLogin,
    setforgetPassword,
    setotpVerify,
    setResetPassword
}

export default AuthService;