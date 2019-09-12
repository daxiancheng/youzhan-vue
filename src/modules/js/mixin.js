let mixin={
    filters:{
        formatpirce(price){
            let ps = price +''   
            if(ps.indexOf('.')>-1){
                let arr = ps.split('.')
                return arr[0]+'.'+(arr[1]+'0').substr(0,2)
        }else{
            return ps+'.00'
        }
            }
            
    }
}

export default mixin