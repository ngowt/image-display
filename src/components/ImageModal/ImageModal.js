import React from "react";
import { Button, Image, Modal, Icon, Statistic } from "semantic-ui-react";
import "./ImageModal.css";

export const ImageModal = ({ image, showModal, closeEvent }) => {
  const { urls, user, likes, links } = image;
  console.log(image);
  return (
    <div>
      <Modal dimmer="blurring" open={showModal} onClose={closeEvent} closeIcon>
        <Modal.Header className="modal__header">
          <a
            href={user ? user.links.html : ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              floated="left"
              size="mini"
              src={user ? user.profile_image.small : ""}
              style={{ borderRadius: "50%" }}
            />
          </a>
          <Modal.Header>
            <a
              href={user ? user.links.html : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user ? user.name : ""}
            </a>
          </Modal.Header>
        </Modal.Header>
        <Modal.Content image>
          <Image wrapped src={urls ? urls.regular : ""} />
        </Modal.Content>
        <Modal.Content>
          <Statistic.Group>
            <Statistic>
              <Statistic.Value>
                <Icon name="heart" />
                {likes}
              </Statistic.Value>
              <Statistic.Label>likes</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                <Icon name="download" />
                31,200
              </Statistic.Value>
              <Statistic.Label>Downloads</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                <Icon name="eye" />
                628
              </Statistic.Value>
              <Statistic.Label>Views</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Modal.Content>
        <Modal.Actions>
          <a
            href={links ? links.download : ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="green" onClick={closeEvent} inverted>
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
