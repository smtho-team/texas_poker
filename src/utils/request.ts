import router from '@/router'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {inject} from "vue"

const baseURL = process.env.VUE_APP_BASEURL
const message = inject('$message')
const instance = axios.create({
    timeout: 50000,
    baseURL,
    headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(
    config => {
        if(config.isVer) {
            config.baseURL = process.env.VUE_APP_NFTSCAN;
        }
        return config
    },
    err => Promise.reject(err)
)

instance.interceptors.response.use(
    res => {
        return res.data
        
    },
    err => {
        console.log(err);
        (message as any).error(err);
        return Promise.reject(err);
    }
)

const request = (url: string, method: string, data?: object, isVer?: boolean) => {
    return instance.request({
        url,
        method,
        [method.toLowerCase() == 'get' ? 'params' : 'data']: data,
        isVer,
    })
}

export { request, baseURL, instance as axios }