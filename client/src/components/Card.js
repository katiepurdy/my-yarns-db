import React from 'react';

const Card = props => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <div className="card-body">
          <p className="card-text">
            {props.firstName} {props.lastName}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View Yarns
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
