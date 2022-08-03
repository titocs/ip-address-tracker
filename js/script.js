var ipAddress = document.getElementById("input-ip-address");
var apiKey = "at_eowKc8YqImecR4h7cPtxGHWKrc6sn";
var url = "https://geo.ipify.org/api/v1";
const buttonSubmit = document.getElementById("search-button");

var ipaddress = document.getElementById("ip-address");
var locationData = document.getElementById("location-data");
var timezoneData = document.getElementById("timezone-data");
var ispData = document.getElementById("isp-data");

const mapContainer = document.querySelector(".map-container");
var latitude;
var longitude;

buttonSubmit.addEventListener("click", function(e){
    e.preventDefault();
    var ipAddressValue = ipAddress.value;
    var xhr = new XMLHttpRequest();
    if(ipAddressValue.length === 0){
        alert("Please insert IP Address first");
        return;
    }

    // cek kesiapan ajax
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            mapContainer.innerHTML = `<div id="map" class="h-screen lg:h-[calc(100vh-224px)]"></div>`;
            responseData = xhr.responseText;
            geoLocationData = JSON.parse(responseData);
            
            ipaddress.innerText = geoLocationData["ip"];
            locationData.innerText = geoLocationData["location"]["city"] + ' , ' + geoLocationData["location"]["region"];
            timezoneData.innerText = 'UTC ' + geoLocationData["location"]["timezone"];
            ispData.innerText = geoLocationData["isp"];

            latitude = geoLocationData["location"]["lat"];
            longitude = geoLocationData["location"]["lng"];
            
            var map = L.map('map').setView([latitude, longitude], 11);
            

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);
            
            var marker = L.marker([latitude, longitude]).addTo(map);
        }
    }

    // eksekusi ajax
    xhr.open('GET', `${url}?apiKey=${apiKey}&ipAddress=${ipAddressValue}`, true);
    xhr.send();
})
