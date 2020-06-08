import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";
import React from "react";

import Map from "../components/map";
import { LayersProvider } from "../hooks/use-layers";
import { NakshaProps } from "../interfaces/naksha";
import { defaultNakshaProps } from "../static/constants";

export default function Naksha(props: NakshaProps) {
  return (
    <LayersProvider {...defaultNakshaProps} {...props}>
      <ThemeProvider theme={props.theme || theme}>
        <CSSReset />
        <Map />
      </ThemeProvider>
    </LayersProvider>
  );
}
