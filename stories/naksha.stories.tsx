import { boolean, object, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import Naksha, { defaultNakshaProps, theme } from "../src";
import { Box } from "@chakra-ui/core";

export default {
  title: "Components",
  decorators: [withKnobs]
};

const Popup = props => {
  return (
    <Box maxH="250px" overflow="auto" fontSize="sm">
      <button onClick={() => alert("Clicked")}>Clicked</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Box>
  );
};

const HoverPopup = ({ feature }) => {
  return <div>{feature?.properties?.count} Observations</div>;
};

export const toStorybook = () => (
  <Naksha
    viewPort={object("ViewPort", defaultNakshaProps.viewPort)}
    loadToC={boolean("Load ToC", true)}
    showToC={boolean("Show ToC", true)}
    mapboxApiAccessToken={text(
      "Mapbox Token",
      process.env.STORYBOOK_MAPBOX_TOKEN
    )}
    nakshaApiEndpoint={text(
      "Naksha Endpoint",
      process.env.STORYBOOK_NAKSHA_ENDPOINT
    )}
    geoserver={object("Geoserver", JSON.parse(process.env.STORYBOOK_GEOSERVER))}
    theme={object("Theme", theme)}
    selectedLayers={object("Selected Layers", [])}
    externalLayers={object("External Layers", [])}
    hiddenLayers={object("Hidden Layers", [{ id: 254 }, { id: 255 }])}
  />
);

toStorybook.story = {
  name: "naksha"
};
