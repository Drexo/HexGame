import React from "react";
import {
  FlexBoxCol,
  FlexBoxRowBetween,
} from "./styled/styled";

const HeaderCTA: React.FC = () => {
  return (
    <FlexBoxCol>
      <FlexBoxRowBetween>
        <div className="terminal-btn">
          <img src="./img/terminal-icon.svg" alt="terminal icon" />
          Terminal
        </div>
        <div className="exp-btn">
          <img src="./img/exp-icon.png" alt="exp icon" />
          10000
        </div>
      </FlexBoxRowBetween>
    </FlexBoxCol>
  );
}

export default HeaderCTA;
