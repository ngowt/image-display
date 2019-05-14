import React from "react";

export const Spinner = props => {
  return (
    props.isLoading && <div className="ui active centered inline loader" />
  );
};
