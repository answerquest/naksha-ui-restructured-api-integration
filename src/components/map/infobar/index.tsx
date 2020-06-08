import { CloseButton, IconButton, useDisclosure } from "@chakra-ui/core";
import styled from "@emotion/styled";
import React from "react";

import { useLayers } from "../../../hooks/use-layers";
import { IconInfo } from "../icons";

const TabContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 24rem;
  background: white;
  height: 100%;
  > .sidebar-tabs,
  [role="tabpanel"] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default function InfobarPanel() {
  const { infobarData } = useLayers();
  const { isOpen, onToggle, onClose } = useDisclosure(true);

  return isOpen ? (
    <TabContainer>
      <CloseButton m={1} onClick={onClose} position="absolute" right="0" />
      <pre>{JSON.stringify(infobarData, null, 2)}</pre>
    </TabContainer>
  ) : (
    <IconButton
      position="absolute"
      top={0}
      right={0}
      m={4}
      bg="white"
      size="sm"
      variant="outline"
      onClick={onToggle}
      aria-label="List Layers"
      icon={IconInfo}
    />
  );
}
