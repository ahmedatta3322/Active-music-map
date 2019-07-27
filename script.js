var lis = document.getElementById("list_cr");
var list = document.getElementById("list_cr");
//lis.removeChild(lis.firstChild);
//console.log(lis.hasChildNodes());
//console.log(lis.childNodes.length);
var artist = "";
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtZWRhdHRhMzMyMiIsImEiOiJjank3MTVkOGMwNTlyM21udTRxaDkzb3I4In0.cOHX9qry2CR-jFqN7OvBSg';
var map = new mapboxgl.Map({

container: 'map',
style: 'mapbox://styles/mapbox/streets-v9',
zoom: 2

});
map.scrollZoom.disable();

map.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
}));

map.on('load', function () {
    // Add a GeoJSON source containing the state polygons.
    map.addSource('countries', {
        'type': 'geojson',
        'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
    });

    // Add a layer showing the state polygons.
    map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'countries',
        'paint': {
            'fill-color': 'rgba(200, 50, 40, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        
        }
    });
}); 
map.on('mousemove' ,function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: 
    ['state-fills'] });
    // queryrenderfeature take to 3 param , second one is filter , so her we check if the corospnding point have state layer 
    console.log(features.length)
    if (features.length) {
      map.getCanvas().style.cursor = 'pointer';
      map.setPaintProperty("state-fills", "fill-outline-color" , "#00FFFF");
      //console.log("here")
     // map.setFeatureState({source: 'countries', id: e.features[0].properties.admin}, { hover: true});
    }
    else {
      map.getCanvas().style.cursor = '';
      map.setPaintProperty("state-fills", "fill-outline-color" , "rgba(200, 100, 240, 1)");
      //console.log("her2e")
    }
    //map.getCanvas().style = (features.length) ? 'pointer' : '';
    
});

map.on('click' , function(e){
  let x = map.queryRenderedFeatures(e.point)[0].properties.name;
  music()

  console.log(map.queryRenderedFeatures(e.point));
  if (lis.hasChildNodes() == true){
    while( lis.firstChild ){
      console.log("bug");
      //console.log(lis.firstChild);
      lis.removeChild( lis.firstChild );
      }
      switch1(x)
    
  }
  else {
    switch1(x)
  }
  
  
   music()
var popup = new mapboxgl.Popup({closeOnClick: true , closeButton: true})
.setLngLat(e.lngLat)
.setDOMContent(lis)
.addTo(map);
popup.on('close' , function(e){
console.log("ads");
})
})

function crawlwiki(country){
var the_link = new XMLHttpRequest();
var list = document.getElementById("list_cr");
var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=" +country+"_singers";
the_link.open('GET', url, false);


the_link.onload = function() {

    var data = JSON.parse(this.response);

    for (var i in data.query.pages) {
      var li_ele = document.createElement("LI");
      let textn = document.createTextNode(data.query.pages[i].title);
      li_ele.appendChild(textn)
      list.appendChild(li_ele);
        
    }
}
// Send request to the server asynchronously
the_link.send();
}

function crawlpop(country) {
  if (country == "United States") {
    country = "USA" ; 
  }
var proxy = "https://cors-anywhere.herokuapp.com/";
var the_link = new XMLHttpRequest();

var url = "https://popnable.com/"+country+"/artists?filter=views";
var furl = proxy+url; 
the_link.open('GET', furl, false);
the_link.onload = function() {
  
  var x = this.response.split("title");
  let fartist = x[5].substr(2,18).split('"');
  let fartist1 = x[11].substr(2,20).split('"');
  let fartist2 = x[17].substr(2,20).split('"');

  fartist = fartist[0];
  fartist1 = fartist1[0];
  fartist2 = fartist2[0];
  //console.log(fartist,fartist1,fartist2);
  artist = fartist;
  
  var li_ele = document.createElement("LI");
  var li1_ele = document.createElement("LI");
  var li2_ele = document.createElement("LI");
  let textn = document.createTextNode(fartist);
  let textn1 = document.createTextNode(fartist1);
  let textn2 = document.createTextNode(fartist2);
  let check = 'Kuwait" ';
    console.log(textn,textn1,textn2 , list);
  //console.log(textn.textContent);
  if (textn.textContent == 'Kuwait"'){
   // console.log("if" , 'Kuwait"');
    textn1.textContent == "sorry not serving this country"
    textn2.textContent == "sorry not serving this country"
    textn3.textContent == "sorry not serving this country"
  li_ele.appendChild(textn)
  li1_ele.appendChild(textn1)
  li2_ele.appendChild(textn2)
  list.appendChild(li_ele);
  list.appendChild(li1_ele);
  list.appendChild(li2_ele);
  }
  else {
    //console.log("else");
   // console.log(textn.textContent , check);
  li_ele.appendChild(textn)
  li1_ele.appendChild(textn1)
  li2_ele.appendChild(textn2)
  list.appendChild(li_ele);
  list.appendChild(li1_ele);
  list.appendChild(li2_ele);
  }
}

the_link.send();

}
function switch1(country){
  var selec = document.getElementById("wiki").value;
  if (selec == "wik") {
    music()
    return crawlwiki(country)

  }
  else if (selec == "pop")
  {
    
    return crawlpop(country)
  }
  //crawlwiki(country);
}
function music(){
  var proxy = "https://cors-anywhere.herokuapp.com/";
  var the_link = new XMLHttpRequest();
  var url = "https://api.deezer.com/search?q="+artist;
  the_link.open('GET', proxy+url, false);
  the_link.onload = function() {
    //artist = artist.toString();

    var data = JSON.parse(this.response);
    data = data.data[1].link;
    data = data.split("track");
    data = data[1];
    data = data.split("/");
    data = data[1];
    var x = document.getElementById("music");
    x.setAttribute("src" , "https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=400&height=100&color=ff0000&layout=dark&size=medium&type=tracks&id="+data+"&app_id=1" );
    x.
    console.log( data,typeof(data), artist);

}
// Send request to the server asynchronously
the_link.send();
}
