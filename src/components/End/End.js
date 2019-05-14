import React from "react";
import "./End.css";

export const End = props => {
  return (
    props.isEnd && (
      <div id="end" className="ui green message">
        End of Results
      </div>
    )
  );
};
