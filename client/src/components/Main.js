import React from 'react';
import Card from './Card';
import dataService from '../services/dataService';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yarns: []
    };
  }

  componentDidMount() {
    dataService.getYarns((err, yarns) => {
      if (err) return console.log(err);
      this.setState({ yarns });
    });
  }

  generateCards() {
    return this.state.yarns.map((yarn, i) => {
      return <Card yarn={yarn} key={i} />;
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
            <div className="row">
              {this.state.yarns && this.generateCards()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
