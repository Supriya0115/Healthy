// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//State Data

var state_county_ct = [
  {
  "Fairfield": {
  "Latitude": "+41.212896°",
  "Longitude": "–73.354820°",
  "Population": "882,567",
  "TotalArea": "836.956",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/Fairfield_County,_Connecticut"
  }
  },
  {
  "Hartford": {
  "Latitude": "+41.769967°",
  "Longitude": "–72.715449°",
  "Population": "857,183",
  "TotalArea": "750.572",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/Hartford_County,_Connecticut"
  }
  },
  {
  "Litchfield": {
  "Latitude": "+41.754255°",
  "Longitude": "–73.212688°",
  "Population": "182,193",
  "TotalArea": "944.574",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/Litchfield_County,_Connecticut"
  }
  },
  {
  "Middlesex": {
  "Latitude": "+41.449378°",
  "Longitude": "–72.539622°",
  "Population": "155,071",
  "TotalArea": "439.069",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/Middlesex_County,_Connecticut"
  }
  },
  {
  "New Haven": {
  "Latitude": "+41.390764°",
  "Longitude": "–72.940320°",
  "Population": "824,008",
  "TotalArea": "862.017",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/New_Haven_County,_Connecticut"
  }
  },
  {
  "New London": {
  "Latitude": "+41.446109°",
  "Longitude": "–72.092949°",
  "Population": "259,088",
  "TotalArea": "771.663",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/New_London_County,_Connecticut"
  }
  },
  {
  "Tolland": {
  "Latitude": "+41.853064°",
  "Longitude": "–72.358387°",
  "Population": "136,364",
  "TotalArea": "417.013",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/Tolland_County,_Connecticut"
  }
  },
  {
  "Windham": {
  Latitude: "+41.834314°",
  "Longitude": "–71.988008°",
  "Population": "109,091",
  "TotalArea": "521.466",
  "geodemo.CountyWikiLink": "https://en.wikipedia.org/wiki/Windham_County,_Connecticut"
  }
  }
  ]


// Define a markerSize function that will give each city a different radius based on its population
  function markerSize(population,area) {
    return population / area;
  }

  for (var i = 0; i < state_county_ct.length; i++) {
    console.log(state_county_ct[i])
    // Conditionals for county population
    var color = "";
    if (state_county_ct[i].Population > 300000) {
      color = "yellow";
    }
    else {
      color = "red";
    }
  
    // // Add circles to map
    // L.circle(countries[i].location, {
    //   fillOpacity: 0.75,
    //   color: "white",
    //   fillColor: color,
    //   // Adjust radius
    //   radius: countries[i].points * 1500
    // }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
  }