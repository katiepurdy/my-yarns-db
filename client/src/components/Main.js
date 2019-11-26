import React from 'react';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URI}/yarns`).then(response => {
      this.setState({
        data: response.data
      });
    });
  }

  generateCards() {
    return this.state.data.map((yarn, i) => {
      return (
        <Card
          brand={yarn.brand}
          name={yarn.name}
          imagePath={yarn.imagePath}
          key={i.toString()}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search this site"
              />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">{this.generateCards()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
