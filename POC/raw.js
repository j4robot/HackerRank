var map;
var data = [];
var poly;
var markers = [];
var regionMarkers = [];
var closestLocations = [];
var initialCoordinates = { "lat": 7.549333004, "long": -1.197379008 };
var distanceMarkers = [];
var apiResponse = [];
var activeInfoWindow;
var ServiceURL;

const capitalCities = [
    { city: "KUMASI", lat: "6.792779393745608", lng: "-1.886225232790048", abbr: "AR", region: "Ashanti", totalOutlets: 0 },
    { city: "CAPE COAST", lat: "4.930134597908729", lng: "-1.275739545075794", abbr: "CR", region: "Central", totalOutlets: 0 },
    { city: "SUNYANI", lat: "7.136253423570669", lng: "-2.313176832408658", abbr: "BAR", region: "Brong Ahafo", totalOutlets: 0 },
    { city: "ACCRA", lat: "5.403500755828165", lng: "-0.18597019079402344", abbr: "GR", region: "Greater Accra", totalOutlets: 0 },
    { city: "KOFORIDUA", lat: "6.1782173649401665", lng: "-0.27053332776495154", abbr: "ER", region: "Eastern", totalOutlets: 0 },
    { city: "TAMALE", lat: "9.20250419568835", lng: "-0.8367409341319672", abbr: "NR", region: "Northern", totalOutlets: 0 },
    { city: "TAKORADI", lat: "4.904203000000001", lng: "-1.759872", abbr: "WR", region: "Western", totalOutlets: 0 },
    { city: "WA", lat: "10.059979160117981", lng: "-2.5077844369504874", abbr: "UWR", region: "Upper West", totalOutlets: 0 },
    { city: "BOLIGATANGA", lat: "10.482514358683398", lng: "-0.8544733623684806", abbr: "UER", region: "Upper East", totalOutlets: 0 },
    { city: "HO", lat: "6.409262159546296", lng: "0.4781930231876004", abbr: "VR", region: "Volta", totalOutlets: 0 },
];

$(document).ready(function () {
    initMap();
});

var initMap = function () {
    getDataFromAPI();
    initializeMap(initialCoordinates.lat, initialCoordinates.long);
}

var initializeMap = function (initLatitude, initLongitude) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: initLatitude, lng: initLongitude },
        zoom: 7,
        mapTypeId: 'terrain',
    });
}

var getDataFromAPI = function () {
    var request = new XMLHttpRequest();
    //'http://psl-app-vm3/NPAServices/api/RetailOutlet/GetConsolidatedClaims?szFilter=*'
    var url = ServiceURL + "api/RetailOutlet/GetConsolidatedClaims?szFilter=*";
    //http://iml.npa-enterprise.com/NPAWEBAPI/api/RetailOutlet/GetConsolidatedClaims?szFilter=*

    request.open('GET', url, true);

    //request.timeout = 5000;
    request.onreadystatechange = function () {

        if (request.readyState === 4) {

            if (request.status === 200) {
                if (apiResponse.length == 0) {
                    apiResponse = JSON.parse(this.response);
                    console.log(apiResponse.length);
                    for (var i = 0; i < apiResponse.length; i++) {
                        if (apiResponse[i].dLatitude != 0 && apiResponse[i].dLongitude != 0 && apiResponse[i].dLatitude != null && apiResponse[i].dLongitude != null && apiResponse[i].szCode != "RET00080" &&
                            apiResponse[i].szCode != "RET01343" && apiResponse[i].szCode != "RET00030" && apiResponse[i].szCode != "RET00088" && apiResponse[i].szCode != "RET03249"
                            && apiResponse[i].szCode != "RET00067" && apiResponse[i].szCode != "RET00108" && apiResponse[i].szCode != "RET00111" && apiResponse[i].szCode != "RET01318"
                            && apiResponse[i].szCode != "RET02623" && apiResponse[i].szCode != "RET01701" && apiResponse[i].szCode != "RET03486" && apiResponse[i].szCode != "RET01680"
                            && apiResponse[i].szCode != "RET03469" && apiResponse[i].szCode != "RET02037" && apiResponse[i].szCode != "RET03357" && apiResponse[i].szCode != "RET00207" && apiResponse[i].szCode != "RET00313" && apiResponse[i].szCode != "RET00207") {

                            data.push(apiResponse[i]);
                        }
                    }

                    getTotalOutletsByRegion(data, loadInitialMap);
                }
            }
        }
    }

    request.send();
}

