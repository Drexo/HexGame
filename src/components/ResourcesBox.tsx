import React from "react";
import {
  FlexBoxCol,
  FlexBoxRow,
} from "./styled/styled";

const ResourcesBox: React.FC = () => {
  return (
    <FlexBoxCol className="mt-auto">
      <FlexBoxRow>
        <div className="resources-box width100 text-center">
          <h3><strong>Resources</strong></h3>
          <div className="resouces-box--values">
            <div className="resouces-box--values-single">
              <img src="./img/r1.png" alt="resource1" />104
            </div>
            <div className="resouces-box--values-single">
              <img src="./img/r2.png" alt="resource2" />28
            </div>
            <div className="resouces-box--values-single">
              <img src="./img/r3.png" alt="resource3" />10
            </div>
          </div>
        </div>
      </FlexBoxRow>
    </FlexBoxCol>
  );
}

export default ResourcesBox;
