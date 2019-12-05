import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ yarn }) => {
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
            backgroundImage: `url(${yarn.imagePath})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          data-holder-rendered="true"
        ></div>
        <div className="card-body">
          <p className="card-text">
            {yarn.brand} - {yarn.name}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group w-100">
              <Link
                to={`/yarns/edit/${yarn._id}`}
                className="btn w-50 btn-outline-secondary"
              >
                Edit
              </Link>

              <button type="button" className="btn w-50 btn-outline-secondary">
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
