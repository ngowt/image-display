import React from "react";
import { unsplash } from "../../api/unsplash";
import { Comment } from "semantic-ui-react";
import "./ImageCard.css";

export const ImageCard = ({ image, numColumns, onImageClickedEvent }) => {
  const { alt_description, urls, likes, user } = image;

  const onImageClickedHandler = image => {
    onImageClickedEvent(image);
  };

  const onDownloadHandler = () => {
    const { id } = image;
    unsplash.get(`/photos/${id}/download`);
  };

  return (
    <div className="img-card__div animated slideInUp">
      <div className={`ui card img-card__div-${numColumns}`}>
        <div className="content img-card__header animated fadeIn slower">
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                src={user.profile_image.small}
                href={user.links.html}
                target="_blank"
              />
              <Comment.Content>
                <Comment.Author href={user.links.html} target="_blank">
                  {user.name}
                </Comment.Author>
                <Comment.Text>
                  <a
                    href={`https://www.instagram.com/${
                      user.instagram_username
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.instagram_username
                      ? `@${user.instagram_username}`
                      : ""}
                  </a>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </div>
        <div className="image animated fadeIn slower">
          <img
            className="img-card__img"
            src={urls.regular}
            alt={alt_description}
            onClick={() => onImageClickedHandler(image)}
          />
        </div>
        <div className="content img-card__content animated fadeIn slower">
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
