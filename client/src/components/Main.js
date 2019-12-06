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

  handleDelete = (e, id, brand, name) => {
    let confirmation = window.confirm(
      `Are you sure you want to delete "${brand} - ${name}"?`
    );
    if (confirmation === true) {
      dataService.deleteYarn(id, success => {
        if (success) {
          const yarns = this.state.yarns.filter(yarn => yarn._id !== id);
          this.setState({ yarns });
        }
      });
    }
  };

  generateCards() {
    if (!this.state.yarns) return null;
    return this.state.yarns.map((yarn, i) => {
      return <Card yarn={yarn} key={i} onDelete={this.handleDelete} />;
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
