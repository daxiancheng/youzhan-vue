<template>
  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value />
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" maxlength="20" v-model="name" />
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" maxlength="11" v-model="tel" />
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="list.value" v-for="list in lists" :key="list.value">{{list.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="list.value" v-for="list in citylists" :key="list.value">{{list.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" data-code v-model="distValue">
              <option value="-1">选择地区</option>
              <option :value="list.value" v-for="list in distlists" :key="list.value">{{list.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            name="address_detail"
            maxlength="100"
            v-model="address"
          />
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div class="block-item c-blue center" @click="Address">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="isedit">
      <div class="block-item c-red center" @click="remove">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="isedit">
      <button class="btn btn-standard js-save-default-btn" @click="setDefault">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
import addressLists from "js/address.json";
import url from "js/api.js";
export default {
  data() {
    return {
      lists: addressLists.list,
      provinceValue: -1,
      citylists: null,
      cityValue: -1,
      distValue: -1,
      distlists: null,
      name: "",
      tel: "",
      address: "",
      isedit: false,
      type: "",
      typedata: null,
      id: ""
    };
  },
  methods: {
    getprovince(province) {
      this.provinceValue = province.value;
      this.citylists = province.children;
      consoel.log(1);
    },
    Address() {
      let { name, tel, provinceValue, cityValue, distValue, address } = this;
      let data = { name, tel, provinceValue, cityValue, distValue, address };
      if (this.type === "add") {
        this.axios.post(url.addressAdd, data).then(res => {
          this.$router.go(-1);
          console.log(res);
        });
      } else {
        this.axios.post(url.addressUpdate, data).then(() => {
          this.$router.go(-1);
        });
      }
    },
    remove() {
      this.axios.post(url.addressRemove, this.id).then(() => {
        this.$router.go(-1);
      });
    },
    setDefault() {
      this.axios.post(url.addressSetDefault, this.id).then(() => {
        this.$router.go(-1);
      });
    }
  },
  watch: {
    provinceValue(newvalue) {
      if (newvalue === -1) return;
      let c = this.lists.find(ele => {
        return ele.value === newvalue;
      });
      this.cityValue = -1;
      this.distValue = -1;
      this.citylists = c.children;
    },
    cityValue(newvalue) {
      if (newvalue === -1) return;
      let c = this.citylists.find(ele => {
        return ele.value === newvalue;
      });
      this.distValue = -1;
      this.distlists = c.children;
    }
  },
  created() {
    this.type = this.$route.params.type;
    // sessionStorage.setItem("typedata",JSON.stringify(this.$route.params.data) );
    let obj = sessionStorage.getItem("typedata");
    this.typedata = JSON.parse(obj)
    console.log(this.typedata)
    console.log(typeof this.typedata)
    if (this.type === "add") {
      this.isedit = false;
    } else {
        this.isedit = true;
        this.name = this.typedata.name;
        this.tel = this.typedata.tel;
        this.address =
          this.typedata.provinceName +
          this.typedata.cityName +
          this.typedata.districtName +
          this.typedata.address +
          "  " +
          this.typedata.districtValue;
        this.id = this.typedata.id;
     

      //  this.provinceValue = this.typedata.provinceValue
      //  this.cityValue = this.typedata.cityValue
      //  this.distValue = this.typedata.districtValue
    }
  }
};
</script>
