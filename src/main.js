const VANILLA_APP_API_KEY="at_7fWiLbH2c8My4AwIneV2KnPr8tUT9";
const form = document.getElementById("formIp");
const searchIp = document.getElementById("searchIp");

// Show information
const ip = document.getElementById("ip");
const locationEl = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");


//VARIABLES

let apiDefault = "149.232.141.70";
let latitude; // Latitude of searched IP location
let longitude; // Longitude of searched IP location
let map = null; // Leaflet map instance


const iconPoint = L.icon({
    iconUrl: '/assets/images/icon-location.svg',
    iconSize: [40, 45],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([0, 0], { icon: iconPoint }).addTo(map);



function showInformation(data) {
    ip.textContent = data.ip;
    locationEl.textContent = data.location.city + ", " + data.location.country;
    timezone.textContent = `UTC - ${data.location.timezone.replace("-", "")}`;
    isp.textContent = data.isp;
}



async function getInformation(ip) {
  const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${VANILLA_APP_API_KEY}&ipAddress=${ip}`);
  const data = response.ok ? await response.json() : null;
  if (data) {
    apiDefault = data.ip;
    latitude = data.location.lat;
    longitude = data.location.lng;
    console.log(data);
    showInformation(data);
    map.setView([latitude, longitude], 13);
    marker.setLatLng([latitude, longitude]);
  }
  
}


const verifyIp = (ip) => {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip)
}

const handleSearchIp = (event) => {
    event.preventDefault();
    const ipInput = searchIp.value.trim();
    if (verifyIp(ipInput)) {
        getInformation(ipInput);
    }
}

form.addEventListener("submit", handleSearchIp);
