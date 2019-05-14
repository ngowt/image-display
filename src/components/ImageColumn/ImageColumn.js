import React from "react";
import { ImageCard } from "../ImageCard/ImageCard";
import "./ImageColumn.css";

export const ImageColumn = ({ images }) => {
  const imgCards = images.map(image => {
    const { id, alt_description, urls } = image;
    return (
      <ImageCard
        alt={alt_description}
        key={id}
        src={urls.regular}
        image={image}
      />
    );
  });
  return <div className="img__col">{imgCards}</div>;
};
