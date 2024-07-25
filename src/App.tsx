import React, { useState, useEffect } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";

const StyledApp = styled.div`
  color: white;
  min-height: 100dvh;
  background: url('./img/bg1.png');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
`;

const AppContainer = styled.div`
  max-width: 360px;
  margin: 0 auto;
  position: relative;
  color: #fff;
  height: calc(100dvh - 30px);
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const honeycombData = [
  [
    { id: 'honey-1'},
    { id: 'honey-2', background: 'url(./img/bg2.png)', isActive: true, backgroundCard: 'url(./img/bg2.png)'},
  ],
  [
    { id: 'honey-3'},
    { id: 'honey-4', background: 'url(./img/bg1.png)', isActive: true },
    { id: 'honey-5'},
  ],
  [
    { id: 'honey-6'},
    { id: 'honey-7'},
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
  const [overlayIndexCard, setOverlayIndexCard] = useState(0);

  useEffect(() => {
    WebApp.expand();
  }, []);
  
  const handleCellClick = (dataAttr: string) => {
    const cell = honeycombData.flat().find(cell => cell.id === dataAttr);
    if (cell?.isActive && cell.background) {
      setOverlayBackground(cell.background);
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

  const resetHexCardContainer = () => {
    setOverlayOpacityCard(0);
    setOverlayScaleCard(1.4);
    setOverlayIndexCard(0);
  }

  return (
    <StyledApp>
    <div className="hex-card-container" style={{ backgroundImage: overlayBackground, zIndex: overlayIndexCard, opacity: overlayOpacityCard, transform: `scale(${overlayScaleCard})`, transition: "opacity 1s, transform 1s"}}>
      <div className="hex-card--back" onClick={resetHexCardContainer}><img src="./img/back.svg" alt="back" /></div>
      <div className="hex-card--main">

      </div>
    </div>
      <AppContainer>
        <div className="overlay-hex" style={{ zIndex: overlayIndex }}>
          <div
            className="overlay-hex--image"
            style={{
              opacity: overlayOpacity,
              transform: `scale(${overlayScale})`,
              transition: "opacity 0.6s, transform 1.5s",
              backgroundImage: overlayBackground
            }}
          ></div>
        </div>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
          </FlexBoxRow>
          <Counter />
          <FlexBoxRow>
            <div className="app">
              <div className="honeycomb">
                {honeycombData.map((row, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {row.map(cell => {
                      const style = cell.background 
                        ? { backgroundImage: cell.background } 
                        : { background: '#fff' };
                      return (
                        <div 
                          className={`honeycomb-cell ${cell.isActive ? "active" : ""}`} 
                          data-attr={cell.id} 
                          key={cell.id}
                          onClick={() => handleCellClick(cell.id)}
                        >
                          <div className="honeycomb-cell--single" style={style}></div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </FlexBoxRow>
        </FlexBoxCol>
        <FlexBoxCol className="mt-auto">
          <FlexBoxRow>
            <div className="resources-box width100 text-center">
              <h3><strong>Resources</strong></h3>
              <div className="resouces-box--values">
                <div className="resouces-box--values-single"><img src="./img/r1.png" alt="resource1" />104</div>
                <div className="resouces-box--values-single"><img src="./img/r2.png" alt="resource2" />28</div>
                <div className="resouces-box--values-single"><img src="./img/r3.png" alt="resource3" />10</div>
              </div>
            </div>
          </FlexBoxRow>
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
