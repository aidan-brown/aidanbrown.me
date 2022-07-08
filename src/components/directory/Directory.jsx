import React from 'react';
import propTypes from 'prop-types';
import './Directory.scss';
import Window from '../window/Window';
import IconGrid from './IconGrid';
import { folderIcon } from '../../assets/images';

const Directory = ({
  windowName,
  initialTransform,
  iconSrc,
  index,
  id,
  icons,
}) => (
  <Window
    windowName={windowName}
    initialTransform={initialTransform}
    iconSrc={iconSrc}
    className="Directory"
    id={id}
    index={index}
  >
    <IconGrid icons={icons} />
  </Window>
);

Directory.propTypes = {
  windowName: propTypes.string.isRequired,
  initialTransform: propTypes.shape({
    x: propTypes.number,
    y: propTypes.number,
    w: propTypes.number,
    h: propTypes.number,
  }),
  iconSrc: propTypes.string,
  index: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  icons: propTypes.arrayOf(propTypes.node).isRequired,
};

Directory.defaultProps = {
  initialTransform: {
    w: 500,
    h: 500,
  },
  iconSrc: folderIcon,
};

export default Directory;
