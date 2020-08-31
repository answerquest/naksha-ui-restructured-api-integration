import { GeoserverLayer } from "interfaces/naksha";
import React, { useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import _ from "underscore";

import { useLayers } from "../../../../hooks/use-layers";
import Item from "./item";

export default function LayersList({ q }: { q? }) {
  const { layers, hiddenLayers } = useLayers();
  const [filteredLayers, setFilteredLayers] = useState<GeoserverLayer[]>([]);

  useEffect(() => {
    const shownLayers = hiddenLayers.length
      ? layers.filter(l => !_.findWhere(hiddenLayers, { id: l.id }))
      : layers;

    setFilteredLayers(
      q
        ? shownLayers.filter(
            l =>
              l.layerName.toLowerCase().includes(q.toLowerCase()) &&
              !_.findWhere(hiddenLayers, { id: l.id })
          )
        : shownLayers
    );
  }, [q, layers, hiddenLayers]);

  return (
    <AutoSizer>
      {p => (
        <List
          width={p.width}
          height={p.height}
          itemCount={filteredLayers.length}
          itemData={{ q, data: filteredLayers }}
          itemSize={113}
        >
          {Item}
        </List>
      )}
    </AutoSizer>
  );
}
