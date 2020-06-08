import { bBoxAspectRatio, calculateSize } from "bbox-aspect-ratio";
import { GeoserverLayer } from "interfaces/naksha";
import { xml2js } from "xml-js";

/**
 * Helper for geoserver XML to JSON parses bbox coordinates
 *
 * @param {*} f
 * @returns
 */
export const parseBbox = f => {
  const [l1, l2] = f["ows:WGS84BoundingBox"]["ows:LowerCorner"]["_text"].split(
    " "
  );
  const [u1, u2] = f["ows:WGS84BoundingBox"]["ows:UpperCorner"]["_text"].split(
    " "
  );
  return [
    [parseFloat(l1), parseFloat(l2)],
    [parseFloat(u1), parseFloat(u2)]
  ];
};

/**
 * Helper for geoserver XML to JSON parser returns thumbnail URL from layerID
 *
 * @param {*} name
 * @param {*} bbox
 * @param {number} [size=50]
 * @returns
 */
const getThumbUrl = (name, bbox, size = 50) => {
  return `/wms?STYLES=&LAYERS=${name}&SERVICE=WMS&FORMAT=image/png&TRANSPARENT=true&MAXFEATURES=10000&REQUEST=GETMAP&SRS=EPSG:4326&WIDTH=${size}&HEIGHT=${calculateSize(
    bBoxAspectRatio(bbox.flat()),
    size
  )}&VERSION=1.1.1&BBOX=${bbox[0].toString()},${bbox[1].toString()}`;
};

/**
 * Parses and converts geoserver XML to JSON
 *
 * @param {*} xml
 * @param {*} endpoint
 * @param {*} workspace
 * @returns {GeoserverLayer[]}
 */
export const parseGeoserverLayersXml = (
  xml,
  endpoint,
  workspace,
  selectedLayers
): GeoserverLayer[] => {
  const rawJSON = xml2js(xml, {
    compact: true,
    captureSpacesBetweenElements: true
  });

  const selectedLayersIDs = selectedLayers.map(({ id }) => id);

  let layers =
    rawJSON?.["wfs:WFS_Capabilities"]?.FeatureTypeList?.FeatureType || [];

  if (!Array.isArray(layers)) {
    layers = [layers];
  }

  return layers.map((f, index) => {
    const bbox = parseBbox(f);
    const name = f.Name._text.split(":")[1];
    return {
      id: name,
      index,
      title: f.Title._text,
      description: f.Abstract._text,
      thumbnail: `${endpoint}/${workspace}/${getThumbUrl(name, bbox)}`,
      bbox,
      source: {
        type: "vector",
        scheme: "tms",
        tiles: [
          `${endpoint}/gwc/service/tms/1.0.0/${workspace}:${name}@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
        ]
      },
      data: { styles: [] },
      isAdded: selectedLayersIDs.includes(name)
    };
  });
};

/**
 * Returns legend image URL for Geoserver Layer
 *
 * @param {GeoserverLayer} layer
 * @param {string} geoserverEndpoint
 * @returns {string}
 */
export const getLegendUrl = (
  layer: GeoserverLayer,
  geoserverEndpoint: string
) => {
  return `${geoserverEndpoint}/wms?request=getlegendgraphic&version=1.0.0&format=image/png&transparent=true&layer=${
    layer.id
  }&style=${layer.data.styles[layer.data.styleIndex].styleName}`;
};
