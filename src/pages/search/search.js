import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'
import qs from 'qs'

let{id,keyword} = qs.parse(location.search.substr(1))
new Vue({
    el:'#app',
    data:{
        searchlists:null,
        id:parseInt(id),
        keyword:keyword,
        pageNum:1,
        pageSize:6,
        isscroll:false,
    },
    methods:{
        getsearchlist(){
            axios.get(url.srarchlist,{
                params:{
                    id:this.id,
                    keyword:this.keyword,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(data=>{
                this.searchlists = data.data.lists
            })
        },
        touchmovea(){
            if(document.documentElement.scrollTop>100) { 
                this.isscroll = true
              } else {
                this.isscroll = false
              }
        },
        totop(){
            setTimeout(()=>{
                document.documentElement.scrollTop = 0
                this.isscroll = false
            },300)
            
        }
    },
    created(){
        this.getsearchlist()
    },
    mixins:[mixin]
})