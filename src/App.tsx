import React, { useState } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #000;
  color: white;
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 360px;
  margin: 0 auto;
  background: url('src/assets/img/bg1.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px 15px 100px;
  position: relative;
  color: #fff;
  overflow: hidden;
`;

const honeycombData = [
  [
    { id: 'honey-1'},
    { id: 'honey-2'},
  ],
  [
    { id: 'honey-3'},
    { id: 'honey-4', background: 'url(src/assets/img/bg1.png)', isActive: true },
    { id: 'honey-5'},
  ],
  [
    { id: 'honey-6'},
    { id: 'honey-7'},
  ],
];

const App: React.FC = () => {
  const { network } = useTonConnect();

  const handleCellClick = (dataAttr: string) => {
    console.log(dataAttr);
  };

  return (
    <StyledApp>
      <AppContainer>
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
        <FlexBoxCol>
          <FlexBoxRow>
            <div className="resources-box width100 text-center">
              <h3><strong>Resources</strong></h3>
              <div className="flex">
                <div></div>
              </div>
            </div>
          </FlexBoxRow>
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
