import "./ImageList.css";

import { ImageColumn } from "../ImageColumn/ImageColumn";
import React from "react";

export const ImageList = ({ columns }) => {
  const cols = columns.map((column, index) => (
    <ImageColumn key={`col-${index}`} images={column} />
  ));
  return <div className="image-list">{cols}</div>;
  /*
  const images = props.images.map(image => {
    const { id, description, urls } = image;
    return (
      <ImageCard alt={description} key={id} src={urls.regular} image={image} />
    );
  });
  
  return <div className="image-list" />;
  */
};
