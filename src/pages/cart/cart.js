import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'
import axios from 'axios'

new Vue({
    el: '#cart',
    data: {
        cartList: null,
        arrgood: [],
        currentShop: null,
        changegoodsnum:1,
        delectcart:false,
        delectDate:null,
        delectgoods:false,
        delectshop:false,
        editingShopIndex:-1
    },
    methods: {
        getcartlist() {
            axios.get(url.cartlist).then((res) => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.rmDelect = false
                    shop.editing = false
                    shop.editMsg = '编辑'
                    shop.check = true
                    shop.goodsList.forEach((goods) => {
                        goods.rmDelect = false
                        goods.check = true
                    })
                });
                this.cartList = lists
            })
        },
        goodscheck(shop, goods) {
            if (!this.currentShop) {
                goods.check = !goods.check
                if (shop.goodsList.every((ele) => {
                    return ele.check
                })) {
                    shop.check = true
                } else {
                    shop.check = false
                }
            }else if(this.currentShop&&shop.editing){
                goods.rmDelect = !goods.rmDelect
                if (shop.goodsList.every((ele) => {
                    return ele.rmDelect
                })) {
                    shop.rmDelect = true
                } else {
                    shop.rmDelect = false
                }

            }

        },
        checkshop(shop) {
            if(!this.currentShop){
                if (shop.check) {
                    shop.check = false
                    shop.goodsList.forEach((goods) => {
                        goods.check = false
                    })
                } else {
                    shop.check = true
                    shop.goodsList.forEach((goods) => {
                        goods.check = true
                    })
                }
            }else if(this.currentShop&&shop.editing){
                if (shop.rmDelect) {
                    shop.rmDelect = false
                    shop.goodsList.forEach((goods) => {
                        goods.rmDelect = false
                    })
                } else {
                    shop.rmDelect = true
                    shop.goodsList.forEach((goods) => {
                        goods.rmDelect = true
                    })
                }
            }
            
        },
        selectAll() {
            if(!this.currentShop){
                this.checkall = !this.checkall
            }else{
                this.rmAll = !this.rmAll
            }
            
        },
        isEditing(shop, index) {
            // if(shop.editMsg==='编辑'){
            //     shop.editMsg = '完成'
            //     这是开始的想法。。
            // }
            shop.editing = !shop.editing
            shop.editMsg = shop.editing ? '完成' : '编辑'
            this.cartList.forEach((item, i) => {
                if (i !== index) {
                    item.editing = false
                    item.editMsg = shop.editing ? '' : '编辑' //编辑的时候其他的店铺处于不能编辑状态，完成后可以编辑

                }
            })
            this.currentShop = shop.editing ? shop : null //精髓啊
            this.editingShopIndex = shop.editing ? index : -1
        },
        changenum(goods,num){
            if(goods.number===1 && num<0){ //哎呀,这都想半天 真的是fw
                return  
            }
            goods.number +=num

        },
        rmgoods(shop,shopindex,goods,goodsindex){
            this.delectcart = true
            this.delectgoods = true
            this.delectDate = {shop,shopindex,goods,goodsindex}
        },
        rmshop(){
            this.delectcart = true
            this.delectshop = true
        },
        removeConfirm(){
            console.log('........')
            
            if(this.delectgoods){
                let {shop,shopindex,goods,goodsindex} = this.delectDate
                axios.post(url.removecart,{
                    id:goods.id
                }).then(()=>{
                    shop.goodsList.splice(goodsindex,1)
                    if(!shop.goodsList.length){
                        this.cartList.splice(shopindex,1)
                        this.cartList.forEach((item)=>{ //店铺删除后，其他的店铺回复到编辑之前的状态
                            item.editing = false
                            item.editMsg = '编辑'
                            this.editingShopIndex = -1
                        })
                    }
                    this.delectcart = false
                    this.delectgoods = false
                    return
                })
            }
            if(this.delectshop){
                let ids = []
                this.currentShop.goodsList.forEach((good)=>{
                    ids.push(good.id)
                })
                axios.post(url.mrremove,{
                    ids
                }).then(()=>{
                    this.cartList.splice(this.editingShopIndex,1)
                    this.cartList.forEach((item)=>{ //店铺删除后，其他的店铺回复到编辑之前的状态
                        item.editing = false
                        item.editMsg = '编辑'
                        this.editingShopIndex = -1
                    })
                    this.delectcart = false
                    this.delectshop = false
                })
                console.log('quanxuan')
            }
        }
    },
    created() {
        this.getcartlist()
    },
    mixins: [mixin],
    computed: {
        checkall: {
            get() {
                if (this.cartList) {
                    return this.cartList.every((shop) => {
                        return shop.check
                    })
                } else {
                    return false
                }
            },
            set(newvalue) {
                this.cartList.forEach((shop) => {
                    shop.check = newvalue
                    shop.goodsList.forEach((goods) => {
                        goods.check = newvalue
                    })
                })
            }
        },
        totalprice() {
            let arrgoods = []
            let p = 0
            if (this.cartList) {
                this.cartList.forEach((shop) => {
                    shop.goodsList.forEach((goods) => {
                        if (goods.check) {
                            arrgoods.push(goods)
                        }
                    })
                })
                this.arrgood = arrgoods
                arrgoods.forEach((goods) => {
                    p += goods.price * goods.number
                })
                return p
            }

        },
        rmAll:{
            get(){
                if(this.currentShop){
                    // if(this.currentShop.rmDelect){
                    //     return true
                    // }else{
                    //     return false
                    // }
                    return this.currentShop.rmDelect
                }else{
                    return false
                } 
            },
            set(newvalue){
                this.currentShop.rmDelect = newvalue
                this.currentShop.goodsList.forEach((goods)=>{
                    goods.rmDelect = newvalue
                })
            }
        }
    }
})