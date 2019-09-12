import Vue from 'vue'
import Router from 'vue-router'
import member from './components/member.vue'
import address from './components/address.vue'
import all from './components/all.vue'
import form from './components/form.vue'
import axios from 'axios'
Vue.prototype.axios = axios
Vue.use(Router)


let router = new Router({
    routes: [
        {
            path: '/',
            name: 'member',
            component: member
        },
        {
            path: '/address',
            name: 'address',
            component: address,
            children: [{
                path: 'all',
                component: all,
                name:'all'
            }, {
                path: 'form/:type&:data',
                component: form,
                name:'form'
            }]

        }
    ]
})

new Vue({
    el: '#app',
    router
})