var getTotalOutletsByRegion = function (outlets, callback) {

    capitalCities.forEach(function (element) {
        var filterArray = $.grep(outlets, function (dt) {
            return dt.szRegion === element.region;
        });
        element.totalOutlets = filterArray.length;
    });

    callback();

}

var loadInitialMap = function () {

    var infowindow = new google.maps.InfoWindow({ maxWidth: 200 });
    var icon;
    var marker;

    for (var i = 0; i < capitalCities.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(capitalCities[i].lat, capitalCities[i].long),
            map: map,
            scaledSize: new google.maps.Size(25, 25),
            icon: icon,
            icon: "Images/m3.png",
            visible: true,
            label: { text: capitalCities[i].abbr, color: "white", fontSize: "12px", fontWeight: "bold" }
        });

        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
            return function () {
                if (activeInfoWindow) { activeInfoWindow.close(); }
                infowindow.setContent(getRegionObjectData(capitalCities[i]));
                infowindow.open(map, marker);
                activeInfoWindow = infowindow;
            }
        })(marker, i));

        regionMarkers.push(marker);

        marker.setMap(map);
    }
}

var loadLocations = function (locationsData, zoom) {
    var infowindow = new google.maps.InfoWindow({ maxWidth: 200 });
    var icon;
    var marker;

    setMarkersToDefault();

    for (var i = 0; i < locationsData.length; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationsData[i].dLatitude, locationsData[i].dLongitude),
            map: map,
            scaledSize: new google.maps.Size(25, 25),
            icon: icon,
            visible: true
        });

        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
            return function () {
                if (activeInfoWindow) { activeInfoWindow.close(); }
                infowindow.setContent(getobjectData(locationsData[i]));
                infowindow.open(map, marker);
                activeInfoWindow = infowindow;
            }
        })(marker, i));

        google.maps.event.addListener(marker, 'rightclick', (function (marker, i) {
            return function () {
                if (activeInfoWindow) { activeInfoWindow.close(); }
                infowindow.setContent(getobjectDataRightClick(locationsData[i]));
                infowindow.open(map, marker);
                activeInfoWindow = infowindow;
            }
        })(marker, i));

        markers.push(marker);

        marker.setMap(map);
    }

    zoom();
}

var setMarkersToDefault = function () {
    if (markers.length > 0) {
        markers = [];
    }
};

var getRegionObjectData = function (info) {
    var region = info.region.toString();
    var contentString = `<div id="">
        <div id="">
        <h5 style="color: red;"><b>${info.region.toUpperCase()}</b></h5>
        <ul style="list-style: none; padding:0px;">
        <li><a style="text-decoration:none" href="#"><b style="color: black;">No. of Outlets: </b>${info.totalOutlets}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Capital: </b>${info.city}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Latitude: </b>${info.lat}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Longitude: </b>${info.long}</a></li>
        <li><a href="#"></a></li>
        <li style="margin-top: 2px; margin-bottom: 2px;" id="buttonPlaceHolder"><a class="btn btn-primary btn-xs" onclick="loadRegionMarkers('${region}')">View Region</a></li>
        <ul>   
        </div >
        </ul>
        </div>
        </div>`;

    return contentString;
}

