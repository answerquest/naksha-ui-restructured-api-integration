import { Box, Text } from "@chakra-ui/core";
import React, { useState, useEffect } from "react";
import { emit } from "react-gbus";
import _ from "underscore";
import MapGL, { Popup } from "react-map-gl";

// import useDebounce from "../../hooks/use-debounce";
import useLayerManager from "../../hooks/use-layer-manager";
import { useLayers } from "../../hooks/use-layers";
import { defaultMapStyles } from "../../static/constants";
import InfoBar from "./infobar";
import Legend from "./legend";
import MarkersList from "./markers-list";
import Navigation from "./navigation";
// import Popup from "./popup";
import Sidebar from "./sidebar";

export default function Map({ externalLayers }: { externalLayers? }) {
  const {
    mapRef,
    loadToC,
    mapboxApiAccessToken,
    viewPort,
    setViewPort,
    baseLayer,
    layers,
    infobarData,
  } = useLayers();
  const { toggleExternalLayer } = useLayerManager();
  const {
    updateWorldView,
    reloadLayers,
    onMapClick,
    renderHLData
  } = useLayerManager();

  // const debouncedViewPort = useDebounce(viewPort, 500);

  // useListener(reloadLayers, ["STYLE_UPDATED"]);
  // const [currentExternalLayer, setCurrentExternalLayer] = useState(false);
  const [addedLayers, setAddedLayers] = useState([]);
  const [popUp, setPopUp] = useState(null);

  const onLoad = () => {
    updateWorldView();
    mapRef.current.getMap().on("style.load", () => {
      updateWorldView();
      emit("STYLE_UPDATED");
    });
  };

  const toggleExternalLayers = async () => {
    await _.each(addedLayers, layer => {
      toggleExternalLayer(layer.id, layer.styles, false);
    });

    await _.each(externalLayers, layer => {
      toggleExternalLayer(layer.id, layer.styles, true);
    });
    setAddedLayers(externalLayers);
  };

  useEffect(() => {
    if ((externalLayers && externalLayers.length > 0) || addedLayers.length > 0)
      toggleExternalLayers();
  }, [JSON.stringify(externalLayers)]);

  useEffect(() => {
    reloadLayers();
  }, [layers.length]);

  // useEffect(() => {
  //   reloadLayers(true);
  // }, [debouncedViewPort]);

  useEffect(() => {
    renderHLData();
  }, [infobarData]);

  const handleHover = e => {
    var coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    if (
      e.features[0].layer.paint["fill-color"].property &&
      e.features[0].properties
    ) {
      const title = e.features[0].properties[
        e.features[0].layer.paint["fill-color"].property
      ]
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
      let properties = [];
      _.each(e.features[0].properties, (p, key) => {
        if (key !== e.features[0].layer.paint["fill-color"].property)
          properties.push(
            <div>
              <span>{key}:</span>
              {p}
            </div>
          );
      });
      setPopUp({
        coordinates: e.lngLat,
        title: title,
        properties: properties
      });
    } else {
      setPopUp(null);
    }
  };

  return (
    <Box size="full" position="relative">
      <MapGL
        {...viewPort}
        width="100%"
        height="100%"
        mapStyle={defaultMapStyles[baseLayer].style}
        onLoad={onLoad}
        ref={mapRef}
        getCursor={() => "default"}
        onViewportChange={setViewPort}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onClick={onMapClick}
        onHover={handleHover}
      >
        <Navigation onViewportChange={setViewPort} />
        <Legend />
        {/* {clickPopup && <Popup data={clickPopup} set={setClickPopup} />}
        {!clickPopup && hoverPopup && (
          <Popup data={hoverPopup} set={setHoverPopup} closeButton={false} />
        )} */}
        {!_.isEmpty(popUp) && (
          <Popup
            longitude={popUp.coordinates[0]}
            latitude={popUp.coordinates[1]}
            closeButton={false}
            closeOnClick={false}
          >
            <Box fontSize="12px">
              <Text fontWeight="bold">{popUp.title}</Text>
              {_.map(popUp.properties, p => p)}
            </Box>
          </Popup>
        )}
        <MarkersList />
      </MapGL>
      {loadToC && <Sidebar />}
      {infobarData.length > 0 && <InfoBar />}
    </Box>
  );
}
