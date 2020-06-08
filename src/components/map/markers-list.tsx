import React, { useMemo } from "react";
import { Marker } from "react-map-gl";

import { useLayers } from "../../hooks/use-layers";

const MarkersList = () => {
  const { markers, mapboxApiAccessToken } = useLayers();

  const markersMemoized = useMemo(() => markers, [markers]);

  return (
    <>
      {markersMemoized.map(({ latitude, longitude, colorHex }, index) => (
        <Marker
          key={index}
          latitude={latitude}
          longitude={longitude}
          offsetTop={-35}
          offsetLeft={-15}
        >
          <img
            style={{ cursor: "pointer" }}
            alt="Marker"
            src={`https://a.tiles.mapbox.com/v4/marker/pin-m+${colorHex}.png?access_token=${mapboxApiAccessToken}`}
          />
        </Marker>
      ))}
    </>
  );
};

export default MarkersList;