var getobjectData = function (info) {

    var today = new Date(info.dLicenseDate);
    var todayString = today.toString();

    var day = todayString.substring(8, 10);
    var month = todayString.substring(4, 7);
    var year = todayString.substring(10, 16);
    var licenseDate = day + ' / ' + month + ' /' + year

    var contentString = `<div id="">
        <div id="">
        <h5 style="color: red;"><b>${info.szName}</b></h5>
        <ul style="list-style: none; padding:0px;">
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Code: </b>${info.szCode}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Town: </b>${info.szTown}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Outlet Type: </b>${info.szOutletType}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Region: </b>${info.szRegion}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Latitude: </b>${info.dLatitude}</a></li>
        <li><a style="text-decoration:none" href="#"><b style="color: black;">Longitude: </b>${info.dLongitude}</a></li>
        <li><a href="#"></a></li>
        <li style="margin-top: 2px; margin-bottom: 2px;" id="buttonPlaceHolder"><a class="btn btn-primary btn-xs" onclick="showMoreDetails()">View more</a></li>
        <div id="myDIV" style="display:none;">
        <ul style="list-style: none; padding:0px;">
        <li><a href="#" style="text-decoration:none"><b style="color: black;">Operator\'s Name: </b>${info.szOperatorName}</a></li>
        <li><a href="#" style="text-decoration:none"><b style="color: black;">District: </b>${info.szMMDA}</a></li>
        <li><a href="#" style="text-decoration:none"><b style="color: black;">Sponsoring PPMC: </b>${info.szSponsoringOmc}</a></li>
        <li><a href="#" style="text-decoration:none"><b style="color: black;">License Date: </b>${licenseDate}</a></li>
        <li><a href="#" style="text-decoration:none"><b style="color: black;">Outlet Status: </b>${info.szStatus}</a></li>
        <ul>
        </div >
        </ul>
        </div>
        </div>`;

    return contentString;
}

var showMoreDetails = function () {
    var x = document.getElementById("myDIV");
    var y = document.getElementById("buttonPlaceHolder");
    y.style.display = "none";

    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

var getobjectDataRightClick = function (info) {
    var url = "http://psl-app-vm3/NPAServices/Home/CreateGISOutletRetailReport?lngCompanyId=1&szITSfromPersol=Persol&strGroupBy=" + info.szCode + "&strGroupBy1=&strQuery1=&strQuery2=&strQuery3=&strQuery4=&strPicHeight=&strPicWeight=&iUserId=20009&iAppId=4";
    console.log("Link: ", url);
    var contentString = `<div id="">
        <ul id="menu" style="list-style: none; padding:0px;"><br>
        <li><a href="${url}" target="_blank"><span class="glyphicon glyphicon-paperclip"></span>&nbsp;Outlet Report</a></li>
        <li><a href="#">View Details</a></li>
        <li><a href="#">Update Details</a></li>
        <li><a href="#">Delete Details</a></li>
        </ul>
        </div>`;

    return contentString;
}

var getDistanceInfo = function (distance) {
    var contentString = '<div id="">' +
        '<div id="">' +
        '<h5 style="color: black;"><b>Distance</b></h5>' +
        '<ul style="list-style: none; padding:0px;">' +
        '<li><a style="text-decoration:none" href="#"><b style="color: black;">Value: </b>' + distance.toFixed(2) + ' m</a></li>' +
        '</ul>';

    return contentString;
}

var initializeMapForRegion = function () {
    poly = new google.maps.Polyline({
        auto_id: i,
        strokeColor: 'purple',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    map.addListener('click', computeDistance);

    poly.setMap(map);
}

var zoomIntoLocation = function () {
    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }

    map.setCenter(bounds.getCenter());

    google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
        this.setZoom(map.getZoom());
    });

    map.fitBounds(bounds);
}

var filterData = function () {
    var regionData = data;
    var filterResponse = [];
    var filteredDataDistricts = [];

    return {

        byRegion: function (selectedValue) {
            if (filterResponse.length > 0) {
                filterResponse = [];
            }
            for (var i = 0; i < regionData.length; i++) {
                if (selectedValue == regionData[i].szRegion) {
                    filterResponse.push(regionData[i]);
                }
            }

            clearOverlays();
            initializeMapForRegion();
            loadLocations(filterResponse, zoomIntoLocation);
        },
        byDistrict: function (selectedValue) {
            if (filteredDataDistricts.length > 0) {
                filteredDataDistricts = [];
            }
            for (var i = 0; i < filterResponse.length; i++) {
                if (selectedValue == filterResponse[i].szMMDA) {
                    filteredDataDistricts.push(filterResponse[i]);
                }
            }

            clearOverlays();
            loadLocations(filteredDataDistricts, zoomIntoLocation);
        }
    }
}();

