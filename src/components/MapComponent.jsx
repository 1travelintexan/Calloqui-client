import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function MapComponent({ lat, lon }) {
  console.log("lat and long map component", lat, lon);
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>
          Great spot choice! <br /> Catch some waves.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
