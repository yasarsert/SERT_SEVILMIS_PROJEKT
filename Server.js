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
    res.sendFile(path.join(__dirname + '/public/site2.html'));
})


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