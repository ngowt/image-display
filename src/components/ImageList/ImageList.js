import React from "react";
import { ImageColumn } from "../ImageColumn/ImageColumn";
import "./ImageList.css";

export const ImageList = ({
  imageColumns,
  numColumns,
  onImageClickedEvent
}) => {
  const onImageClickedEventHandler = image => {
    onImageClickedEvent(image);
  };
  const cols = imageColumns.map((column, index) => (
    <ImageColumn
      key={`col-${index}`}
      images={column}
      numColumns={numColumns}
      onImageClickedEvent={onImageClickedEventHandler}
    />
  ));
  return <div className="image-list">{cols}</div>;
};
