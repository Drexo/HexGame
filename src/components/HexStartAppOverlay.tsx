import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  /* Add styles for hex-start-app-overlay here if any */
`;

interface HexStartAppOverlayProps {
  backgroundImage: string;
}

const HexStartAppOverlay: React.FC<HexStartAppOverlayProps> = ({ backgroundImage }) => (
  <Overlay className="hex-start-app-overlay" style={{ backgroundImage }}></Overlay>
);

export default HexStartAppOverlay;
