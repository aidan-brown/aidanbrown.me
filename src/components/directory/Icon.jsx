import React, { useContext, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { fileIcon } from '../../assets/images';
import WindowControlContext from '../window/WindowControlContext';

const Icon = ({
  iconSrc,
  iconName,
  onClick,
}) => {
  const iconRef = useRef(null);
  const markTextRef = useRef(null);
  const WindowControl = useContext(WindowControlContext);
  const themeRef = useRef(WindowControl.theme);

  useEffect(() => {
    themeRef.current = WindowControl.theme;
    if (markTextRef.current.className === 'mark-active') {
      markTextRef.current.style.backgroundColor = themeRef.current.highlight;
      markTextRef.current.style.color = themeRef.current.font;
    }
  }, [WindowControl.theme]);

  useEffect(() => {
    const handleOnClick = () => {
      document.querySelectorAll('.mark-active').forEach((activeMark) => {
        // eslint-disable-next-line no-param-reassign
        activeMark.className = '';
        activeMark.removeAttribute('style');
      });
      markTextRef.current.className = 'mark-active';
      markTextRef.current.style.backgroundColor = themeRef.current.highlight;
      markTextRef.current.style.color = themeRef.current.font;
    };

    if (!isMobile) {
      iconRef.current.addEventListener('mousedown', handleOnClick);
    } else {
      iconRef.current.addEventListener('touchstart', handleOnClick);
    }

    return () => {
      if (!isMobile) {
        iconRef.current.removeEventListener('mousedown', handleOnClick);
      } else {
        iconRef.current.removeEventListener('touchstart', handleOnClick);
      }
    };
  }, []);

  return (
    <span className="Icon" onDoubleClick={onClick} ref={iconRef} draggable>
      <img className="Icon-icon" src={iconSrc} alt={`icon for ${iconName}`} />
      <p className="Icon-text"><mark ref={markTextRef}>{iconName}</mark></p>
    </span>
  );
};

Icon.propTypes = {
  iconSrc: propTypes.string,
  iconName: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

Icon.defaultProps = {
  iconSrc: fileIcon,
};

export default Icon;
