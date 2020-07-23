import { Box } from "@chakra-ui/core";
import React, { useState, useEffect } from "react";
import { emit } from "react-gbus";
import _ from "underscore";
import MapGL from "react-map-gl";

// import useDebounce from "../../hooks/use-debounce";
import useLayerManager from "../../hooks/use-layer-manager";
import { useLayers } from "../../hooks/use-layers";
import { defaultMapStyles } from "../../static/constants";
import InfoBar from "./infobar";
import Legend from "./legend";
import MarkersList from "./markers-list";
import Navigation from "./navigation";
import Popup from "./popup";
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
    clickPopup,
    setClickPopup,
    hoverPopup,
    setHoverPopup
  } = useLayers();
  const { toggleExternalLayer } = useLayerManager();
  const {
    updateWorldView,
    reloadLayers,
    onMapClick,
    onMapHover,
    renderHLData
  } = useLayerManager();

  // const debouncedViewPort = useDebounce(viewPort, 500);

  // useListener(reloadLayers, ["STYLE_UPDATED"]);
  // const [currentExternalLayer, setCurrentExternalLayer] = useState(false);
  const [addedLayers, setAddedLayers] = useState([]);

  const onLoad = () => {
    updateWorldView();
    mapRef.current.getMap().on("style.load", () => {
      updateWorldView();
      emit("STYLE_UPDATED");
    });
  };

  const toggleExternalLayers = async () => {
    // const map = mapRef.current.getMap();

    // const layersToRemove = _.filter(addedLayers, layer => {
    //   return _.find(externalLayers, l => layer.id === l.id) === undefined;
    // });
    console.log("Naksha:addedLayers", addedLayers);
    await _.each(addedLayers, layer => {
      toggleExternalLayer(layer.id, layer.styles, false);
    });

    // const layersToAdd = _.filter(externalLayers, layer => {
    //   return _.find(addedLayers, l => layer.id === l.id && layer.type === l.type) === undefined;
    // });

    // setAddedLayers([...addedLayers, ...layersToAdd]);

    await _.each(externalLayers, layer => {
      toggleExternalLayer(layer.id, layer.styles, true);
    });
    setAddedLayers(externalLayers);
    // console.log("layersToRemove", layersToRemove);
    // console.log("layersToAdd", layersToAdd);
    // console.log("addedLayers", addedLayers);

    console.log("Naksha:externalLayers", externalLayers);

    // _.each(addedLayers, layer => {
    //   map.setPaintProperty(
    //     layer.id,
    //     "raster-opacity",
    //     layer.styles
    //   );
    // });

    // await toggleExternalLayer(
    //   externalLayers[0].id,
    //   externalLayers[0].styles,
    //   true
    // );
    // setCurrentExternalLayer(externalLayers);
  };

  useEffect(() => {
    if (externalLayers && externalLayers.length > 0) toggleExternalLayers();
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
        onHover={onMapHover}
      >
        <Navigation onViewportChange={setViewPort} />
        <Legend />
        {clickPopup && <Popup data={clickPopup} set={setClickPopup} />}
        {!clickPopup && hoverPopup && (
          <Popup data={hoverPopup} set={setHoverPopup} closeButton={false} />
        )}
        <MarkersList />
      </MapGL>
      {loadToC && <Sidebar />}
      {infobarData.length > 0 && <InfoBar />}
    </Box>
  );
}
