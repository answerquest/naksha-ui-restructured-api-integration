# Naksha Components React 🗺️

[![GitHub Actions Status](https://github.com/strandls/naksha-components-react/workflows/NodeJS/badge.svg)](https://github.com/strandls/naksha-components-react/actions)
![Dependencies](https://img.shields.io/david/strandls/naksha-components-react.svg)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/naksha-components-react.svg)
[![typed with TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Mapbox GL Components for IndiaBiodiversity

> As of now full documentation is only available via TypeScript autocomplete but we are working on adding complete documentation

#### Grid Layer

Grid layer that accepts geohashes and plots grid according to it

![Grid Layer](./preview/geohash-grid-layer.gif)

#### Geoserver Vector Layer

Vector layer that shows geoserver vector layer

![Geoserver Vector Layer](./preview/geoserver-vector-layer.gif)

- Render grid layer from geohashed data (ideal for elasticsearch)
- Render vector tiles directly from geoserver
- Multiple View
- Multi Style

### 📦 Setup

```sh
git clone https://github.com/strandls/naksha-components-react.git
cd naksha-components-react
yarn install
```

### 📚 Storybook

```
yarn storybook
```

This loads the stories from `./stories`.

### 📦 Usage

```tsx
import Naksha from "naksha-components-react";

<Naksha
  viewPort={{ latitude: 20, longitude: 79, zoom: 3, bearing: 0, pitch: 0 }}
  loadToC={true}
  showToC={false}
  mapboxApiAccessToken="pk.xxx"
  nakshaApiEndpoint="/naksha-api/api"
  geoserver={{ endpoint: "/geoserver", store: "ibp", workspace: "biodiv" }}
  layers={[
    {
      id: "global-observations",
      title: "Global Observations",
      isAdded: true,
      source: {
        type: "grid",
        endpoint:
          "/your-api-endpoint?t={top}&l={left}&b={bottom}&r={right}&p={precision}"
      }
    }
  ]}
/>;
```

### 🔧 Configuration

Code quality checks are done with `prettier`, `husky`, and `lint-staged`.

### 🤠 Credits

- [tsdx](https://github.com/jaredpalmer/tsdx)
- [typescript](https://github.com/microsoft/TypeScript)
- [chakra-ui](https://github.com/chakra-ui/chakra-ui)
- [react-map-gl](https://github.com/uber/react-map-gl)

### 🙏 Contributing

Contributions/Suggestions are always welcome!

### 📄 License

Apache-2.0 &copy; [Strand Life Sciences](https://github.com/strandls)
