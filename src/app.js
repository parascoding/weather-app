const express = require('express');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const app=express();
const hbs=require('hbs');
const pathTopublic=path.join(__dirname,'../public')
const partialPaths=path.join(__dirname,'../templates/partials');
const pathToViews=path.join(__dirname,'../templates/views');
hbs.registerPartials(partialPaths);
app.use(express.static(pathTopublic));
app.set('view engine','hbs')
app.set('views',pathToViews);

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        text: 'Use this site to fetch weather.',
        name: 'Paras Yadav'
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
    if(!req.query.address)
    return res.send({
        error: 'Must provide a address'
    })

    const address=req.query.address;
    forecast(address,(error,data)=>{
        if(error)
        return res.send({message: 'An error occured'})
        else if(data)
        {
            if(!data.success)
            return res.send({
                message: 'Try for different location' 
            })
            return res.send({
                city: data.location.name,
                state: data.location.region,
                country: data.location.country,
                temp: data.current.temperature,
                weather: data.current.weather_descriptions[0],
                message: "It's "+data.current.temperature+" in "+data.location.name+", "+data.location.country+" and it's "+data.current.weather_descriptions[0]+" here."

            })
        }
    })
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
app.listen(3000,()=>{
    console.log("starting")
})