//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

export class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let { title, year, genre, actors, plot, poster } = this.props.movie;
    return (
      <div>
        <Card>
          <CardImg
            style={{ height: '300px' }}
            onClick={this.toggle}
            top
            width="200px"
            src={poster}
            alt="Card image cap"
          />
        </Card>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <div class="row">
              <Col sm="6">
                <img
                  style={{ marginRight: '20px' }}
                  width="250px"
                  height="300px"
                  src={poster}
                />
              </Col>

              <Col sm="6">
                <ListGroup style={{ marginLeft: '10px' }}>
                  <ListGroupItem>
                    <b>Details</b>
                  </ListGroupItem>
                  <ListGroupItem
                    style={{ fontSize: '12px', textAlign: 'left' }}
                  >
                    Title : {title}
                  </ListGroupItem>
                  <ListGroupItem
                    style={{ fontSize: '12px', textAlign: 'left' }}
                  >
                    Plot : {plot}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </div>
          </ModalBody>
          <ModalFooter>
            {' '}
            <Button
              color="danger"
              onClick={() => this.props.removeMovie(title)}
            >
              Delete
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MovieCard;
