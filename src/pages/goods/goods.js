import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transtion.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import swiper from 'components/swiper.vue'
import mixin from 'js/mixin.js'
import qs from 'qs'
let { id } = qs.parse(location.search.substr(1))
new Vue({
    el: '#app',
    data: {
        goodsdetails: null,
        id: parseInt(id),
        swiperimg: null,
        hotLists:null,
        skushow:false,
        detaltab:['商品详情','本店成交'],
        curindex:0,
        skytype:0,
        goodsNum:1,
        isdisable:true,
        iscarticon:false,
        iscartmsg:false
    },
    methods: {
        getgooddetails() {
            axios.get(url.goodsdetails, {
                params: {
                    id: this.id
                }
            }).then(data => {
                this.goodsdetails = data.data.data
                this.swiperimg = data.data.data.imgs.map((element) => {
                    return {
                        clickUrl: '',
                        img: element
                    }
                })

            })
        },
        getHost(){
            axios.get(url.hotLists,{
                params:{
                pageNum:1,
                pageSize:6
            }}).then(res=>{ 
                 this.hotLists = res.data.lists
                
                
            })
        },
        isskushow(type){
            this.skushow = true
            this.skytype = type

        },
        changetab(index){
            this.curindex = index
        },
        // minusnum(){
        //     if(this.goodsNum===1){
        //         return
        //     }else{
        //         this.goodsNum--;
        //     }
        // },
        // plusnum(){
        //     this.goodsNum++;
        // },
        changegoods(num){
            if(num<0 && this.goodsNum===1) return
            this.goodsNum +=num
        },
        changeskunum(){
            this.changesku = true
        },
        addcart(){
            axios.post(url.addcart,{
                id,
                number:this.goodsNum
            }).then((data)=>{
                if(data.data.status===200){
                console.log(data.data)
                this.iscarticon=true
                this.iscartmsg = true
                this.skushow = false
                setTimeout(()=>{
                    this.iscartmsg = false
                },1000)
                }
            })
        }
    },
    components: {
        swiper
    },
    created() {
        this.getgooddetails()
        this.getHost()
    },
    mixins: [mixin],
    watch:{
        skushow(newvalue){
            document.querySelector('html').style.overflow = newvalue ? 'hidden' : 'auto'
            document.querySelector('html').style.height = newvalue ? '100vh' : 'auto'
        },
        goodsNum(newvalue){
            if(newvalue===1){
                this.isdisable = true
            }else{
                this.isdisable = false
            }
        }
    }
})
