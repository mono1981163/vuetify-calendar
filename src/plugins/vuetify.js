import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import VueCookie from 'vue-cookie'
import '@mdi/font/css/materialdesignicons.css'
// Tell Vue to use the plugin

Vue.use(VueCookie);
export default new Vuetify({
    icons: {
        iconfont: 'mdi', 
    }
});
