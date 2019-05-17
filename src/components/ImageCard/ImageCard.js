import React from "react";
import { unsplash } from "../../api/unsplash";
import "./ImageCard.css";

export const ImageCard = ({ image, numColumns, onImageClickedEvent }) => {
  const { alt_description, urls, likes, user, color } = image;

  const onImageClickedHandler = image => {
    onImageClickedEvent(image);
  };

  const onDownloadHandler = () => {
    const { id } = image;
    unsplash.get(`/photos/${id}/download`);
  };

  return (
    <div className="img-card__div">
      <div className={`ui card img-card__div-${numColumns}`}>
        <div className="content" style={{ backgroundColor: color }}>
          <a href={user.links.html} target="_blank" rel="noopener noreferrer">
            <img
              className="ui avatar image"
              src={user.profile_image.small}
              alt={alt_description}
            />
          </a>
          <a href={user.links.html} target="_blank" rel="noopener noreferrer">
            {user.name}
          </a>
        </div>
        <div className="image">
          <img
            className="img-card__img"
            src={urls.regular}
            alt={alt_description}
            onClick={() => onImageClickedHandler(image)}
          />
        </div>
        <div className="content">
          <span className="right floated">
            <a href={urls.full} target="_blank" rel="noopener noreferrer">
              <i
                className="download icon"
                onClick={() => onDownloadHandler()}
              />
            </a>
          </span>
          <i className="red heart icon" />
          {likes} likes
        </div>
      </div>
    </div>
  );
};
