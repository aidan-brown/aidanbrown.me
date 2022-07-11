import React, {
  useState, useEffect, useRef, cloneElement, useMemo,
} from 'react';
import propTypes from 'prop-types';
import './Desktop.scss';
import { isMobile } from 'react-device-detect';
import Landing from './subpages/Landing/Landing';
import {
  Icon, IconGrid, Window, WindowControlContext,
} from '../components';
import {
  charlie, colorado, fileIcon, haos, imageIcon,
} from '../assets/images';
import { desktopIcons as defaultIcons } from '../utils/constants';

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const setTimeStr = () => {
      const today = new Date();
      const hours = today.getHours() % 12;
      const minutes = today.getMinutes();
      const ampm = today.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`${hours === 0 ? 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
    };
    const today = new Date();

    setTimeStr();
    setTimeout(() => {
      setTimeStr();
      setInterval(setTimeStr, 60000);
    }, (60 - today.getSeconds()) * 1000);
  }, []);

  return <span>{time}</span>;
};

const ThemeMenu = ({
  theme,
  setTheme,
}) => (
  <>
    <h2>Change Theme</h2>
    <label htmlFor="titlebar">
      Title Bar
      <input
        type="color"
        name="titlebar"
        defaultValue={theme.titlebar}
        onChange={(e) => setTheme({ ...theme, titlebar: e.target.value })}
      />
    </label>
    <label htmlFor="font">
      Font
      <input
        type="color"
        name="font"
        defaultValue={theme.font}
        onChange={(e) => setTheme({ ...theme, font: e.target.value })}
      />
    </label>
    <label htmlFor="Highlight">
      Highlight
      <input
        type="color"
        name="highlight"
        defaultValue={theme.highlight}
        onChange={(e) => setTheme({ ...theme, highlight: e.target.value })}
      />
    </label>
  </>
);

ThemeMenu.propTypes = {
  theme: propTypes.shape({
    titlebar: propTypes.string.isRequired,
    font: propTypes.string.isRequired,
    highlight: propTypes.string.isRequired,
  }).isRequired,
  setTheme: propTypes.func.isRequired,
};

const Desktop = ({
  width,
  height,
}) => {
  const [openWindows, setOpenWindows] = useState([]);
  const openWindowsRef = useRef(openWindows);

  const [activeWindow, setActiveWindow] = useState(0);
  const activeWindowRef = useRef(activeWindow);
  const [activeWindowPosition, setActiveWindowPosition] = useState({
    x: width / 2,
    y: height / 2,
  });
  const activeWindowPositionRef = useRef(activeWindowPosition);

  const [windowStack, setWindowStack] = useState([]);
  const windowStackRef = useRef(windowStack);

  const [theme, setTheme] = useState({ titlebar: '#db0b81', font: '#ffffff', highlight: '#ff0090' });
  const [mainMenu, setMainMenu] = useState(null);
  const [isMainMenuOpen, setMainMenuOpen] = useState(false);

  const desktopRef = useRef(null);

  const handleWindowClose = (windowKey) => {
    setOpenWindows(openWindowsRef.current
      .filter((windowElem) => windowElem.props.id !== windowKey));
  };

  const handleFocus = (windowKey) => {
    const windowIndex = openWindowsRef.current
      .findIndex((windowElem) => windowElem.props.id === windowKey);
    setActiveWindow(windowIndex);
  };

  const handleDefocus = (e) => {
    if ((!e.target.parentElement.className.includes('Desktop')) || (e.target.className.includes('Window'))) return;
    document.querySelectorAll('.mark-active').forEach((activeMark) => {
      // eslint-disable-next-line no-param-reassign
      activeMark.className = '';
      activeMark.removeAttribute('style');
    });
    setMainMenuOpen(false);
    setActiveWindow(null);
  };

  const handleWindowOpen = (windowElem) => {
    const windowIndex = openWindowsRef.current
      .findIndex((window) => window.props.id === windowElem.props.id);

    if (windowIndex !== -1) {
      setActiveWindow(windowIndex);
      return;
    }

    setOpenWindows([...openWindowsRef.current, windowElem]);
  };

  const getZIndex = (id) => {
    const windowIndex = openWindowsRef.current
      .findIndex((window) => window.props.id === id);

    if (windowIndex < 0) return 0;
    return windowStackRef.current.indexOf(windowIndex);
  };

  const getNewWindowPosition = () => {
    if (!activeWindowRef.current || !activeWindowRef.current < 0 || isMobile) return {};
    return {
      x: activeWindowPositionRef.current.x + 50,
      y: activeWindowPositionRef.current.y + 50,
    };
  };

  useEffect(() => {
    if (openWindows.length - 1 >= 0) {
      if (openWindows.length > openWindowsRef.current.length || windowStack.length === 0) {
        setActiveWindow(openWindows.length - 1);
      } else {
        setActiveWindow(windowStack[windowStack.length - 1]);
      }
      openWindows.forEach((_, index) => {
        if (index in windowStack) return;
        windowStackRef.current.push(index);
      });
      setWindowStack([...windowStackRef.current]);
    } else {
      setActiveWindow(null);
      setWindowStack([]);
    }
    openWindowsRef.current = openWindows;
  }, [openWindows]);

  useEffect(() => {
    activeWindowRef.current = activeWindow;
    windowStackRef.current.splice(windowStackRef.current.indexOf(activeWindowRef.current), 1);
    windowStackRef.current.push(activeWindowRef.current);
    setWindowStack([...windowStackRef.current]);
  }, [activeWindow]);

  useEffect(() => {
    activeWindowPositionRef.current = activeWindowPosition;
  }, [activeWindowPosition]);

  useEffect(() => {
    let landingInitialTransform = {
      w: 500,
      h: 250,
      x: (width / 2) - 450,
      y: (height / 2) - 100,
    };
    let imageInitialTransform = {
      w: 300,
      h: 355,
      x: (width / 2) + 70,
      y: (height / 2) - 175,
    };

    if (isMobile && width < height) {
      landingInitialTransform = {
        ...landingInitialTransform,
        x: 12.5,
        y: (height / 2) - 300,
      };
      imageInitialTransform = {
        ...imageInitialTransform,
        x: (width / 2) - 150,
        y: (height / 2) - 25,
      };
    } else if (isMobile) {
      landingInitialTransform = {
        ...landingInitialTransform,
        x: 12.5,
        y: (height / 2) - (Math.min(height - 25, 250) / 2),
      };
      imageInitialTransform = {
        ...imageInitialTransform,
        x: (width / 2) + 100,
        y: (height / 2) - (Math.min(height - 25, 355) / 2),
      };
    }

    setOpenWindows([
      <Window
        windowName="colorado_042022.png"
        className="Landing"
        id="colorado_042022.png"
        handleWindowClose={handleWindowClose}
        handleFocus={handleFocus}
        initialTransform={imageInitialTransform}
        iconSrc={imageIcon}
        key="colorado_042022.png"
        index={-1}
      >
        <img src={colorado} alt="me waving hello. hello!" />
      </Window>,
      <Window
        windowName="Landing"
        className="Landing"
        id="Landing"
        handleWindowClose={handleWindowClose}
        handleFocus={handleFocus}
        initialTransform={landingInitialTransform}
        iconSrc={fileIcon}
        key="Landing"
        index={-1}
      >
        <Landing />
      </Window>,
    ]);

    if (!isMobile) {
      desktopRef.current.addEventListener('mousedown', handleDefocus);
    } else {
      desktopRef.current.addEventListener('touchstart', handleDefocus);
    }

    return () => {
      if (desktopRef.current) desktopRef.current.removeEventListener('mousedown', handleDefocus);
    };
  }, []);

  const iconMap = (icon) => (
    <Icon
      iconName={icon.name}
      key={`Icon-${icon.name}`}
      iconSrc={icon.img}
      onClick={() => handleWindowOpen(
        <icon.window.Type
          windowName={icon.window.name}
          className={icon.window.className}
          id={icon.window.name}
          key={icon.name}
          iconSrc={icon.img}
          initialTransform={icon.window.initialTransform}
          icons={!icon.window.icons
            ? null
            : icon.window.icons.map(iconMap)}
          index={-1}
        >
          {icon.name === 'aidanbrown.me'
            ? (
              <Desktop
                width={Math.min(icon.window.initialTransform.w, width - 25)}
                height={Math.min(icon.window.initialTransform.h, height - 61)}
              />
            )
            : icon.window.content}
        </icon.window.Type>,
      )}
    />
  );

  const desktopIcons = defaultIcons.map(iconMap);

  return (
    <WindowControlContext.Provider value={useMemo(() => ({
      iconMap,
      handleWindowOpen,
      handleWindowClose,
      handleFocus,
      getZIndex,
      getNewWindowPosition,
      setActiveWindowPosition,
      activeWindow,
      desktopTransform: { w: width, h: height },
      theme,
    }), [activeWindow, width, height, theme])}
    >
      <main className="Desktop" style={{ backgroundImage: `url(${charlie})` }} ref={desktopRef}>
        {openWindows.map((windowElem, index) => cloneElement(windowElem, { index }))}
        <IconGrid icons={desktopIcons} />
      </main>
      <footer className="haos-border Taskbar">
        {isMainMenuOpen && (
        <span className="haos-border Taskbar-menu">
          <div>
            <button
              type="button"
              className="haos-border haos-button"
              onClick={() => setMainMenu(<ThemeMenu theme={theme} setTheme={setTheme} />)}
            >
              Change Theme
            </button>
          </div>
          <div className="Taskbar-menu-content">{mainMenu}</div>
        </span>
        )}
        <button type="button" className="haos-border haos-button Taskbar-button" onClick={() => setMainMenuOpen(!isMainMenuOpen)}>
          <img src={haos} alt="icon for HAOS" />
          haOS
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
              <p>{windowElem.props.windowName}</p>
            </button>
          ))}
        </span>
        <span className="Taskbar-controls">
          <Clock />
        </span>
      </footer>
    </WindowControlContext.Provider>
  );
};

Desktop.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
};

Desktop.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Desktop;
