import { GeoserverLayer } from "interfaces/naksha";
import React, { useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { useLayers } from "../../../../hooks/use-layers";
import Item from "./item";

export default function LayersList({ q }: { q? }) {
  const { layers } = useLayers();
  const [filteredLayers, setFilteredLayers] = useState<GeoserverLayer[]>([]);

  useEffect(() => {
    setFilteredLayers(
      q
        ? layers.filter(l => l.layerName.toLowerCase().includes(q.toLowerCase()))
        : layers
    );
  }, [q, layers]);

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
