<template>
    <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item" :class="{'address-item-default':list.isDefault}" v-for="list in lists" :key="list.id">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName+list.cityName+list.districtName+list.address+'  '+list.districtValue}}</p>
        <a class="address-edit" @click="editaddress(list)">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',params:{type:'add',data:' '}}">
            新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
import url from 'js/api.js'
export default {
    data(){
        return {
            lists:null
        }
    },
    methods:{
        getaddressLists(){
            this.axios.get(url.addressLists).then((res)=>{
                this.lists = res.data.lists 
            })
        },
        editaddress(address){
            sessionStorage.setItem('typedata', JSON.stringify(address))
            this.$router.push({name:'form',params:{type:'edit',data:address}})
        }
    },
    created(){
        this.getaddressLists()
    }
}
</script>