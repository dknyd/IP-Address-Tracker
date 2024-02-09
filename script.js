const IPAddressContainer = document.querySelector('.IPAddress');
 const loc = document.querySelector('.location');
 const timeZone = document.querySelector('.timezone');
 const isp = document.querySelector('.isp');
 const ipInput = document.querySelector('input');
 const buttonSearch = document.querySelector('.icon__arrow');
 let map;
 
//GET IP ADDRESS FUNCTION - WITH IPIFY
let ipAddress;
function getIpAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            console.log('Your public IP address is:', data.ip);
            ipAddress = data.ip;
            return ipAddress; // Return the ipAddress value
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });
}

//SET MAP FUNCTION
function setMap(lat, long){
    if (!map) { // Check if the map is already initialized
        map = L.map('map').setView([lat, long], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        map.setView([lat, long], 13); // Update map view if it's already initialized
    }
    // Add or update marker
    let marker = L.marker([lat  - 0.002, long]);
    marker.addTo(map);
}

//SELF LOCATION DATA 
function getLocationData() {
    getIpAddress()
        .then(ipAddress => {
            return fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9wwtDET17rvBGZH24FRHXUHIIlKaU&ipAddress=${ipAddress}`);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //get the data to the screen
            IPAddressContainer.innerHTML = data.ip;
            loc.innerHTML = `${data.location.city}, ${data.location.country}`;
            timeZone.innerHTML =`UTC ${data.location.timezone}`;7
            isp.innerHTML = data.isp;
            //call setMAP() to set map to the current location
            setMap(data.location.lat, data.location.lng)
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });
}

getLocationData();

//PUT LOCATION DATA TO THE SCREEN FUNCTION
function outputLocationData(webAddress) {
    fetch(webAddress)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            //get the data to the screen
            IPAddressContainer.innerHTML = data.ip;
            loc.innerHTML = `${data.location.region}, ${data.location.country}`;
            timeZone.innerHTML =`UTC ${data.location.timezone}`;7
            isp.innerHTML = data.isp;
            //call setMAP() to set map to the current location
            setMap(data.location.lat, data.location.lng)
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });
}

//SEARCH BASED ON IP ADDRESS
function searchBasedOnIp(ipAddress){
    console.log(ipAddress);
}

buttonSearch.addEventListener('click', function() {
    outputLocationData(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9wwtDET17rvBGZH24FRHXUHIIlKaU&ipAddress=${ipInput.value}`)
})


 