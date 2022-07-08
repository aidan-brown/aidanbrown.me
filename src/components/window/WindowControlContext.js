import { createContext } from 'react';

const WindowControlContext = createContext({
  iconMap: () => {},
  handleWindowOpen: () => {},
  handleWindowClose: () => {},
  handleFocus: () => {},
  getZIndex: () => {},
  getNewWindowPosition: () => {},
  setActiveWindowPosition: () => {},
  activeWindow: -1,
  desktopTransform: {},
  theme: {},
});

export default WindowControlContext;
