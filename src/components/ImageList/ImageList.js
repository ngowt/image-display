import React from "react";
import { ImageColumn } from "../ImageColumn/ImageColumn";
import "./ImageList.css";

export const ImageList = ({ imageColumns, numColumns }) => {
  const cols = imageColumns.map((column, index) => (
    <ImageColumn key={`col-${index}`} images={column} numColumns={numColumns} />
  ));
  return <div className="image-list">{cols}</div>;
};
