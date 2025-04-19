const map = L.map('map').setView([0.584353, 35.3084402], 15);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// University of Eldoret marker
const destination = {
  name: "University of Eldoret",
  lat: 0.584353,
  lon: 35.3084402
};

L.marker([destination.lat, destination.lon])
  .addTo(map)
  .bindPopup(destination.name)
  .openPopup();

let userLocation = null;

// Geolocation to get current position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLocation = [pos.coords.latitude, pos.coords.longitude];
      L.marker(userLocation)
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
    },
    err => {
      console.error("Geolocation error:", err.message);
    }
  );
} else {
  alert("Geolocation is not supported by this browser.");
}

// Search + Route
function searchLocation() {
  const input = document.getElementById("search-input").value.toLowerCase();

  if (
    input.includes("university of eldoret") ||
    input.includes("uoe") ||
    input.includes("eldoret university")
  ) {
    if (!userLocation) {
      alert("Enable location to get directions.");
      return;
    }

    L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination.lat, destination.lon)
      ],
      routeWhileDragging: false
    }).addTo(map);
  } else {
    alert("Place not found. Try 'University of Eldoret'.");
  }
}
