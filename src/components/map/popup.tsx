import React from "react";
import { Popup } from "react-map-gl";

interface IPopupContainerProps {
  data;
  set;
  closeButton?: boolean;
}

export default function PopupContainer({
  data: { element: Element, lngLat, ...rest },
  set,
  closeButton = true
}: IPopupContainerProps) {
  return Element ? (
    <Popup
      onClose={() => set(null)}
      closeButton={closeButton}
      closeOnClick={false}
      latitude={lngLat[1]}
      longitude={lngLat[0]}
    >
      <Element {...rest} />
    </Popup>
  ) : null;
}
