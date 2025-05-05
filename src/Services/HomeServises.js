import HttpClient from "../Utils/HttpClient"
import MainStorage from "../Utils/MainStorage";

const getAccount = async () => {
    return MainStorage.get('account');
}
const setAccount = async (data) => {
    return MainStorage.set('account', data);
}
async function setToken(data) {
    return await MainStorage.set('token', data);
}
const setsearchData = async (data, page = 1, limit = 10) => {
    return HttpClient.post(`/person-search-teaser-report?page=${page}&limit=${limit}`, data);
};
const setFullData = async (userRealId, data) => {
    return HttpClient.post(`/person-search-teaser-report/${userRealId}`, data);
};
const setFullUpdateData = async (data, token) => {
    return HttpClient.post(`/person-search-full-report`, data, {
        Authorization: `Bearer ${token}`,
    });
};
const setPaymentSubmit = async (data) => {
    return HttpClient.post(`/payment/v2`, data);
};
const setShowHistory = async () => {
    return HttpClient.get(`user/search-history`);
};


const HomeService = {
    getAccount,
    setAccount,
    setToken,
    setsearchData,
    setFullData,
    setFullUpdateData,
    setPaymentSubmit,
    setShowHistory
}

export default HomeService;