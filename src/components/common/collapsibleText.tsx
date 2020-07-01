import React, { FunctionComponent, useState } from "react";
import { Text, Link } from "@chakra-ui/core";

interface TextProps {
  fontSize;
}

// we can use children even though we haven't defined them in our CardProps
const CollapsibleText: FunctionComponent<TextProps> = ({
  children,
  ...rest
}) => {
  const CHARS_TO_SHOW = 130;
  const [expanded, setExpanded] = useState(false);
  const needsExpansion = children.toString().length > CHARS_TO_SHOW;
  const c = needsExpansion
    ? children.toString().slice(0, CHARS_TO_SHOW)
    : children.toString();
  const linkText = expanded ? "less" : "more";

  return (
    <Text {...rest}>
      {expanded ? children.toString() : c}
      {needsExpansion && (
        <Link color="gray.400" onClick={() => setExpanded(!expanded)}>
          ...{linkText}
        </Link>
      )}
    </Text>
  );
};
export default CollapsibleText;
