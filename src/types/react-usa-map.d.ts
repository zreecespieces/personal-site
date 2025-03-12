declare module 'react-usa-map' {
  import React from 'react';

  interface USAMapProps {
    customize?: Record<string, { fill: string }>;
    onClick?: (event: React.MouseEvent) => void;
    title?: string;
    onMouseOver?: (event: React.MouseEvent, stateCode: string) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  }

  class USAMap extends React.Component<USAMapProps> {}

  export default USAMap;
}
