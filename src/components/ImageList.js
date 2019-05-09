import "./ImageList.css";
import { ImageCard } from "./ImageCard";
import React from "react";

export const ImageList = props => {
  const images = props.images.map(image => {
    const { id, description, urls } = image;
    return (
      <ImageCard alt={description} key={id} src={urls.regular} image={image} />
    );
  });

  return <div className="image-list">{images}</div>;
};
