import axios from 'axios';
import { APPLICATION_API_URL } from '../../constants/CommonConstants';

const checkAndReturnReponse = (response) => {
    if (response?.status !== 200) {
        return new Promise((resolve) => {
            return resolve({ statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!' });
        })
    }
    return response?.data;
}

export const serverRequest = async (requestConfig, data, urlParams = {},pathParams={}) => {
    let finalConfig = {};
    finalConfig['baseURL'] = APPLICATION_API_URL;

    Object.entries(requestConfig).map(([key, value]) => {
        finalConfig[key] = value;
    })
    let url = finalConfig.url;
    if (pathParams && Object.keys(pathParams).length > 0) {
        Object.entries(pathParams).forEach(([key, value]) => {
            url = url.replace(`:${key}`, value);
        });
    }
    finalConfig.url = url;
    finalConfig.data = data;
    finalConfig.params = urlParams;
    if (!finalConfig.headers) {
        finalConfig.headers = {};
    }
    finalConfig.headers['X-Requested-With'] = 'XMLHttpRequest';
    return axios(finalConfig).then((response) => {
        return checkAndReturnReponse(response);
    }).catch(err => {
        if (err.message === "Network Error" || err.code === `ECONNABORTED`) {
            return new Promise((resolve) => {
                return resolve({ statusCode: "FAILURE", message: "Network Error" });
            })
        } else if (err && err.response && err.response.status === 400) {
            return new Promise((resolve) => {
                return resolve({ statusCode: "FAILURE", message: "Network Error" });
            })
        }
        else {
            return new Promise((resolve, reject) => {
                return reject(err);
            });
        }
    });
}

export const uploadFilesToServer = (url, filesFormData, requestConfig) => {
    return axios.post(url, filesFormData, requestConfig).then((response) => {
        if (response.status !== 200) {
            return new Promise((resolve) => {
                return resolve({ statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!' });
            })
        }
        return response.data;
    }).catch(err => {
        return new Promise((resolve, reject) => {
            return resolve({ statusCode: 'CLIENT_ERROR', message: err.response.data.message });
        });
    });
}
