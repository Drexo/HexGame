import React from "react";
import {
  FlexBoxCol,
  FlexBoxRow,
} from "./styled/styled";

const ResourcesBox: React.FC = () => {
  return (
    <FlexBoxCol>
      <FlexBoxRow>
        <div className="resources-box width100 text-center">
          <h3><strong>Resources</strong></h3>
          <div className="resouces-box--values">
            test
          </div>
        </div>
      </FlexBoxRow>
    </FlexBoxCol>
  );
}

export default ResourcesBox;
