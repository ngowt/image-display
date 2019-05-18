import React from "react";
import { unsplash } from "../../api/unsplash";
import { Button, Image, Modal, Icon, Comment } from "semantic-ui-react";
import { ImageStats } from "../../components/ImageStats/ImageStats";
import "./ImageModal.css";

export class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: {
        likes: { total: this.props.image.likes, change: 0 },
        downloads: { total: 0, change: 0 },
        views: { total: 0, change: 0 }
      }
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.image;
    const response = await unsplash.get(`/photos/${id}/statistics`);
    this.setState({
      statistics: {
        likes: {
          total: response.data.likes.total,
          change: response.data.likes.historical.change
        },
        downloads: {
          total: response.data.downloads.total,
          change: response.data.downloads.historical.change
        },
        views: {
          total: response.data.views.total,
          change: response.data.views.historical.change
        }
      }
    });
  };

  onDownloadHandler = () => {
    const { id } = this.props.image;
    unsplash.get(`/photos/${id}/download`);
  };

  render = () => {
    const { image, showModal, closeEvent } = this.props;
    const { urls, user, links } = image;
    return (
      <div>
        <Modal
          dimmer="blurring"
          open={showModal}
          onClose={closeEvent}
          closeIcon
        >
          <Modal.Header className="img-modal__header">
            <div className="content">
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
          </Modal.Header>
          <Modal.Content image className="img-modal__content">
            <a href={links.html} target="_blank" rel="noopener noreferrer">
              <Image wrapped src={urls.regular} />
            </a>
          </Modal.Content>
          <Modal.Content className="img-modal__content">
            <ImageStats statistics={this.state.statistics} />
          </Modal.Content>
          <Modal.Actions>
            <a href={urls.full} target="_blank" rel="noopener noreferrer">
              <Button color="green" onClick={this.onDownloadHandler} inverted>
                <Icon name="download" /> Download
              </Button>
            </a>
            <Button color="red" onClick={closeEvent} inverted>
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  };
}
