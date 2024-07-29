function getLocation() {
    const status = document.getElementById('status');

    if (navigator.geolocation) {
        status.textContent = 'Getting location...';
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        status.textContent = 'Geolocation is not supported by this browser.';
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Ensure valid coordinates
    if (isFinite(latitude) && isFinite(longitude)) {
        document.getElementById('status').textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        initMap(latitude, longitude);
    } else {
        document.getElementById('status').textContent = 'Invalid coordinates.';
    }
}

function showError(error) {
    const status = document.getElementById('status');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            status.textContent = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            status.textContent = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            status.textContent = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            status.textContent = 'An unknown error occurred.';
            break;
    }
}

function initMap(latitude, longitude) {
    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
}
