import React, { Component } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import axios from 'axios';
import Carousal from './Carousal';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      movies: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getAllMovies = () => {
    axios
      .get('https://floating-peak-25841.herokuapp.com/getallmovies')
      .then(result => {
        this.setState({ movies: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllMovies();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://floating-peak-25841.herokuapp.com/getmovie?title=${
      this.state.title
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeMovie(title) {
    this.setState({
      movies: this.state.movies.filter(movie => {
        if (movie.title !== title) return movie;
      })
    });
    const query = `https://floating-peak-25841.herokuapp.com/deletemovie?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let movieCards = this.state.movies.map(movie => {
      return (
        <Col sm="3" key={movie.title}>
          <MovieCard removeMovie={this.removeMovie.bind(this)} movie={movie} />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <h1
            style={{
              padding: '20px',
              color: '#f9f9f9'
            }}
          >
            <strong>
              <i>New Movie Showing</i>
            </strong>
          </h1>
          <Carousal id="jumboheader" />
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Movie not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label
                    for="title"
                    style={{
                      color: '#f9f9f9',
                      fontSize: '40px',
                      fontFamily: 'Arial, Helvetica, sans-serif;'
                    }}
                  >
                    <strong>
                      <i>Enter movie title</i>
                    </strong>
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter movie title..."
                    onChange={this.onChange}
                    style={{
                      fontSize: '20px',
                      fontFamily: 'Arial, Helvetica, sans-serif;'
                    }}
                  />
                </FormGroup>
                <button type="submit" class="btn btn-info">
                  Add movie
                </button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{movieCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
