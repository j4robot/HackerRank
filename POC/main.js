const initialCoordinates = { lat: 7.549333004, lng: -1.197379008 }, points_ab = { p_a: null, p_b: null };
let map = null, infowindow = null, rectangle = null, markers = [], countClicks = 0;;


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

var initMap = function () {
    initializeMap(initialCoordinates);
}

const initializeMap = (coordinates) => {

    infowindow = new google.maps.InfoWindow({ maxWidth: 200 });

    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 7,
        mapTypeId: 'roadmap', //  roadmap, satellite, hybrid, terrain
    });

    // Add a marker at the center of the map.
    addMarker(coordinates, map, 'Center', {});
    plotCordinates(capitalCities, map, addMarker);



    map.addListener("click", (event) => {
        countClicks++;

        let lat = event.latLng.lat(), lng = event.latLng.lng();

        console.log({ lat, lng });

        if (countClicks === 1) points_ab.p_a = { lat, lng }
        if (countClicks === 2) points_ab.p_b = { lat, lng }

        if (points_ab.p_a && points_ab.p_b) {

            rectangle = new google.maps.Rectangle();

            rectangle.setOptions({
                strokeColor: "#00FFC8",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#6CDBC3",
                fillOpacity: 0.35,
                map,
                editable: true,
                bounds: {
                    north: points_ab.p_b.lat,
                    south: points_ab.p_a.lat,
                    east: points_ab.p_b.lng,
                    west: points_ab.p_a.lng,
                },
            });
        /*
            if (markers) {
                let bounds = new google.maps.LatLngBounds();
                let markerz = markers.filter(x => x.keyz === 'rect');
                markerz.forEach((x, i) => {
                    console.log(x.marker.position)
                    bounds.extend(x.marker.position);
                });

                //now fit the map to the newly inclusive bounds
                map.setZoom(7);
                map.setCenter(bounds.getCenter());
                map.fitBounds(bounds);
            }

            */

        }

        if (!(countClicks >= 3))
            addMarker(event.latLng, map, '', { key: 'rect', pushMarker: true });
    });

    document.querySelector('#btn--run--check').addEventListener("click", () => {
        let lat = document.querySelector('#txt--lat').value;
        let lng = document.querySelector('#txt--lng').value;

        if (!lat.trim()) {
            alert('No latitude');
            return
        }

        if (!lng.trim()) {
            alert('No longitude');
            return
        }

        lat = Number(lat), lng = Number(lng);

        if (countClicks >= 2 && lat && lng) {
            const bounds = rectangle.getBounds();//.contains(userLocation);

            //http://jsfiddle.net/geocodezip/aom5o2o5/
            let NE = bounds.getNorthEast();
            //let NEmark = new google.maps.Marker({ map, position: NE, title: "NE" });
            let SW = bounds.getSouthWest();
            //let SWmark = new google.maps.Marker({ map, position: SW, title: "SW" });
            // North West
            let NW = new google.maps.LatLng(NE.lat(), SW.lng());
            //let NWmark = new google.maps.Marker({ map, position: NW, title: "NW" });
            // South East
            let SE = new google.maps.LatLng(SW.lat(), NE.lng());
            //let SEmark = new google.maps.Marker({ map, position: SE, title: "SE" });

            let polygon = new google.maps.Polygon({
                map, paths: [[NE, NW, SW, SE]],
                strokeOpacity: 0.0,
                strokeWeight: 0,
                fillColor: "#F3F3F300",
                fillOpacity: 0.0,
            });

            let curPosition = new google.maps.LatLng(lat, lng);
            const resultColor = google.maps.geometry.poly.containsLocation(curPosition, polygon);

            // resultColor ? addMarker({ lat, lng }, map, '', { key: 'rect', pushMarker: true }) : alert('Not in defined area');
            if (resultColor) {
                addMarker({ lat, lng }, map, 'A+', { key: 'rect', pushMarker: true })

            } else {
                alert('Not in defined area');
            }

        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#btn--run--reset').addEventListener("click", function () {
        //initializeMap(initialCoordinates);
        if (rectangle && markers.length > 0) {
            markers.forEach(x => x.keyz === 'rect' ? x.marker.setMap(null) : null);
            markers = markers.filter(x => x.keyz !== 'rect');
            //map.setCenter(initialCoordinates);
           // map.setZoom(7);
            points_ab.p_a = null, points_ab.p_b = null;
            countClicks = 0, rectangle.setMap(null), rectangle = null;
        }
    });
});

// Adds a marker to the map.
function addMarker(location, map, label, options) {
    let goggleOptions = {
        position: location,
        map: map,
        visible: true
    }

    if (label) goggleOptions.label = { text: label, color: "white", fontSize: "12px", fontWeight: "bold" }

    const marker = new google.maps.Marker(goggleOptions);

    if (options.pushMarker) markers.push({ keyz: options.key ? options.key : '!', marker });

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
            item.coords = { lat: coords[0], lng: coords[1] }
            callback(item.coords, map, item.abbr, { data: item });
        });
    }
}

function getRegionObjectData(info) {
    var contentString = `<div>
        <div id="">
        <h5 style="color: red;"><b>${info.region.toUpperCase()}</b></h5>
        <ul style="list-style: none; padding:0px;">
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Capital: </b>${info.city}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">DMS: </b>${info.dmsLat}, ${info.dmsLng}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">DMS Latitude: </b>${info.dmsLat}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">DMS Longitude: </b>${info.dmsLng}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Latitude: </b>${info.coords.lat}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Longitude: </b>${info.coords.lng}</a></li>
        <li><a href="#"></a></li>
        <ul>   
        </div >
        </ul>
        </div>
        </div>`;

    return contentString;
}