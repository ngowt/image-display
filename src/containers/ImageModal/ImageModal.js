import React from "react";
import { unsplash } from "../../api/unsplash";
import { Button, Image, Modal, Icon } from "semantic-ui-react";
import { ImageStats } from "../../components/ImageStats/ImageStats";

export class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.image.likes,
      downloads: 0,
      views: 0
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.image;
    const response = await unsplash.get(`/photos/${id}/statistics`);
    this.setState({
      likes: response.data.likes.total,
      downloads: response.data.downloads.total,
      views: response.data.views.total
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
          <Modal.Header className="modal__header">
            <a href={user.links.html} target="_blank" rel="noopener noreferrer">
              <Image
                floated="left"
                size="mini"
                src={user.profile_image.small}
                style={{ borderRadius: "50%" }}
              />
            </a>
            <Modal.Header>
              <a
                href={user.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.name}
              </a>
            </Modal.Header>
          </Modal.Header>
          <Modal.Content image>
            <a href={links.html} target="_blank" rel="noopener noreferrer">
              <Image wrapped src={urls.regular} />
            </a>
          </Modal.Content>
          <Modal.Content>
            <ImageStats
              likes={this.state.likes}
              downloads={this.state.downloads}
              views={this.state.views}
            />
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
