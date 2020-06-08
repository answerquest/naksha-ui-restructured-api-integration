import { Box, Flex } from "@chakra-ui/core";
import React, { useState } from "react";

import Search from "../search";
import LayersList from "./list";

export default function LayerList() {
  const [q, setQ] = useState<any>();

  return (
    <Flex direction="column" h="full">
      <Search onChange={setQ} name="list-all" />
      <Box className="list" flexGrow={1}>
        <LayersList q={q} />
      </Box>
    </Flex>
  );
}
