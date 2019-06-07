const express = require("express")
const unirest = require("unirest")
const path = require("path");
const app = express()
const http = require("http");

app.use('/static', express.static('public'));
const server = http.createServer();

server.on('request', (request, response) => {
    console.log('Url:', request.url)
    console.log('Method:', request.method)
  
    httpUtils.handleStaticRequest(request, response)
  })


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

async function getWeather(cities, callback) {

    var city = city_obj.name;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
    var response_body = await request(url);
    var weather_json = JSON.parse(response_body);
    var weather = {
        country : wea,
        city : city,
        temperature : Math.round(weather_json.main.temp),
        description : weather_json.weather[0].description,
        icon : weather_json.weather[0].icon
    };

    callback(undefined,weather)
}
app.get('/getdata', function(req, res) {

    unirest.get("https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%22metric%22+or+%22imperial%22&mode=xml%2C+html&q=London%2Cuk")
    .header("X-RapidAPI-Host", "community-open-weather-map.p.rapidapi.com")
    .header("X-RapidAPI-Key", "e38e017ce7msh83f40b6b300233dp1b2b8ejsna4989e4b1e7d")
    .end(function (result) {
        console.log(result.status, result.headers, result.body);
    });

    var city = res.query.city
    if(city === undefined){
        req.send({city: "city missing"})
    }
    getWeather(city, (err, data)=>{
        req.send(data)
    })

});

app.get("/client", (req, res) => {
    
    unirest.get("https://community-open-weather-map.p.rapidapi.com/find?type=link%2C+accurate&units=imperial%2C+metric&q=" + req)
        .header("X-RapidAPI-Host", "community-open-weather-map.p.rapidapi.com")
        .header("X-RapidAPI-Key", "e38e017ce7msh83f40b6b300233dp1b2b8ejsna4989e4b1e7d")
        .end(function (result) {
            res.send(result)

            console.log(result.status, result.headers, result.body);
        });
})




//Startet Server aud angegebenen Port und ruft die übergeben Methode auf
app.listen(8080, () => {
    console.log("Server started")
})