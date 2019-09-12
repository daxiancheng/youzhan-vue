let url = {
    hotLists: 'index/hotLists',
    banner: 'index/banner',
    topLiats: 'category/topList',
    rank: 'category/rank',
    sublist: 'category/subList',
    srarchlist: 'search/list',
    goodsdetails: 'goods/details',
    addcart: 'cart/add',
    cartlist: 'cart/list',
    removecart: 'cart/remove',
    mrremove: 'cart/mrremove',
    addressLists: '/address/list',
    addressAdd: '/address/add',
    addressRemove: '/address/remove',
    addressUpdate: '/address/update',
    addressSetDefault: '/address/setDefault'
}

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = 'http://rap2api.taobao.org/app/mock/7058/' + url[key]
    }
}



export default url