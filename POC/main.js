const initialCoordinates = { lat: 7.549333004, lng: -1.197379008 };
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const points_ab = { p_a: null, p_b: null };

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
    { city: "HO", dmsLat: '6.6101° N', dmsLng: '0.4785° E', abbr: "VR", region: "Volta" }
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
        mapTypeId: 'roadmap', //  roadmap, satellite, hybrid, terrain
    });

    // Add a marker at the center of the map.
    addMarker(coordinates, map, 'Center', {});
    plotCordinates(capitalCities, map, addMarker);

    // Reinitialize object prop
    points_ab.p_a = null, points_ab.p_b = null;
    let countClicks = 0;

    map.addListener("click", (event) => {
        countClicks++;

        console.log({ countClicks })
        let lat = event.latLng.lat(), lng = event.latLng.lng();

        let userLocation = countClicks === 3 ? initialCoordinates : null, rectangle = null;

        if (countClicks === 1) points_ab.p_a = { lat, lng }
        if (countClicks === 2) points_ab.p_b = { lat, lng }

        if (points_ab.p_a && points_ab.p_b) {
            rectangle = new google.maps.Rectangle({
                strokeColor: "#00FFC8",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#6CDBC3",
                fillOpacity: 0.35,
                map,
                bounds: {
                    north: points_ab.p_b.lat,
                    south: points_ab.p_a.lat,
                    east: points_ab.p_b.lng,
                    west: points_ab.p_a.lng,
                },
            });

            // If count is 3 then run the check 
            if (countClicks >= 3) {
                //const resultColor = google.maps.geometry.poly.containsLocation(userLocation, rectangle);
                console.log(userLocation)
                const resultColor = rectangle.getBounds().contains(userLocation);
                console.log({ resultColor })
            }
        }

        if (!(countClicks >= 3))
            addMarker(event.latLng, map, '', {});
    });
}
// Adds a marker to the map.
function addMarker(location, map, label, options) {
    let goggleOptions = {
        position: location,
        map: map,
        visible: true
    }

    if (label) goggleOptions.label = { text: label, color: "white", fontSize: "12px", fontWeight: "bold" }

    const marker = new google.maps.Marker(goggleOptions);

    if (options.data) {
        marker.addListener("mouseover", () => {
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
            callback({ lat: coords[0], lng: coords[1] }, map, item.abbr, { data: item });
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

       /*
            // Define a Rectangle object.
var rectangle = ee.Geometry.Rectangle(-122.09, 37.42, -122.08, 37.43);

// Define other inputs.
var inputGeom = ee.Geometry.Point(-122.090, 37.423);

// Apply the withinDistance method to the Rectangle object.
var rectangleWithinDistance = rectangle.withinDistance({'right': inputGeom, 'distance': 500, 'maxError': 1});

// Print the result to the console.
print('rectangle.withinDistance(...) =', rectangleWithinDistance);

// Display relevant geometries on the map.
Map.setCenter(-122.085, 37.422, 15);
Map.addLayer(rectangle,
             {'color': 'black'},
             'Geometry [black]: rectangle');
Map.addLayer(inputGeom,
             {'color': 'blue'},
             'Parameter [blue]: inputGeom');
            */