var clearOverlays = function () {
    if (markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
            markers[i].setVisible(false);
        }

        markers.length = 0;
    }

}

var getDistrictData = function (districtID) {
    var request = new XMLHttpRequest();
    var districtData;
    var url = ServiceURL + "api/District?iRegionID=" + districtID; //"http://psl-app-vm3:80/NPAServices/api/District?iRegionID=10";
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {

            if (request.status === 200) {
                districtData = JSON.parse(this.response);
                loadDistrictSelectBox(districtData);
            }
        }
    }
    request.send();
}

var loadDistrictSelectBox = function (districts) {
    $('#districtsList').replaceWith('<div class="col-md-12" id="districtsList"></div>');

    var output = "";
    var selectBoxHeader = '<select class="form-control capitalize form-cascade-control" id="districts" style="width: 90%; height: 40px; font-size: 15px;"><option value = "districts">Districts</option>';

    for (var i = 0; i < districts.length; i++) {
        output = output + '<option value="' + districts[i].szName + '">' + districts[i].szName + '</option>'
    }

    output = output + '</select>';

    selectBoxHeader = selectBoxHeader + output;

    $("#districtsList").html(selectBoxHeader);

    document.getElementById('districts').addEventListener("change", function () {
        var selectedValue = this.value
        filterData.byDistrict(selectedValue);
    })
}

var loadDistricts = function (selectedValue) {
    var districtID;

    switch (selectedValue) {
        case "Ashanti":
            districtID = 1;
            break;
        case "Upper East":
            districtID = 2;
            break;
        case "Volta":
            districtID = 3;
            break;
        case "Greater Accra":
            districtID = 4;
            break;
        case "Brong Ahafo":
            districtID = 5;
            break;
        case "Northern":
            districtID = 6;
            break;
        case "Upper West":
            districtID = 7;
            break;
        case "Central":
            districtID = 10;
            break;
        case "Eastern":
            districtID = 8;
            break;
        case "Western":
            districtID = 9;
            break;
    }

    getDistrictData(districtID);
}

var computeDistance = function (event) {
    var infowindow = new google.maps.InfoWindow();
    var path = poly.getPath();
    var distance = 0;
    var polyMarkers = [];
    var iconImage = 'Images/distancepin.png';
    //var iconImage = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

    var mouseOverAction = function () {
        if (activeInfoWindow) { activeInfoWindow.close(); }
        infowindow.setContent(getDistanceInfo(distance));
        infowindow.open(map, marker);
        console.log(marker.getPosition().toString());
        activeInfoWindow = infowindow;
    }

    var removeLineAction = function () {
        path.clear();
        for (var i = 0; i < polyMarkers.length; i++) {
            polyMarkers[i].setVisible(false);
        }
        if (activeInfoWindow) { activeInfoWindow.close(); }
        document.getElementById('info').value = 0.00;
        document.getElementById("distanceMatrix").style.display = "none";
    }

    document.getElementById("distanceMatrix").style.display = "block";
    path.push(event.latLng);

    for (var i = 0; i < path.getLength() - 1; i++) {
        distance += google.maps.geometry.spherical.computeDistanceBetween(path.getAt(i), path.getAt(i + 1));
    }

    var marker = new google.maps.Marker({
        position: event.latLng,
        icon: iconImage,
        map: map
    })

    google.maps.event.addListener(marker, 'mouseover', mouseOverAction);

    polyMarkers.push(marker);

    document.getElementById('info').value = distance.toFixed(2) + " m";

    document.getElementById('removeLine').addEventListener("click", removeLineAction);
};

var loadRegionMarkers = function (selectedValue) {
    filterData.byRegion(selectedValue);
    loadDistricts(selectedValue);
    $("#regions").val(selectedValue)
    if (regionMarkers) {
        for (var i = 0; i < regionMarkers.length; i++) {
            regionMarkers[i].setMap(null);
            //setVisible(false);
        }
    }
};

document.getElementById('regions').addEventListener("change", function () {
    var selectedValue = this.value
    loadRegionMarkers(selectedValue);
});

