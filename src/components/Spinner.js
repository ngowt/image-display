import React from "react";

export const Spinner = props => {
  return (
    props.isLoading && (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p />
      </div>
    )
  );
};
