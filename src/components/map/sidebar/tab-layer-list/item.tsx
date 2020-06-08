import { Box, Checkbox, Image, Spinner, Stack, Text } from "@chakra-ui/core";
import { GeoserverLayer } from "interfaces/naksha";
import React, { memo } from "react";
import { useState } from "react";
import Highlight from "react-highlighter";
import { areEqual } from "react-window";

import Tooltip from "../../../../components/tooltip";
import useLayerManager from "../../../../hooks/use-layer-manager";
import { fadeOverflow, FALLBACK_THUMB } from "../../../../static/constants";

interface ItemProps {
  data: { q?; data: GeoserverLayer[] };
  index;
  style;
}

const Item = memo<ItemProps>(({ data: { q = "", data }, index, style }) => {
  const { toggleLayer } = useLayerManager();
  const [isLoading, setIsLoading] = useState(false);
  const layer = data[index];

  const handleOnChange = async e => {
    setIsLoading(true);
    await toggleLayer(layer.layerTableName, e?.target?.checked);
    setIsLoading(false);
  };

  return (
    <Stack
      isInline={true}
      key={layer.id}
      spacing="3"
      borderBottom="1px"
      style={style}
      borderColor="gray.200"
      p={3}
    >
      <Box minW="1.3rem">
        {isLoading ? (
          <Spinner emptyColor="gray.200" color="blue.500" size="md" />
        ) : (
          <Checkbox
            size="lg"
            isChecked={layer.isAdded}
            onChange={handleOnChange}
          />
        )}
      </Box>
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
        <Tooltip label={layer.layerDescription}>
          <div>
            <Text mb={1}>
              <Highlight search={q}>{layer.layerName}</Highlight>
            </Text>
            <Box fontSize="sm" color="gray.600">
              {layer.layerDescription}
            </Box>
          </div>
        </Tooltip>
      </Box>
    </Stack>
  );
}, areEqual);

export default Item;
