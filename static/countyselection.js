// variables for drop down menu for state and county selection

var stateurl = '/states';
var statedata;
var countydata;

// load state drop down from Flask Route

Plotly.d3.json(stateurl,function(error,statedata){
  if (error) {
    return console.warn(error);
};

  statedata[0].States.forEach(function(name) {
  Plotly.d3
      .select("#stateselect")
      .append('option')
      .attr('value', name)
      .attr('class', 'dropdown')
      .text(name)
});

})

// action on event change on state drop down and county

 $("#stateselect").change( function(){
    statedata = $(this).val();
    $("#countyselect").empty();
    // function to populate county data based on dynamic selection of state

    populatecounty(statedata);

    Plotly.d3.select('#countyselect').on('change',(function(){
    countydata = this.options[this.selectedIndex].value;
    
    // function to populate county ranking  based on dynamic selection of state and county

    populatecountydetails(statedata,countydata)

    })
  )
});


// begin function populatecounty(statename) 

function populatecounty(statename) {

    var countyurl = `/countynames/${statename}`
    
    Plotly.d3.json(countyurl, function(error, selectcounty) { 
  
    if (error) {
      return console.warn(error);
    }
  
  
    selectcounty[0].CountyNames.forEach(function(name) {
      Plotly.d3
          .select("#countyselect")
          .append('option')
          .attr('value', name)
          .attr('class', 'dropdown')
          .text(name)
    })
    
    })
}

// end function populatecounty(statename) 


// begin function populatecountydetails(statedata,countydata)

function  populatecountydetails(statedata,countydata){    
  console.log(countydata)
  console.log(statedata)
    var table = Plotly.d3.select("#county-background");
    var tbody = table.select("tbody");

    var data_list = [];

    var countyinfo = `/countyalldetails/${statedata}`

    Plotly.d3.json(countyinfo, function(error, county) {

      if (error) {
        return console.warn(error);
        
      }

      var countyattributerank = county[0].Counties.filter(function(name){
        return name.County.CountyName == countydata;
      })


      var attr_c = ["ClinicalCare","EconomicFactors","HealthBehaviours","PhysicalEnvironment","QualityofLife"]

      for(var i =0; i <attr_c.length;i++){

          var county_label = attr_c[i]
          var county_label_rank = countyattributerank[0].County[attr_c[i]]["Rank"]
          var county_row = [county_label,county_label_rank]
          data_list.push(county_row);
          $("tbody").empty();
          var rows = tbody.selectAll('tr')
          .data(data_list)
          .enter()
          .append('tr')
          .html(function(d){
              return `<td>${d[0]}</td><td>${d[1]}</td>`
          })  

        }

      // end function populatecountydetails(statedata,countydata)

        console.log(data_list)

    })

}


  // API key
  const API_KEY = "pk.eyJ1Ijoic3NhdHBhdGh5IiwiYSI6ImNqbGVjb2I2NzBrbmIzcXBtMDdsOHp5aDcifQ.HCxHkdXAzE7YAK_FCbdUXQ";

  // var myMap = L.map("map", {
  //   center: [40.7128, -74.0059],
  //   zoom: 10 })

  // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //     maxZoom: 18,
  //     id: "mapbox.streets",
  //     accessToken: API_KEY
  //   }).addTo(myMap);


  // Creating our initial map object
  // We set the longitude, latitude, and the starting zoom level
  // This gets inserted into the div with an id of 'map'


  
      
    // click circle:

    var clickCircle;

    $(document).ready(function(){ 
      $('#stateselect').change(function(){ 
        var mapstate = $(this).val();
        populatemap(mapstate)
      
      });
    });


    function markerSize(population) {
      return population / 40;
    }


    function populatemap(mapstate){

        
    if( ($('#stateselect').val() == "California") || ($('#stateselect').val() == "Alaska" )) {
      console.log($('#stateselect').val())
      var myMap1 = L.map("map", {
        center: [36.7783, -119.41],
        zoom: 10
    });

    } 
    
    else {
      var myMap1 = L.map("map", {
        center: [40.7128, -74.0059],
        zoom: 10
    })

    }
    

    
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    }).addTo(myMap1);


      if (clickCircle != undefined) {
        console.log(clickCircle)
        myMap1.removeLayer(clickCircle);
      };

      var mapurl = `/countyalldetails/${mapstate}`

      Plotly.d3.json(mapurl, function(error, response){

        if (error) {
          return console.warn(error);
        }

        var county_specs = response[0].Counties

        for (var i = 0; i < county_specs.length; i++) {

          // Conditionals for county population
          var color = "";
          
          var area = parseFloat(county_specs[i].County.TotalArea)
          var population = parseInt(county_specs[i].County.Population)
          var population_approx = population * 1000
          var latitude = (county_specs[i].County.Latitude).split("°")
          var longitude = (county_specs[i].County.Longitude).split("°")
          var longitude_1 = longitude[0].split("–");
          var lat = parseFloat(latitude[0])
          var lon = parseFloat(longitude_1[1])

          var location = [lat,-lon]

          console.log(location)

          if (population_approx > 300000) {
            color = "red";
            console.log(color)
          }
          else {
            color = "yellow";
            console.log(color)
          }    
          
          // Add circles to map
          clickCircle = L.circle(location, {
            fillOpacity: 0.5,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: markerSize(population_approx)
          }).bindPopup("<h4>" + county_specs[i].County.CountyName + "</h4>").addTo(myMap1);

        }

      })

    }
    




  
