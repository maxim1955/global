import {createApp} from 'vue'
import App from './App.vue'


import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faEnvelope, faMobileScreen,faXmark} from '@fortawesome/free-solid-svg-icons'


library.add(faMobileScreen, faEnvelope,faXmark)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
