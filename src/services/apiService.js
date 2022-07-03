import axios from "axios";
import store from '../store/index'
// import app from '../main'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Authorization: `Bearer ${store.state.auth_token}`
    }
})

instance.interceptors.request.use(
    (config) => {
        if (store.state.auth_token) {
            config.headers['Authorization'] = `Bearer ${store.state.auth_token}`
        }
        return config
    }
)

instance.interceptors.request.use(config => {
    // app.$Progress.start();
    return config
}, (error) => {
    // app.$Progress.fail();
    return Promise.reject(error);
})

instance.interceptors.response.use(response => {
    // app.$Progress.finish()
    return response
}, (error) => {
    if (error.response.status === 401) {
        store.commit('SET_AUTH_TOKEN', null)
        store.commit('SET_USER', null)
        // TODO : i need to change it to redirect it to 401 page
    }
    // app.$Progress.fail();
    return Promise.reject(error);
})

export default instance;
