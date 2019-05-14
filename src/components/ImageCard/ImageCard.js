import React from "react";

export const ImageCard = ({ image }) => {
  const { alt_description, urls } = image;
  return (
    <div>
      <img alt={alt_description} src={urls.regular} />
    </div>
  );
};
