import { useDisclosure } from "@chakra-ui/core";
import React, {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState
} from "react";
import { ViewportProps } from "react-map-gl";
import { useImmer } from "use-immer";

import {
  BaseLayer,
  GeoserverLayer,
  IUseDisclosure,
  NakshaProps,
  SelectedLayers
} from "../interfaces/naksha";
import { defaultNakshaProps } from "../static/constants";

interface LayerContextProps extends NakshaProps {
  ToC?: IUseDisclosure;

  infobarData?: any[];
  setInfobarData?;

  mapRef?: MutableRefObject<any>;

  setBaseLayer?;
  setLayers?: (f: (draft: GeoserverLayer[]) => any) => void;

  setViewPort?;
  setSelectedLayers?: (f: (draft: SelectedLayers[]) => any) => void;

  legend?;
  setLegend?;

  clickPopup?;
  setClickPopup?;

  hoverPopup?;
  setHoverPopup?;
}

const LayersContext = createContext<LayerContextProps>(defaultNakshaProps);

export const LayersProvider = (props: NakshaProps) => {
  const ToC = useDisclosure(props.showToC);
  const mapRef = useRef(null);
  const [viewPort, setViewPort] = useState<Partial<ViewportProps>>(
    props.viewPort
  );

  const [baseLayer, setBaseLayer] = useState<BaseLayer>(props.baseLayer);
  const [layers, setLayers] = useImmer(props.layers);

  const [selectedLayers, setSelectedLayers] = useImmer(props.selectedLayers);
  const [infobarData, setInfobarData] = useState<any>([]);
  const [legend, setLegend] = useState({});

  const [clickPopup, setClickPopup] = useState<any>();
  const [hoverPopup, setHoverPopup] = useState<any>();

  return (
    <LayersContext.Provider
      value={{
        ...props,
        ToC,

        infobarData,
        setInfobarData,

        mapRef,

        selectedLayers,
        setSelectedLayers,

        viewPort,
        setViewPort,

        baseLayer,
        setBaseLayer,

        layers,
        setLayers,

        legend,
        setLegend,

        clickPopup,
        setClickPopup,

        hoverPopup,
        setHoverPopup
      }}
    >
      {props.children}
    </LayersContext.Provider>
  );
};

export function useLayers() {
  return useContext(LayersContext);
}
