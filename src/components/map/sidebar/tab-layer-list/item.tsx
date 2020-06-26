import { Box, Button, Image, Stack, Text, Badge } from "@chakra-ui/core";
import { GeoserverLayer } from "interfaces/naksha";
import React, { memo } from "react";
import { useState } from "react";
import Highlight from "react-highlighter";
import { areEqual } from "react-window";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tag,
  Link,
} from "@chakra-ui/core";

import Tooltip from "../../../../components/tooltip";
import CollapsibleText from "../../../../components/common/collapsibleText";
import useLayerManager from "../../../../hooks/use-layer-manager";
import { fadeOverflow, FALLBACK_THUMB } from "../../../../static/constants";
import { validURL } from "../../../../utils/basic";

interface ItemProps {
  data: { q?; data: GeoserverLayer[] };
  index;
  style;
  onShowInfo;
}

const Item = memo<ItemProps>(({ data: { q = "", data }, index, style, onShowInfo }) => {
  const { toggleLayer } = useLayerManager();
  const [isLoading, setIsLoading] = useState(false);
  const layer = data[index];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggleLayer = async e => {
    setIsLoading(true);
    await toggleLayer(layer.layerTableName, !layer.isAdded);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
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
          <Box h="5rem" p={3} style={fadeOverflow} onClick={onOpen}>
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
      
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{layer.layerName}</DrawerHeader>

          <DrawerBody>
            <div style={{overflowY:'scroll', height: '100vh'}}>
              <Stack spacing={5}>
                <CollapsibleText fontSize="xs">{layer.layerDescription}</CollapsibleText>
                <Stack spacing={0}>
                  <Text fontSize="xs">Layer Type</Text>
                  <Text fontSize="sm">{layer.layerType}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontSize="xs">Created By</Text>
                  <Text fontSize="sm">{layer.createdBy}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontSize="xs">Licence</Text>
                  <Text fontSize="sm">{layer.license}</Text>
                </Stack>
                <Stack spacing={0}>
                  <Text fontSize="xs">Attribution</Text>
                  <CollapsibleText fontSize="sm">{layer.attribution}</CollapsibleText>
                </Stack>
                <Stack spacing={0}>
                  <Text fontSize="xs">Tags</Text>
                  <Stack spacing={4} isInline>
                      <Tag size='sm' variantColor="gray">
                        India
                      </Tag>
                      <Tag size='sm' variantColor="gray">
                        Districts
                      </Tag>
                      <Tag size='sm' variantColor="gray">
                        Map
                      </Tag>
                      <Tag size='sm' variantColor="gray">
                        India
                      </Tag>
                  </Stack>
                </Stack>
                {validURL(layer.pdfLink) && 
                  <Stack spacing={0}>
                    <Text fontSize="xs">PDF Link</Text>
                    <Link fontSize="xs" color="teal.500"
                          target='_blank'
                          href={layer.pdfLink} >
                      View Document
                    </Link>
                  </Stack>
                }
                <Stack spacing={0}>
                  <Link fontSize="xs" color="teal.500" href="#">
                    Download Layer
                  </Link>
                </Stack>
              </Stack>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </React.Fragment>
  );
}, areEqual);

export default Item;
