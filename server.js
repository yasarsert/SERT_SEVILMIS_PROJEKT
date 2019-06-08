const express = require("express")
const unirest = require("unirest")
const path = require("path");
 
const app = express();

// für die css und js datei auf die der Client zugreifen muss
app.use('/static', express.static('public'));

// index seite
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// help seite
app.get("/help", (req, res) => {
    res.sendFile(path.join(__dirname + '/site2.html'));
});

// Wird vom Client aufgerufen um die externe api anzusprechen
app.get('/getdata',(req, res) => {

    var city = req.query.city
    if(city === undefined){
        res.send({city: "city missing"})
    }
    unirest.get("https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q="+city)
    .header("X-RapidAPI-Host", "community-open-weather-map.p.rapidapi.com")
    .header("X-RapidAPI-Key", "e38e017ce7msh83f40b6b300233dp1b2b8ejsna4989e4b1e7d")
    .end(function (result) {
        if(result.code===200)
        {
        var weather = {
            "country" : result.body.sys.country,
            "city" : result.body.name,
            "temperature" : Math.round(result.body.main.temp),
            "description" : result.body.weather.description,
            "sunrise": new Date(result.body.sys.sunrise*1000).toLocaleTimeString(),
            "sunset": new Date(result.body.sys.sunset*1000).toLocaleTimeString(),
            "max": Math.round(result.body.main.temp_min),
            "min": Math.round(result.body.main.temp_max),
            "wind": result.body.wind.speed
        };
        res.send(weather)
    }
    else{
        res.status(result.code).send(result.body.message);
    }
    });
});

// Keine seite trifft zu
app.get('*', (req, res) => {
    res.status(404).send('site does not exist on server');
  });

// Startet Server auf angegebenen Port
app.listen(8080, () => {
    console.log("Server started")
})