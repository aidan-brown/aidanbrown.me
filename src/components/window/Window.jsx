import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import './Window.scss';
import { folderIcon } from '../../assets/images';

const Window = ({
  windowName,
  handleWindowClose,
  handleFocus,
  inititalTransform,
  iconSrc,
  active,
  titlebarStyle,
  className,
  id,
  children,
}) => {
  const [transform, setTransform] = useState(inititalTransform);
  const transformRef = useRef(transform);
  const [events, setEvents] = useState({ drag: false, resizeX: false, resizeY: false });
  const eventsRef = useRef(events);

  const windowRef = useRef(null);
  const titlebarRef = useRef(null);

  useEffect(() => {
    let prevPosition = null;
    let windowSize = { w: window.innerWidth, h: window.innerHeight };

    const handleTitlebarMouseDown = (e) => {
      prevPosition = { x: e.clientX, y: e.clientY };
      eventsRef.current = { ...events, drag: true };
      setEvents(eventsRef.current);
    };

    const handleWindowMouseDown = (e) => {
      handleFocus(id);
      if (e.target !== e.currentTarget) return;
      prevPosition = { x: e.clientX, y: e.clientY };
      const relPosition = {
        x: e.clientX - transformRef.current.x,
        y: e.clientY - transformRef.current.y,
      };
      if (relPosition.x < 10) {
        eventsRef.current = { ...events, resizeX: 'left' };
      } else if (relPosition.x > transformRef.current.w - 10) {
        eventsRef.current = { ...eventsRef.current, resizeX: 'right' };
      } else {
        eventsRef.current = { ...eventsRef.current, resizeX: false };
      }
      if (relPosition.y < 10) {
        eventsRef.current = { ...eventsRef.current, resizeY: 'up' };
      } else if (relPosition.y > transformRef.current.h - 10) {
        eventsRef.current = { ...eventsRef.current, resizeY: 'down' };
      } else {
        eventsRef.current = { ...eventsRef.current, resizeY: false };
      }
      setEvents(eventsRef.current);
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (!eventsRef.current.drag
        && !eventsRef.current.resizeX
        && !eventsRef.current.resizeY) return;
      const delta = { x: e.clientX - prevPosition.x, y: e.clientY - prevPosition.y };
      prevPosition = { x: e.clientX, y: e.clientY };
      if (eventsRef.current.drag) {
        if (e.clientX !== 0 && e.clientY !== 0) {
          transformRef.current = {
            ...transformRef.current,
            x: transformRef.current.x + delta.x,
            y: transformRef.current.y + delta.y,
          };
          setTransform(transformRef.current);
        }
      } else if (eventsRef.current.resizeX || eventsRef.current.resizeY) {
        if (e.clientX !== 0 && e.clientY !== 0) {
          if (eventsRef.current.resizeX === 'left' && (transformRef.current.w > 250 || delta.x < 0)) {
            transformRef.current = {
              ...transformRef.current,
              x: transformRef.current.x + delta.x,
              w: transformRef.current.w - delta.x,
            };
          } else if (eventsRef.current.resizeX === 'right') {
            transformRef.current = {
              ...transformRef.current,
              w: transformRef.current.w + delta.x,
            };
          }
          if (eventsRef.current.resizeY === 'up' && (transformRef.current.h > 250 || delta.y < 0)) {
            transformRef.current = {
              ...transformRef.current,
              y: transformRef.current.y + delta.y,
              h: transformRef.current.h - delta.y,
            };
          } else if (eventsRef.current.resizeY === 'down') {
            transformRef.current = {
              ...transformRef.current,
              h: transformRef.current.h + delta.y,
            };
          }

          setTransform(transformRef.current);
        }
      }
    };

    const handleMouseUp = () => {
      prevPosition = null;
      eventsRef.current = { drag: false, resizeX: false, resizeY: false };
      setEvents(eventsRef.current);
    };

    const handleResize = () => {
      const delta = { x: window.innerWidth - windowSize.w, y: window.innerHeight - windowSize.h };
      windowSize = { w: window.innerWidth, h: window.innerHeight };
      transformRef.current = {
        ...transformRef.current,
        x: transformRef.current.x + (delta.x / 2),
        y: transformRef.current.y + (delta.y / 2),
      };
      setTransform(transformRef.current);
    };

    windowRef.current.addEventListener('mousedown', handleWindowMouseDown);
    titlebarRef.current.addEventListener('mousedown', handleTitlebarMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      if (windowRef.current) windowRef.current.removeEventListener('mousedown', handleWindowMouseDown);
      if (titlebarRef.current) titlebarRef.current.removeEventListener('mousedown', handleTitlebarMouseDown);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <span
      className="haos-border Window"
      id={id}
      ref={windowRef}
      style={{
        left: `${transform.x}px`,
        top: `${transform.y}px`,
        width: `${transform.w}px`,
        height: `${transform.h}px`,
      }}
    >
      <div
        className="Window-titlebar"
        style={active
          ? { backgroundColor: titlebarStyle.color, color: titlebarStyle.fontColor }
          : { backgroundColor: 'gray', color: 'darkgray' }}
        ref={titlebarRef}
      >
        <img className="Window-titlebar-icon" src={iconSrc} alt={`icon for ${windowName} window`} />
        <h2 className="Window-titlebar-text">{windowName}</h2>
        <button type="button" className="haos-border haos-button Window-titlebar-control" onClick={() => handleWindowClose(id)}>X</button>
      </div>
      <div className={`Window-content ${className}`}>
        {children}
      </div>
    </span>
  );
};

Window.propTypes = {
  windowName: propTypes.string.isRequired,
  handleWindowClose: propTypes.func.isRequired,
  handleFocus: propTypes.func.isRequired,
  inititalTransform: propTypes.shape({
    x: propTypes.number,
    y: propTypes.number,
    w: propTypes.number,
    h: propTypes.number,
  }),
  iconSrc: propTypes.string,
  active: propTypes.bool,
  titlebarStyle: propTypes.shape({
    color: propTypes.string,
    fontColor: propTypes.string,
  }),
  className: propTypes.string,
  id: propTypes.string,
  children: propTypes.node,
};

Window.defaultProps = {
  inititalTransform: {
    x: (window.innerWidth / 2) - 250,
    y: (window.innerHeight / 2) - 250,
    w: 500,
    h: 500,
  },
  iconSrc: folderIcon,
  active: false,
  titlebarStyle: { color: 'darkred', fontColor: 'white' },
  className: '',
  id: '',
  children: null,
};

export default Window;
