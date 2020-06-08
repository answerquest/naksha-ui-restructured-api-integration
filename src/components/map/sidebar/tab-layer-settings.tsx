import { Box, FormControl, FormLabel, Select } from "@chakra-ui/core";
import React from "react";

import { useLayers } from "../../../hooks/use-layers";
import { defaultMapStyles } from "../../../static/constants";

export default function LayerSettings() {
  const { baseLayer, setBaseLayer } = useLayers();

  const onBaseLayerChange = e => {
    setBaseLayer(e.target.value);
  };

  return (
    <Box p={3}>
      <FormControl>
        <FormLabel htmlFor="email">Base Style</FormLabel>
        <Select value={baseLayer} onChange={onBaseLayerChange}>
          {defaultMapStyles.map(s => (
            <option key={s.key} value={s.key}>
              {s.text}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
