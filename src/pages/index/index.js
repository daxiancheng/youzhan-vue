import './index.css'
import 'css/common.css'
import url from 'js/api.js'
import bottomnav from 'components/bottomnav.vue'
import swiper from 'components/swiper.vue'
import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

new Vue({
    name:'index',
    el:'#app',
    data:{
        hostLis:null,
        pageNum:1,
        loading:false, //控制是否触发无限加载事件，false触发，true不触发
        pageSize:6,
        currstart:false,
        bannerList:null,
    },
    methods:{
        getHost(){
            if(this.currstart) return
            this.loading = true
            axios.get(url.hotLists,{
                params:{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }}).then(res=>{ 
                let curLists = res.data.lists              
                if(curLists.length<this.pageSize){ //判断是否加载完毕
                    this.currstart = true
                }
                if(this.hostLis){
                    this.hostLis = this.hostLis.concat(curLists)
                }else{
                    this.hostLis = curLists
                }
                this.loading = false
                this.pageNum++
            }).catch(err=>console.err(err))
        },
        getBannerlist(){
            axios.get(url.banner,{
                params:{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }}).then(res=>{
                this.bannerList = res.data.lists
            })
        }
    },
    components:{
        bottomnav,
        swiper
    },
    created(){
        this.getHost()
        this.getBannerlist()
    },
    mixins:[mixin]
})