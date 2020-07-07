import { Box } from "@chakra-ui/core";
import React, { useState, useEffect } from "react";
import { emit } from "react-gbus";
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

export default function Map({ q }: { q? }) {
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
    setHoverPopup,
    externalLayers
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
  const [mapLoaded, setMapLoaded] = useState(false);
  const onLoad = () => {
    setMapLoaded(true);
    if (externalLayers && externalLayers.length > 0) toggleExternalLayers();
    updateWorldView();
    mapRef.current.getMap().on("style.load", () => {
      updateWorldView();
      emit("STYLE_UPDATED");
    });
  };

  const toggleExternalLayers = async () => {
    await toggleExternalLayer(
      q[0].id,
      q[0].styles,
      true
    );
  };

  useEffect(() => {
    if (mapLoaded) toggleExternalLayers();
  }, [JSON.stringify(externalLayers)]);

  useEffect(() => {
    console.log("External Layers Changed. mapLoaded = ", mapLoaded)
    if (mapLoaded) toggleExternalLayers();
  }, [JSON.stringify(q)]);

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
