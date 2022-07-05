import React, {
  useState, useEffect, useRef, cloneElement,
} from 'react';
import './Desktop.scss';
import { IconGrid, Window } from '../components';
import subpages from './subpages';
import {
  cali, charlie, haos, imageIcon,
} from '../assets/images';

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    let today = new Date();
    setTime(`${today.getHours()}:${today.getMinutes()}`);
    setInterval(() => {
      today = new Date();
      setTime(`${today.getHours()}:${today.getMinutes()}`);
    }, 60000);
  }, []);

  return <span>{time}</span>;
};

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const openWindowsRef = useRef(openWindows);
  const [activeWindow, setActiveWindow] = useState(0);

  const desktopRef = useRef(null);

  const handleWindowClose = (windowKey) => {
    setOpenWindows(openWindowsRef.current
      .filter((windowElem) => windowElem.props.id !== windowKey));
  };

  const handleFocus = (windowKey) => {
    setActiveWindow(openWindowsRef.current
      .findIndex((windowElem) => windowElem.props.id === windowKey));
  };

  const handleDefocus = (e) => {
    if (e.currentTarget !== e.target && !e.target.className.includes('IconGrid')) return;
    setActiveWindow(null);
  };

  useEffect(() => {
    openWindowsRef.current = openWindows;
  }, [openWindows]);

  useEffect(() => {
    setOpenWindows([
      <Window
        windowName="Landing"
        className="Landing"
        id="Landing"
        handleWindowClose={handleWindowClose}
        handleFocus={handleFocus}
        inititalTransform={{
          w: 500,
          h: 250,
          x: (window.innerWidth / 2) - 450,
          y: (window.innerHeight / 2) - 100,
        }}
        key="Landing"
      >
        <subpages.Landing />
      </Window>,
      <Window
        windowName="cali_20210918.png"
        className="Landing"
        id="cali_20210918"
        handleWindowClose={handleWindowClose}
        handleFocus={handleFocus}
        inititalTransform={{
          w: 300,
          h: 355,
          x: (window.innerWidth / 2) + 70,
          y: (window.innerHeight / 2) - 175,
        }}
        iconSrc={imageIcon}
        key="cali_20210918"
      >
        <img src={cali} alt="A somewhat extra scene of me on cliffs near San Francisco" />
      </Window>,
    ]);

    desktopRef.current.addEventListener('mousedown', handleDefocus);

    return () => {
      if (desktopRef) desktopRef.current.removeEventListener('mousedown', handleDefocus);
    };
  }, []);

  return (
    <>
      <main className="Desktop" style={{ backgroundImage: `url(${charlie})` }} ref={desktopRef}>
        {openWindows.map((windowElem, index) => {
          if (index === activeWindow) {
            return cloneElement(windowElem, { active: true });
          }
          return windowElem;
        })}
        <IconGrid />
      </main>
      <footer className="haos-border Taskbar">
        <button type="button" className="haos-border haos-button Taskbar-button">
          <img src={haos} alt="icon for HAOS" />
          HAOS
        </button>
        <span className="Taskbar-windows">
          {openWindows.map((windowElem, index) => (
            <button
              type="button"
              className={`haos-border haos-button Taskbar-button ${index === activeWindow ? 'active' : ''}`}
              onClick={() => setActiveWindow(index)}
              key={`Taskbar-${windowElem.props.windowName}`}
            >
              <img src={windowElem.props.iconSrc} alt={`icon for ${windowElem.props.windowName}`} />
              {windowElem.props.windowName}
            </button>
          ))}
        </span>
        <span className="Taskbar-controls">
          <Clock />
        </span>
      </footer>
    </>
  );
};

export default Desktop;
