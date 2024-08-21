import React, { useState, useEffect } from 'react';
import './App.css';
//import { TonConnectButton } from '@tonconnect/ui-react';
//import { Counter } from './components/Counter';
import styled, { keyframes } from 'styled-components';
import { useTonConnect } from './hooks/useTonConnect';
import WebApp from '@twa-dev/sdk';
import HeaderCTA from './components/HeaderCTA';
import HexStartAppOverlay from './components/HexStartAppOverlay';
import HexCardContainer from './components/HexCardContainer';
import OverlayHex from './components/OverlayHex';
import HoneycombApp from './components/HoneycombApp';
import BuildingModal from './components/BuildingModal';
import ResourcesBox from './components/ResourcesBox';

const scrollBackground = keyframes`
  from {
    background-position: 0 0, 0 0;
  }
  to {
    background-position: 0 0, 0 1000%;
  }
`;

const StyledApp = styled.div`
  color: white;
  min-height: 100dvh;
  background: url('./img/main-bg-static.png'), url('./img/main-bg.png');
  background-size: contain, auto 90%;
  background-repeat: no-repeat, repeat-y;
  overflow: hidden;
  position: relative;
  animation: ${scrollBackground} 20s linear infinite;
  -webkit-tap-highlight-color: transparent;
`;

const AppContainer = styled.div`
  max-width: 360px;
  margin: 0 auto;
  position: relative;
  color: #fff;
  height: calc(100dvh - 30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const honeycombData = [
  [
    { id: 'honey-1' },
    { id: 'honey-2', background: 'url(./img/bg2.png)', isActive: true, backgroundCard: 'url(./img/bg2.png)', BuildingLevelFirst: 0, BuildingLevelSecond: 0, BuildingLevelThird: 0 },
  ],
  [
    { id: 'honey-3' },
    { id: 'honey-4', background: 'url(./img/bg1.png)', isActive: true, mainHex: true, BuildingLevelFirst: 1, BuildingLevelSecond: 1, BuildingLevelThird: 1 },
    { id: 'honey-5' },
  ],
  [
    { id: 'honey-6' },
    { id: 'honey-7' },
  ],
];

const App: React.FC = () => {
  const { network } = useTonConnect();
  const [overlayBackground, setOverlayBackground] = useState("");
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [overlayOpacityCard, setOverlayOpacityCard] = useState(0);
  const [overlayScale, setOverlayScale] = useState(0);
  const [overlayScaleCard, setOverlayScaleCard] = useState(1.4);
  const [overlayIndex, setOverlayIndex] = useState(0);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [overlayIndexCard, setOverlayIndexCard] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const [showCenteredImage, setShowCenteredImage] = useState(true);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    WebApp.expand();
    setTimeout(() => {
      setShowContent(false);
    }, 2000);
    setTimeout(() => {
      setShowCenteredImage(false);
    }, 1500);
  }, []);

  const handleCellClick = (dataAttr: string) => {
    const cell = honeycombData.flat().find(cell => cell.id === dataAttr);
    if (cell?.isActive && cell.background) {
      setOverlayBackground(cell.background);
      setSelectedCellId(cell.id);
      setBuildingLevels({
        BuildingLevelFirst: cell.BuildingLevelFirst || 0,
        BuildingLevelSecond: cell.BuildingLevelSecond || 0,
        BuildingLevelThird: cell.BuildingLevelThird || 0,
      });
      setOverlayIndex(99999);
      setOverlayIndexCard(3);
      setOverlayOpacity(1);
      setOverlayScale(3);
      setTimeout(() => {
        setOverlayOpacity(0);
        setTimeout(() => {
          setOverlayScale(0);
          setOverlayIndex(0);
        }, 1000);
      }, 1500);
      setTimeout(() => {
        setOverlayOpacityCard(1);
        setOverlayScaleCard(1);
      }, 1000);
    }
  };

  const handleBuildingClick = (buildingId: string) => {
    setModalContent(buildingId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const [buildingLevels, setBuildingLevels] = useState({
    BuildingLevelFirst: 0,
    BuildingLevelSecond: 0,
    BuildingLevelThird: 0,
  });

  const resetHexCardContainer = () => {
    setOverlayOpacityCard(0);
    setOverlayScaleCard(1.4);
    setOverlayIndexCard(0);
  };

  return (
    <StyledApp>
      <img
        src="./img/main-logo.png"
        className={`main-logo ${!showCenteredImage ? 'opacity-0' : 'opacity-1 active'}`}
        alt="Centered"
      />
      <HexStartAppOverlay backgroundImage={overlayBackground} />
      <HexCardContainer
        backgroundImage={overlayBackground}
        zIndex={overlayIndexCard}
        opacity={overlayOpacityCard}
        transformScale={overlayScaleCard}
        onBackClick={resetHexCardContainer}
        BuildingLevelFirst={buildingLevels.BuildingLevelFirst}
        BuildingLevelSecond={buildingLevels.BuildingLevelSecond}
        BuildingLevelThird={buildingLevels.BuildingLevelThird}
        selectedCellId={selectedCellId}
        onBuildingClick={handleBuildingClick}
      />
      <OverlayHex
        zIndex={overlayIndex}
        opacity={overlayOpacity}
        transformScale={overlayScale}
        backgroundImage={overlayBackground}
      />
      <AppContainer className={`${!showContent ? 'opacity-1' : 'opacity-0'}`}>
        <HeaderCTA />
        <HoneycombApp honeycombData={honeycombData} onCellClick={handleCellClick} />
        <ResourcesBox />
      </AppContainer>
      <BuildingModal isVisible={isModalVisible} content={modalContent} onClose={closeModal} />
    </StyledApp>
  );
};

export default App;
