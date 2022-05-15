import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import VueProgressBar from "@aacassandra/vue3-progressbar"

import 'bootstrap/scss/bootstrap.scss'
import 'toastr/toastr.scss'

const app = createApp(App);

const vueProgressBarOption = {
    color: '#0061f2',
    thickness: "5px"
}

app.use(VueProgressBar, vueProgressBarOption).use(store)

export default app.mount("#app")