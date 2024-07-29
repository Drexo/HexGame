import React from 'react';
import styled from 'styled-components';

const OverlayHexContainer = styled.div`
  position: absolute;  /* Ensure it stays within the bounds of the parent element */
  /* Additional styles for overlay-hex if any */
`;

interface OverlayHexProps {
  zIndex: number;
  opacity: number;
  transformScale: number;
  backgroundImage: string;
}

const OverlayHex: React.FC<OverlayHexProps> = ({ zIndex, opacity, transformScale, backgroundImage }) => (
  <OverlayHexContainer className="overlay-hex" style={{ zIndex }}>
    <div
      className="overlay-hex--image"
      style={{
        opacity,
        transform: `scale(${transformScale})`,
        transition: 'opacity 0.6s, transform 1.5s',
        backgroundImage
      }}
    ></div>
  </OverlayHexContainer>
);

export default OverlayHex;
