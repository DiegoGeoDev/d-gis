import React from "react";
import { Map as MapGL, NavigationControl } from "react-map-gl/maplibre";
import type { ViewStateChangeEvent } from "react-map-gl/maplibre";

interface BasicMapProps {
  width?: string | number;
  height?: string | number;
}

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

const BasicMap: React.FC<BasicMapProps> = ({
  width = "100%",
  height = "600px",
}) => {
  const [viewState, setViewState] = React.useState<ViewState>({
    longitude: -74.5,
    latitude: 40,
    zoom: 3.5,
  });

  const handleViewStateChange = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  return (
    <div style={{ width, height, position: "relative" }}>
      <MapGL
        {...viewState}
        onMove={handleViewStateChange}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >
        <NavigationControl position="top-left" />
      </MapGL>
    </div>
  );
};

export default BasicMap;
