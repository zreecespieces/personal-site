declare module "react-usa-map" {
  import React from "react";

  interface USAMapProps {
    customize?: Record<
      string,
      { fill?: string; clickHandler?: (event: React.MouseEvent<SVGElement>) => void }
    >;
    onClick?: (event: React.MouseEvent<SVGElement>) => void;
    title?: string;
    width?: number;
    height?: number;
    defaultFill?: string;
  }

  class USAMap extends React.Component<USAMapProps> {}

  export default USAMap;
}
