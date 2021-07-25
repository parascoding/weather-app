const request=require('request');
forecast=(address,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=aa86ddc603f08847d6428cfdfad36094&query='+address;
    request({url:url,json:true},(error,response)=>{

        if(error||response.sucess=='false')
        callback(error,undefined);
        else
        callback(undefined,response.body);
    })
}
module.exports=forecast;