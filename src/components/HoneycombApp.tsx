import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100%;
`;

const HoneycombWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 330px;
    position: relative;
    margin: 0 -140px;
    padding: 20px 0;
`;

interface HoneycombAppProps {
  honeycombData: Array<Array<{ id: string; background?: string; isActive?: boolean; mainHex?: boolean; backgroundCard?: string }>>;
  onCellClick: (dataAttr: string) => void;
}

const HoneycombApp: React.FC<HoneycombAppProps> = ({ honeycombData, onCellClick }) => (
  <AppWrapper className="app">
    <HoneycombWrapper className="honeycomb">
      {honeycombData.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map(cell => {
            const style = cell.background 
              ? cell.mainHex
                ? { 
                    background: `url(./img/main-hex.svg), ${cell.background}`, 
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto, cover', 
                    backgroundPosition: 'center'
                  }
                : { backgroundImage: cell.background } 
              : { 
                  background: 'url(./img/lock.svg), #fff',
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'center', 
                  backgroundSize: '40px' 
                };
            return (
              <div
                className={`honeycomb-cell ${cell.isActive ? 'active' : 'hex-icon-lock'} ${cell.mainHex ? 'hex-icon-main' : ''}`}
                data-attr={cell.id}
                key={cell.id}
                onClick={() => onCellClick(cell.id)}
              >
                <div className="honeycomb-cell--single" style={style}></div>
              </div>
            );
          })}
        </div>
      ))}
    </HoneycombWrapper>
  </AppWrapper>
);

export default HoneycombApp;
