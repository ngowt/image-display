import React from "react";
import { ImageColumn } from "../ImageColumn/ImageColumn";
import "./ImageList.css";

export const ImageList = ({ columns }) => {
  const cols = columns.map((column, index) => (
    <ImageColumn key={`col-${index}`} images={column} />
  ));
  return <div className="image-list">{cols}</div>;
};
