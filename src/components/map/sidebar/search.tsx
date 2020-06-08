import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/core";
import React from "react";

export default function Search({ onChange, name }) {
  return (
    <Box p={3} shadow="sm">
      <InputGroup>
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input
          name={name}
          placeholder="Find layer by name"
          type="search"
          onChange={e => onChange(e.target.value)}
        />
      </InputGroup>
    </Box>
  );
}
