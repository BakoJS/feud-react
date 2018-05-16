import React from 'react';
import PropTypes from 'prop-types';

const Panel = props => {
  return (
    <div>
      <div className="col-lg-2 bs-example" />
      <div className="col-lg-8 text-center">{props.children}</div>
      <div className="col-lg-2" />
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired
};

export default Panel;
