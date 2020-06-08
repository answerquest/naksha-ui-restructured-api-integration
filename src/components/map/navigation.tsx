import { Box } from "@chakra-ui/core";
import React from "react";
import { NavigationControl } from "react-map-gl";

export default function Navigation({ onViewportChange }) {
  return (
    <Box p={4} position="absolute" right={0} top={0}>
      <NavigationControl onViewportChange={onViewportChange} />
    </Box>
  );
}
