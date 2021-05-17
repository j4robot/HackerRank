const initialCoordinates = { "lat": 7.549333004, "long": -1.197379008 };
let map = null;

var initMap = function () {
    initializeMap(initialCoordinates.lat, initialCoordinates.long);
}

var initializeMap = function (initLatitude, initLongitude) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: initLatitude, lng: initLongitude },
        zoom: 7,
        mapTypeId: 'terrain',
    });
}