const express = require('express');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const currentLocation=require('./utils/currentLocation')
const path=require('path')
const app=express();
const request=require('request')
const hbs=require('hbs');
const pathTopublic=path.join(__dirname,'../public')
const partialPaths=path.join(__dirname,'../templates/partials');
const pathToViews=path.join(__dirname,'../templates/views');
const port=process.env.PORT||3000;
hbs.registerPartials(partialPaths);
app.use(express.static(pathTopublic));
app.set('view engine','hbs')
app.set('views',pathToViews);
var placeholder;
const url1='https://ipgeolocation.abstractapi.com/v1/?api_key=737de9383c7b4df3bc106a1f2c8265a1'
        request({url:url1, json:true},(error,response)=>{
            placeholder=response.body.city;
        })
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        text: 'Use this site to fetch weather.',
        name: 'Paras Yadav',
        place: placeholder
    });
}) 

app.get('/about',(req,res)=>{
    res.render('about',{
        title: ' about',
        text: 'Use this site to fetch weather.',
        name: 'Paras Yadav'
        
    });
})
app.get('/weather',(req,res)=>{
    var address='';//=req.query.address;
    
    if(!req.query.address)
    {
        var tempAdd;
        const url1='https://ipgeolocation.abstractapi.com/v1/?api_key=737de9383c7b4df3bc106a1f2c8265a1'
        request({url:url1, json:true},(error,response)=>{
            
            forecast(response.body.city,(error,data)=>{
                if(error)
                return res.send({message: 'An error occured'})
                else if(data)
                {
                    if(data.success==false)
                    return res.send({
                        message: 'Try for different location' 
                    })
                    else
                    return res.send({
                        city: data.location.name,
                        state: data.location.region,
                        country: data.location.country,
                        temp: data.current.temperature,
                        weather: data.current.weather_descriptions[0],
                        message1: "It's "+data.current.temperature+"°C in "+data.location.name+", "+data.location.country+"\n",
                        message2:"Current weather - "+data.current.weather_descriptions[0]
        
                    })
                }
            })
        })   
        // return res.send({
        //     message1: "Try for different location"
        // })
        // console.log("req not flond");
    }
    else
    {
        address=req.query.address;
        forecast(address,(error,data)=>{
            if(error)
            return res.send({message: 'An error occured'})
            else if(data)
            {
                if(data.success==false)
                return res.send({
                    message1: 'Try for different location' 
                })
                else
                return res.send({
                    city: data.location.name,
                    state: data.location.region,
                    country: data.location.country,
                    temp: data.current.temperature,
                    weather: data.current.weather_descriptions[0],
                    message1: "It's "+data.current.temperature+"°C in "+data.location.name+", "+data.location.country+"\n",
                    message2:"Current weather - "+data.current.weather_descriptions[0]
    
                })
            }
        })
        // console.log("req  flond");
    }
    
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        text: 'Use this site to fetch weather.',
        name: 'Paras Yadav'
    });
})


app.get('*',(req,res)=>{
    res.send('404 Page')
})
app.listen(port,()=>{
    console.log("starting")
})