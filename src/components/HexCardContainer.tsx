import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  position: absolute;
  left: -15px;
  top: 0;
  right: -15px;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BuildingSingle = styled.div<{ level?: number }>`
  background: ${({ level }) => `url(./img/buildings/level${level || 1}.svg)`};
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  width: 116px;
  height: 80px;
`;

interface HexCardContainerProps {
  backgroundImage: string;
  zIndex: number;
  opacity: number;
  transformScale: number;
  BuildingLevelFirst: number;
  BuildingLevelSecond: number;
  BuildingLevelThird: number;
  selectedCellId: string | null;
  onBackClick: () => void;
}

const HexCardContainer: React.FC<HexCardContainerProps> = ({ backgroundImage, zIndex, opacity, transformScale, selectedCellId, BuildingLevelFirst, BuildingLevelSecond, BuildingLevelThird, onBackClick }) => (
  <CardContainer
    className="hex-card-container"
    style={{
      backgroundImage,
      zIndex,
      opacity,
      transform: `scale(${transformScale})`,
      transition: 'opacity 1s, transform 1s',
      backgroundPosition: 'center',
    }}
  >
    <div className="hex-card--back" onClick={onBackClick}>
      <img src="./img/back.svg" alt="back" />
    </div>
    <div className="hex-card--main buildings">
      <BuildingSingle className={`building__single ${selectedCellId}-1`} level={BuildingLevelFirst}></BuildingSingle>
      <BuildingSingle className={`building__single ${selectedCellId}-2`} level={BuildingLevelSecond}></BuildingSingle>
      <BuildingSingle className={`building__single ${selectedCellId}-3`} level={BuildingLevelThird}></BuildingSingle>
    </div>
  </CardContainer>
);

export default HexCardContainer;
