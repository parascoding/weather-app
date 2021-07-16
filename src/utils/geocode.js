const request = require('request')
const geocdoe = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGFyYXNjb2RpbmciLCJhIjoiY2txd2o3dXIzMG0zYjJ1cWgzbWI5YXB2MSJ9.N_pKTk50tAt_fqYwFuJ7kA&limit=1';
    request({url:url,json:true},(error,response)=>{
        if(error)
        callback(error,undefined);
        else
        callback(undefined,{
            lati:response.body.features[0].center[0],
            longi:response.body.features[0].center[1]
        });
    })
}
module.exports=geocdoe;