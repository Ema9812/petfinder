import React, { useEffect, useState } from "react";
import MapGL, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

type MapViewProps = {
  marker: { lat: number; lng: number } | null;
  onPick: (lat: number, lng: number) => void;
};

const DEFAULT_VIEW = { latitude: -34.6037, longitude: -58.3816, zoom: 11 };

export function MapView({ marker, onPick }: MapViewProps) {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);

  useEffect(() => {
    if (marker) {
      setViewState((v) => ({
        ...v,
        latitude: marker.lat,
        longitude: marker.lng,
        zoom: Math.max(v.zoom, 14),
      }));
    }
  }, [marker?.lat, marker?.lng]);

  return (
    <div style={{ height: 240, borderRadius: 8, overflow: "hidden" }}>
      <MapGL
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        onClick={(e) => onPick(e.lngLat.lat, e.lngLat.lng)}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        style={{ width: "100%", height: "100%" }}
      >
        {marker && <Marker latitude={marker.lat} longitude={marker.lng} />}
      </MapGL>
    </div>
  );
}