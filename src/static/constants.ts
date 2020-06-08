import { theme } from "@chakra-ui/core";

import { BaseLayer, NakshaProps } from "../interfaces/naksha";

export const defaultNakshaProps: NakshaProps = {
  viewPort: { latitude: 20, longitude: 79, zoom: 3, bearing: 0, pitch: 0 },

  loadToC: false,
  showToC: false,

  mapboxApiAccessToken: "pk.xxx",
  nakshaApiEndpoint: "/naksha-api/api",
  geoserver: { endpoint: "/geoserver", workspace: "biodiv", store: "ibp" },

  theme,

  baseLayer: BaseLayer.MAP_STREETS,
  layers: [],
  selectedLayers: [],
  markers: []
};

export const defaultMapStyles = [
  {
    text: "Streets",
    key: BaseLayer.MAP_STREETS,
    style: "mapbox://styles/mapbox/streets-v11"
  },
  {
    text: "Satellite",
    key: BaseLayer.MAP_SATELLITE,
    style: "mapbox://styles/mapbox/satellite-streets-v11"
  },
  {
    text: "Dark",
    key: BaseLayer.MAP_DARK,
    style: "mapbox://styles/mapbox/dark-v10"
  }
];

export const fadeOverflow = {
  WebkitMaskImage: "linear-gradient(to bottom, red 30%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, red 30%, transparent 100%)"
};

export const adminBoundries = [
  "admin-0-boundary",
  "admin-1-boundary",
  "admin-0-boundary-disputed",
  "admin-1-boundary-bg",
  "admin-0-boundary-bg"
];

export const HL = {
  PAINT: {
    Polygon: {
      "fill-outline-color": "red",
      "fill-color": "transparent",
      "fill-opacity": 0.8
    },
    Point: {
      "circle-stroke-color": "red",
      "circle-stroke-width": 1,
      "circle-opacity": 0
    }
  },
  PREFIX: "highlight-"
};

export const LAYER_UPDATED = "layer_updated";

export const LAYER_PREFIX = "lyr_";
export const LAYER_PREFIX_GRID = "grid_lyr_";
export const FEATURE_PROP = "__mlocate__id";
export const FALLBACK_THUMB =
  "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'%3E%3Cpath fill='%23fff' d='M0 0h72v72H0z'/%3E%3Cpath d='M35.981 48.293l-13.853-10.77-3.045 2.368L36 53.048l16.917-13.157-3.064-2.387-13.872 10.789zM36 43.519l13.834-10.77 3.083-2.388L36 17.204 19.083 30.36l3.064 2.387L36 43.518z' fill='%23A0AEC0'/%3E%3C/svg%3E";
