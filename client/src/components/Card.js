import React from 'react';

const Card = props => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <div
          className="card-img-top"
          alt="Skein of yarn"
          style={{
            height: 225,
            width: '100%',
            display: 'block',
            backgroundImage: `url(${props.imagePath})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          data-holder-rendered="true"
        ></div>
        <div className="card-body">
          <p className="card-text">
            {props.brand} - {props.name}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View Details
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
