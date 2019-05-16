import React from "react";
import { ImageCard } from "../ImageCard/ImageCard";
import "./ImageColumn.css";

export const ImageColumn = ({ images, numColumns }) => {
  const imgCards = images.map(image => {
    return <ImageCard key={image.id} image={image} numColumns={numColumns} />;
  });
  return <div className={`img__col img__col-${numColumns}`}>{imgCards}</div>;
};
