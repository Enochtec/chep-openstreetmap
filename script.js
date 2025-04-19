const map = L.map('map').setView([-0.5167, 35.2833], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load custom .geojson
fetch('chepkoilel.osm')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });

const locations = {
  "Admin Block": [-0.5170, 35.2825],
  "Library": [-0.5155, 35.2840],
  "Hostel A": [-0.5162, 35.2850],
  "Cafeteria": [-0.5150, 35.2830],
};

let fromMarker, toMarker, currentRoute;

function findRoute() {
  const fromVal = document.getElementById('from').value;
  const toVal = document.getElementById('to').value;

  if (!locations[fromVal] || !locations[toVal]) {
    alert('⚠️ Please enter valid locations.');
    return;
  }

  const fromCoords = locations[fromVal];
  const toCoords = locations[toVal];

  if (fromMarker) map.removeLayer(fromMarker);
  if (toMarker) map.removeLayer(toMarker);
  if (currentRoute) map.removeLayer(currentRoute);

  fromMarker = L.marker(fromCoords, { title: 'Start' }).addTo(map);
  toMarker = L.marker(toCoords, { title: 'Destination' }).addTo(map);

  currentRoute = L.polyline([fromCoords, toCoords], {
    color: '#0078ff',
    weight: 6,
    opacity: 0.8,
    dashArray: '10,10'
  }).addTo(map);

  map.fitBounds([fromCoords, toCoords]);
}
