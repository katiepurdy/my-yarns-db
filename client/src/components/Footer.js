import React from 'react';
import '../css/footer.css';

const Footer = props => {
  return (
    <footer className="text-muted bg-dark">
      <div className="container">
        <p className="float-right">
          <a href="/#">Back to top</a>
        </p>
        <p>Full-Stack Programming - Assignment 4 - Katie Purdy</p>
      </div>
    </footer>
  );
};

export default Footer;
