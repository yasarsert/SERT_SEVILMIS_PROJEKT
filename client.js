const unirest = require("unirest")
var command = process.argv[2];
var url = "https://community-open-weather-map.p.rapidapi.com/find?type=link%2C+accurate&units=imperial%2C+metric&q=" + stadt;
Request(url)
unirest.get("http://127.0.0.1:8080/client")
    .end(function (result) {
        console.log(result.body)
    })