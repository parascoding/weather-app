const request=require('request');
forecast=(address,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=122e9a2b3c92c886983861b4f007b125&query='+address;
    request({url:url,json:true},(error,response)=>{

        if(error)
        callback(error,undefined);
        else
        callback(undefined,response.body);
    })
}
module.exports=forecast;