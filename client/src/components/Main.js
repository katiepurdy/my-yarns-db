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
    axios.get('http://localhost:5000/api/knitters').then(response => {
      this.setState({
        data: response.data
      });
    });
  }

  generateCards() {
    return this.state.data.map((knitter, i) => {
      return (
        <Card
          firstName={knitter.firstName}
          lastName={knitter.lastName}
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
