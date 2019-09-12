import './category.css'
import 'css/common.css'
import url from 'js/api.js'
import bottomnav from 'components/bottomnav.vue'
import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
new Vue({
    el: '#app',
    data: {
        toplists: null,
        curindex: 0,
        ranklists: null,
        sublist: null
       
    },
    methods: {
        getToplist() {
            axios.get(url.topLiats).then(res => {
                this.toplists = res.data.lists
            })
        },
        getcurindex(index, id) {
            this.curindex = index
            axios.get(url.sublist, {
                params: {
                    id
                }
            }).then(res => {
                this.sublist = res.data.data
            })

        },
        getrank() {
            axios.get(url.rank).then(res => {
                this.ranklists = res.data.data
            })
        },
        searchlis(list){
            location.href = `search.html?id=${list.id}&keyword=${list.name}`
        }
    },
    created() {
        this.getToplist()
        this.getcurindex(0)
        this.getrank()
    },
    components: {
        bottomnav
    },
    mixins:[mixin]
})