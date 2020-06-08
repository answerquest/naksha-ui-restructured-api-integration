import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core";
import React from "react";

import { IconLayers, IconSettings } from "../icons";
import LayerList from "./tab-layer-list";
import LayerSelected from "./tab-layer-selected";
import LayerSettings from "./tab-layer-settings";

export default function SidebarTabs() {
  return (
    <Tabs className="sidebar-tabs">
      <TabList>
        <Tab>
          <IconLayers /> Layers
        </Tab>
        <Tab>
          <IconLayers /> Selected
        </Tab>
        <Tab>
          <IconSettings /> Settings
        </Tab>
      </TabList>
      <TabPanels flexGrow={1}>
        <TabPanel>
          <LayerList />
        </TabPanel>
        <TabPanel>
          <LayerSelected />
        </TabPanel>
        <TabPanel>
          <LayerSettings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
