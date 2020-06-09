import { Box, Button, Image, Stack, Text, Badge } from "@chakra-ui/core";
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

  const handleToggleLayer = async e => {
    setIsLoading(true);
    await toggleLayer(layer.layerTableName, !layer.isAdded);
    setIsLoading(false);
  };

  return (
    <Stack
      key={layer.id}
      spacing="1"
      borderBottom="1px"
      style={style}
      borderColor="gray.200"
      p={0}
    >
      <Stack
        isInline={true}
        spacing="3"
        p={0}
      >
        <Image
          // borderRadius="md"
          // border="1px"
          // borderColor="gray.200"
          objectFit="contain"
          flexShrink={0}
          size="5rem"
          src={layer.thumbnail}
          fallbackSrc={FALLBACK_THUMB}
        />
        <Box h="5rem" p={3} style={fadeOverflow}>
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mx={3}>
        <Box>
          <Text fontSize="xs">
            <Badge
              variant="outline"
              variantColor="green"
              fontSize={10}
              mr={1}>
              {layer.license}
            </Badge>
            {layer.createdBy}
          </Text>
        </Box>
        <Button
          size="xs"
          minW="5rem"
          variantColor="blue"
          variant={layer.isAdded ? "solid":"outline"}
          onClick={handleToggleLayer}
          isLoading={isLoading}
        >
          {layer.isAdded? "Remove from Map" : "Add to Map"}
        </Button>
      </Box>
    </Stack>
  );
}, areEqual);

export default Item;
