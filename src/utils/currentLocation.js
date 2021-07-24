// const { response } = require('express')
const request=require('request')
const currentLocation=(location,callback)=>{
    const url='https://ipgeolocation.abstractapi.com/v1/?api_key=737de9383c7b4df3bc106a1f2c8265a1'
    request({url:url, json:true},(error,response)=>{
        if(error)
        callback(error,undefined);
        else 
        callback(undefined,{
            loc: response.body.city
        })
    })
}
module.exports=currentLocation;
