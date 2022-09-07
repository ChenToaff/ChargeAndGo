import React, { useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import lightning from "assets/images/charging_map.png";
import { compose, withProps } from "recompose";
import AddStation from "./addStation";
import MapPopup from "./mapPopup";

const InnerMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(
  ({
    stations,
    setSelectedStation,
    selectedStation,
    setTouchedMap,
    touchedMap,
  }) => (
    <GoogleMap
      onClick={React.useCallback(
        (e) => {
          setSelectedStation(null);
          setTouchedMap({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        },
        [setSelectedStation, setTouchedMap]
      )}
      zoom={selectedStation ? 16 : 12}
      center={{
        lat: selectedStation ? selectedStation.latitude : 32,
        lng: selectedStation ? selectedStation.longitude : 34.855499,
      }}
    >
      {stations.map((station) => (
        <Marker
          key={station._id}
          position={{
            lat: station.latitude,
            lng: station.longitude,
          }}
          onClick={() => {
            setSelectedStation(station);
          }}
          icon={{
            url: lightning,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}

      {selectedStation && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedStation(null);
          }}
          position={{
            lat: selectedStation.latitude,
            lng: selectedStation.longitude,
          }}
        >
          <MapPopup station={selectedStation} />
        </InfoWindow>
      )}
      {touchedMap && !selectedStation && (
        <InfoWindow
          onCloseClick={() => {
            setTouchedMap(null);
          }}
          position={{
            lat: touchedMap.lat,
            lng: touchedMap.lng,
          }}
        >
          <AddStation
            setSelectedStation={setSelectedStation}
            touchedMap={touchedMap}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  )
);

export default function MapView({
  stations,
  selectedStation,
  setSelectedStation,
}) {
  const [touchedMap, setTouchedMap] = useState(null);
  return (
    <InnerMap
      setSelectedStation={setSelectedStation}
      selectedStation={selectedStation}
      stations={stations}
      setTouchedMap={setTouchedMap}
      touchedMap={touchedMap}
    />
  );
}
