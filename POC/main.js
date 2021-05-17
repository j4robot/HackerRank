const initialCoordinates = { lat: 7.549333004, lng: -1.197379008 };
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

const capitalCities = [{ city: "KUMASI", lat: "6.392779393745608", lng: "-1.786225232790048", abbr: "AR", region: "Ashanti", totalOutlets: 0 },
{ city: "CAPE COAST", lat: "4.930134597908729", lng: "-1.275739545075794", abbr: "CR", region: "Central", totalOutlets: 0 },
{ city: "SUNYANI", lat: "7.136253423570669", lng: "-2.313176832408658", abbr: "BAR", region: "Brong Ahafo", totalOutlets: 0 },
{ city: "ACCRA", lat: "5.403500755828165", lng: "-0.18597019079402344", abbr: "GR", region: "Greater Accra", totalOutlets: 0 },
{ city: "KOFORIDUA", lat: "6.1782173649401665", lng: "-0.27053332776495154", abbr: "ER", region: "Eastern", totalOutlets: 0 },
{ city: "TAMALE", lat: "9.20250419568835", lng: "-0.8367409341319672", abbr: "NR", region: "Northern", totalOutlets: 0 },
{ city: "TAKORADI", lat: "4.9025510246054305", lng: "-2.2795751841658785", abbr: "WR", region: "Western", totalOutlets: 0 },
{ city: "WA", lat: "10.059979160117981", lng: "-2.5077844369504874", abbr: "UWR", region: "Upper West", totalOutlets: 0 },
{ city: "BOLIGATANGA", lat: "10.482514358683398", lng: "-0.8544733623684806", abbr: "UER", region: "Upper East", totalOutlets: 0 },
{ city: "HO", lat: "6.409262159546296", lng: "0.4781930231876004", abbr: "VR", region: "Volta", totalOutlets: 0 },
];

var initMap = function () {
    initializeMap(initialCoordinates);
}

const initializeMap = (coordinates) => {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 7,
        mapTypeId: 'terrain',
    });

    // Add a marker at the center of the map.
    addMarker(coordinates, map);

    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
    });

    plotCordinates(capitalCities, map, addMarker)
}

// Adds a marker to the map.
function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
        position: location,
        //label: labels[labelIndex++ % labels.length], 4.9016° N, 1.7831° W
        map: map,
    });
}


function plotCordinates(data, map, marker){
    if(data &&  data.length > 0){
        data.forEach(item => marker({lat: parseInt(item.lat), lng: parseInt(item.lng)}, map))
    }
}