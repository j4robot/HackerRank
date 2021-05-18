const initialCoordinates = { lat: 7.549333004, lng: -1.197379008 };
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0, activeInfoWindow = null;

const capitalCities = [
    { city: "KUMASI", dmsLat: '6.6666° N', dmsLng: '1.6163° W', abbr: "AR", region: "Ashanti" },
    { city: "CAPE COAST", dmsLat: '5.1315° N', dmsLng: '1.2795° W', abbr: "CR", region: "Central" },
    { city: "SUNYANI", dmsLat: '7.3349° N', dmsLng: '2.3123° W', abbr: "BAR", region: "Brong Ahafo" },
    { city: "ACCRA", dmsLat: '5.6037° N', dmsLng: '0.1870° W', abbr: "GR", region: "Greater Accra" },
    { city: "KOFORIDUA", dmsLat: '6.0784° N', dmsLng: '0.2714° W', abbr: "ER", region: "Eastern" },
    { city: "TAMALE", dmsLat: '9.4034° N', dmsLng: '0.8424° W', abbr: "NR", region: "Northern" },
    { city: "TAKORADI", dmsLat: '4.9016° N', dmsLng: '1.7831° W', abbr: "WR", region: "Western" },
    { city: "WA", dmsLat: '10.0601° N', dmsLng: '2.5099° W', abbr: "UWR", region: "Upper West" },
    { city: "BOLGATANGA", dmsLat: '10.7875° N', dmsLng: '0.8580° W', abbr: "UER", region: "Upper East" },
    { city: "HO", dmsLat: '6.6101° N', dmsLng: '0.4785° E', abbr: "VR", region: "Volta" },
];

// capitalCities.forEach(x => {
//     var point = new GeoPoint(parseInt(x.lng), parseInt(x.lat));
//     let s = { city: x.city, lng: point.getLonDeg(), lat: point.getLatDeg() }
//     console.log(s);
// });

var initMap = function () {
    initializeMap(initialCoordinates);
}

let infowindow = null;
const initializeMap = (coordinates) => {

    infowindow = new google.maps.InfoWindow({ maxWidth: 200 });

    const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 7,
        mapTypeId: 'terrain',
    });

    // Add a marker at the center of the map.
    addMarker(coordinates, map, '', {});

    plotCordinates(capitalCities, map, addMarker)
}
// Adds a marker to the map.
function addMarker(location, map, label, options) {
    let goggleOptions = {
        position: location,
        map: map,
        visible: true
    }

    if(label)goggleOptions.label =  { text: label, color: "white", fontSize: "12px", fontWeight: "bold" }

    const marker = new google.maps.Marker(goggleOptions);

    if(options.data){
        marker.addListener("click", () => {
            infowindow.setContent(getRegionObjectData(options.data));
            infowindow.open(map, marker);
          });
    }
}


function plotCordinates(data, map, callback) {
    if (data && data.length > 0) {
        
        data.forEach(item => {
            /** Convert dms to lat & long */
            let coords = parseGPS(`${item.dmsLat}, ${item.dmsLng}`);
            callback({ lat: coords[0], lng: coords[1] }, map, item.abbr, {data: item});
        });
    }
}

var getRegionObjectData = function (info) {
    var contentString = `<div>
        <div id="">
        <h5 style="color: red;"><b>${info.region.toUpperCase()}</b></h5>
        <ul style="list-style: none; padding:0px;">
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Capital: </b>${info.city}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">DMS: </b>${info.dmsLat}, ${info.dmsLng}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">DMS Latitude: </b>${info.dmsLat}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">DMS Longitude: </b>${info.dmsLng}</a></li>
        
        <li><a href="#"></a></li>
        <ul>   
        </div >
        </ul>
        </div>
        </div>`;

    return contentString;
}