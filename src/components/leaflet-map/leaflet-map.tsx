import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import {Icon, LatLng} from 'leaflet';
import './leaflet-map.css';

interface MapProps {
    coords: any;
}

export const LeafletMap = (props: MapProps) => {

    const position = new LatLng(props.coords.lat, props.coords.lon);
    return (
        <MapContainer className={'map'} center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}
                    icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                {/*<Popup>*/}
                {/*    A pretty CSS3 popup. <br/> Easily customizable.*/}
                {/*</Popup>*/}
            </Marker>
        </MapContainer>

    );
};
