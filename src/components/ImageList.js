import React from "react";

export const ImageList = props => {
  const images = props.images.map(el => {
    const { description, id, urls } = el;
    return <img alt={description} key={id} src={urls.regular} />;
  });

  return <div>{images}</div>;
};
