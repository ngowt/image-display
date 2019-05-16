import React from "react";
import "./ImageCard.css";

export const ImageCard = ({ image, numColumns }) => {
  const { alt_description, urls, likes, user, links, color } = image;
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
            alt={alt_description}
            src={urls.regular}
          />
        </div>
        <div className="content">
          <span className="right floated">
            <a href={links.download} target="_blank" rel="noopener noreferrer">
              <i className="download icon" />
            </a>
          </span>
          <i className="heart outline like icon" />
          {likes} likes
        </div>
      </div>
    </div>
  );
};
