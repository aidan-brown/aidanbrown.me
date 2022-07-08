import React from 'react';
import propTypes from 'prop-types';
import './IconGrid.scss';

const IconGrid = ({
  icons,
}) => (
  <div className="IconGrid">
    {icons}
  </div>
);

IconGrid.propTypes = {
  icons: propTypes.arrayOf(propTypes.node),
};

IconGrid.defaultProps = {
  icons: [],
};

export default IconGrid;
