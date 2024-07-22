// src/App.tsx
import React, { useState } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const App: React.FC = () => {
  const { network } = useTonConnect();
  const [activeCell, setActiveCell] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const dataAttr = target.getAttribute('data-attr');
    if (dataAttr) {
      setActiveCell(dataAttr);
      console.log(dataAttr);
    }
  };

  const handleCloseClick = () => {
    setActiveCell(null);
  };

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
          </FlexBoxRow>
          <FlexBoxRow>
            <div className={`app ${activeCell ? "active-cell" : ""}`}>
              <div className="honeycomb" onClick={handleClick}>
                <div className="honeycomb-close" onClick={handleCloseClick}><svg height="64" width="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775" xml:space="preserve"><path d="M285.08 230.397 456.218 59.27c6.076-6.077 6.076-15.911 0-21.986L423.511 4.565a15.55 15.55 0 0 0-21.985 0l-171.138 171.14L59.25 4.565a15.551 15.551 0 0 0-21.985 0L4.558 37.284c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128L4.575 401.505c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719a15.555 15.555 0 0 0 21.986 0l171.117-171.12 171.118 171.12a15.551 15.551 0 0 0 21.985 0l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986L285.08 230.397z"/></svg></div>
                <div className="row top-row">
                  <div className={`honeycomb-cell ${activeCell === "honey-1" ? "active" : ""}`} data-attr="honey-1"></div>
                  <div className={`honeycomb-cell ${activeCell === "honey-2" ? "active" : ""}`} data-attr="honey-2"></div>
                </div>
                <div className="row middle-row">
                  <div className={`honeycomb-cell ${activeCell === "honey-3" ? "active" : ""}`} data-attr="honey-3"></div>
                  <div className={`honeycomb-cell honeycomb-cell--main ${activeCell === "honey-4" ? "active" : ""}`} data-attr="honey-4"></div>
                  <div className={`honeycomb-cell ${activeCell === "honey-5" ? "active" : ""}`} data-attr="honey-5"></div>
                </div>
                <div className="row bottom-row">
                  <div className={`honeycomb-cell ${activeCell === "honey-6" ? "active" : ""}`} data-attr="honey-6"></div>
                  <div className={`honeycomb-cell ${activeCell === "honey-7" ? "active" : ""}`} data-attr="honey-7"></div>
                </div>
              </div>
            </div>
          </FlexBoxRow>
          <Counter />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
