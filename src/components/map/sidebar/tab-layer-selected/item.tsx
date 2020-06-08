import {
  Box,
  Button,
  Image,
  Select,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/core";
import { GeoserverLayer } from "interfaces/naksha";
import React from "react";
import Highlight from "react-highlighter";

import {
  IconChevronDown,
  IconChevronUp,
  IconRemoveCircle
} from "../../../../components/map/icons";
import Tooltip from "../../../../components/tooltip";
import useLayerManager from "../../../../hooks/use-layer-manager";
import { useLayers } from "../../../../hooks/use-layers";
import { fadeOverflow, FALLBACK_THUMB } from "../../../../static/constants";
import { getLegendUrl } from "../../../../utils/naksha";

interface ItemProps {
  layer: GeoserverLayer;
  q?;
}

const Item = ({ layer, q }: ItemProps) => {
  const { geoserver } = useLayers();
  const { toggleLayer } = useLayerManager();
  const { isOpen, onToggle } = useDisclosure();
  const showLegend = layer.source.type !== "grid";

  const removeLayer = () => toggleLayer(layer.id, false);

  const updateLayerStyle = e =>
    toggleLayer(layer.id, true, Number(e.target.value), false);

  return (
    <Box p={3} key={layer.id} borderBottom="1px" borderColor="gray.200">
      <Stack isInline={true} spacing="3" mb={3}>
        <Image
          borderRadius="md"
          border="1px"
          borderColor="gray.200"
          objectFit="contain"
          flexShrink={0}
          size="4.5rem"
          src={layer.thumbnail}
          fallbackSrc={FALLBACK_THUMB}
        />
        <Box h="4.5rem" style={fadeOverflow}>
          <Tooltip label={layer.description}>
            <div>
              <Text mb={1}>
                <Highlight search={q || ""}>{layer.title}</Highlight>
              </Text>
              <Box fontSize="sm" color="gray.600">
                {layer.description}
              </Box>
            </div>
          </Tooltip>
        </Box>
      </Stack>
      {showLegend && (
        <Select mb={3} onChange={updateLayerStyle}>
          {layer.data.styles.map((s, index) => (
            <option key={index} value={index}>
              {s.styleTitle}
            </option>
          ))}
        </Select>
      )}
      <Stack
        isInline
        spacing={4}
        justifyContent={showLegend ? "space-between" : "flex-end"}
      >
        <Button
          variantColor="blue"
          variant="outline"
          hidden={!showLegend}
          onClick={onToggle}
          leftIcon={isOpen ? IconChevronUp : IconChevronDown}
        >
          Legend
        </Button>
        <Button
          variantColor="red"
          variant="outline"
          onClick={removeLayer}
          leftIcon={IconRemoveCircle}
        >
          Remove
        </Button>
      </Stack>
      {showLegend && isOpen && (
        <Box pt={3}>
          <Image src={getLegendUrl(layer, geoserver.endpoint)} />
        </Box>
      )}
    </Box>
  );
};

export default Item;
