function getData()
    {
      document.getElementById("searchbtn").innerHTML="Cliiiicked"
      $.ajax({url: "http://localhost:8080/getdata?city="+document.getElementById("cityss").value,
      dataType: "json",
      type: "get",
      contentType: 'application/json',
      success: function( data, textStatus, jQxhr ){
        document.getElementById("country").innerHTML=data.country
        document.getElementById("city").innerHTML=data.city
        document.getElementById("Temperature").innerHTML=data.temperature + " °C"
        document.getElementById("max").innerHTML=data.max + " °C"
        document.getElementById("min").innerHTML=data.min + " °C"
        document.getElementById("Sunrise").innerHTML=data.sunrise
        document.getElementById("Sunset").innerHTML=data.sunset
        document.getElementById("Wind").innerHTML=data.wind + " km/h"
      },
      error: function( jqXhr, textStatus, errorThrown ){
        alert(jqXhr.responseText);
      }})
    }