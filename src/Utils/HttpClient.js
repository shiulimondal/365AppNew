import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'https://365instantcheck.com/api'; --original one
const BASE_URL = 'https://dev.365instantcheck.com/api'; // dev url
// export const BASE_URL_LOCAL = 'http://192.168.1.30:5000/api'; // local url

// export const PAY_URL = 'https://365instantcheck.com/api'; --original one
export const PAY_URL = 'https://dev.365instantcheck.com/api'; // dev url
// export const COUPON_URL = 'https://365instantcheck.com/api/admin'; -- original url 
export const COUPON_URL = 'https://dev.365instantcheck.com/api/admin'; // dev url

export const payment_api_key = '233830ba05c87e5cd4a82b6ba36763e77b0bdcb1d664eb35edd14177d53c2bed';
export const frontend_api_key = 'dc8915f11ecfe29826baa0f4b10669fbe1b3f97bf3ac08376949ee0aadc08e03';


async function get(endpoint, params, customHeaders = {}) {
    return request(endpoint, params, "GET", customHeaders);
}

async function post(endpoint, params, customHeaders = {}) {
    return request(endpoint, params, "POST", customHeaders);
}
async function patch(endpoint, params, customHeaders = {}) {
    return request(endpoint, params, "PATCH", customHeaders);
}

async function put(endpoint, params) {
    return request(endpoint, params, "PUT");
}

async function Delete(endpoint, params) {
    return request(endpoint, params, "DELETE");
}
async function request(endpoint, params = null, method = 'GET', customHeaders = {}) {
    const token = await AsyncStorage.getItem('token');
    console.log('token------------------------------token', token);

    const url = BASE_URL + endpoint;
    console.log('URL:--------------------------00000------------------------', url);
    const PAY_url = PAY_URL + endpoint;
    console.log('PAY_url:--------------------------PAY_url------------------------', PAY_url);

    const headers = {
        'Accept': 'application/json',
        'x-frontend-api-key': frontend_api_key,
        'x-payment-api-key': payment_api_key,
        'galaxy-search-type': 'BackgroundReport',
        'galaxy-ap-name': '365background',
        'galaxy-ap-password': '8c2eadc65a2249d29a1035a548b0a1a9',
        ...customHeaders,
    };

    if (token && !customHeaders['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let body = null;
    if (params instanceof FormData) {
        body = params;
    } else if (params) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(params);
    }

    const response = await fetch(url, {
        method,
        headers,
        body: method === 'GET' ? null : body,
    });

    const responseText = await response.text();
    const jsonResponse = responseText ? JSON.parse(responseText) : {};

    if (response.ok) {
        return jsonResponse;
    } else {
        throw jsonResponse;
    }
}


const HttpClient = {
    get,
    post,
    put,
    patch,
    Delete,
};

export default HttpClient;
