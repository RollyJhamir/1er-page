function updateTimeAndDate() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    document.getElementById('time').textContent = `Hora: ${time}`;
    document.getElementById('date').textContent = `Fecha: ${date}`;
}

function updateLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                document.getElementById('latitude').textContent = `Latitud: ${lat}`;
                document.getElementById('longitude').textContent = `Longitud: ${lng}`;
                
                // Inicializa el mapa de Google con la ubicación actual
                initMap(lat, lng);
            },
            () => {
                document.getElementById('latitude').textContent = 'No se pudo obtener la ubicación';
                document.getElementById('longitude').textContent = '';
            }
        );
    } else {
        document.getElementById('latitude').textContent = 'Geolocalización no soportada';
        document.getElementById('longitude').textContent = '';
    }
}

function initMap(lat = -34.397, lng = 150.644) {
    const location = { lat, lng };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimeAndDate();
    updateLocation();
    setInterval(updateTimeAndDate, 1000);
});