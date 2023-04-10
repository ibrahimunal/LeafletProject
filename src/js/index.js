

var map = L.map('map').setView([35.3949, 36.1240], 8);

L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    maxZoom: 18,
	attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
 L.Control.geocoder().addTo(map);


 if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!");
  } else {
    setInterval(()=>{
        navigator.geolocation.getCurrentPosition(getPosition);
    },5000)
  }

  var marker, circle, lat, long, accuracy;

  function getPosition(position) {
    // console.log(position)
    lat = position.coords.latitude;
    long = position.coords.longitude;
    accuracy = position.coords.accuracy;
  
    if (marker) {
      map.removeLayer(marker);
    }
  
    if (circle) {
        map.removeLayer(circle);
    }
  
    marker = L.marker([lat, long]);
    circle = L.circle([lat, long], { radius: accuracy });
  
    var featureGroup = L.featureGroup([marker, circle]).addTo(map);
  
    map.fitBounds(featureGroup.getBounds());
  
    console.log(
      "Your coordinate is: Lat: " +
        lat +
        " Long: " +
        long +
        " Accuracy: " +
        accuracy
    );
  }


L.marker([35.3949, 36.1240]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    var cities = L.layerGroup([littleton, denver, aurora, golden]);


googleSat.addTo(map);

//Layer Controller

var baseMaps = {
    "Water color map": waterColor,
    "Google satellite": googleSat,
    "Google Terrain": googleTerrain
};

var overlayMaps = {
    "Cities": cities
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

var pointJson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[32.61655441825738,39.987944458168556],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.65687813290566,39.988422710527914],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.65488067335622,39.97388234256516],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[32.617428306809586,39.976274063058725],"type":"Point"}}]}
L.geoJSON(pointJson, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(map);


    // navigator.geolocation.getCurrentPosition(getPosition)


    // var getPosition = (pos) => {
    //     console.log(pos.coords.latitude);
        


    // }