import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

export default createStore({
    state: {
        user: null,
        auth_token: null,
        website_data: {
            logo: '',
            about_image: '',
            about_text: '',
            contact_text: '',
            map: ''
        },
    },
    plugins: [createPersistedState()],
    mutations: {
        SET_AUTH_TOKEN(state, payload) {
            state.auth_token = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_WEBSITE_DATA(state, payload) {
            state.website_data = payload
        }
    },
    actions: {
        async fetchActiveUser(context) {
            axios.get(`${process.env.VUE_APP_API_URL}/user`, {headers: {'Authorization': `Bearer ${context.state.auth_token}`}}).then(response => {
                context.commit('SET_USER', response.data)
            })
        },
        cleanAuth(context) {
            context.commit('SET_AUTH_TOKEN', null)
            context.commit('SET_USER', null)
        },
        fetchWebsiteData(context) {
            axios.get(`${process.env.VUE_APP_API_URL}/website/site-data`).then(response => {
                context.commit('SET_WEBSITE_DATA', response.data)
            })
        }
    },
    modules: {}
})
