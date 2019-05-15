import React from "react";
import { ImageCard } from "../ImageCard/ImageCard";
import "./ImageColumn.css";

export const ImageColumn = ({ images }) => {
  const imgCards = images.map(image => {
    return <ImageCard key={image.id} image={image} />;
  });
  return <div className="img__col">{imgCards}</div>;
};
