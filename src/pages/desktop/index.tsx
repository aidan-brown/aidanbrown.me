import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import './desktop.scss';
import {
  buildAppListFromDirectory,
  buildDirectoryFromData,
  DesktopControl,
  DesktopProps,
  pathJoin
} from './desktop.util';
import { ClickDownSound, ClickUpSound } from 'assets/audio';
import {
  fileIcon,
  folderIcon,
  haos,
  muteIcon,
  volumeIcon
} from 'assets/images';
import {
  buildInitialTransform,
  Clock,
  IconGrid,
  MAX_WINDOW_COUNT,
  StartMenu,
  Window,
  WindowProps,
  WindowTransform
} from 'components';
import Landing from 'fileContent/root/Users/AidanB/Desktop/Landing';
import ren_faire_2026Png from 'fileContent/root/Users/AidanB/Pictures/ren_faire_2026.png';
import { Application } from 'utils/application';

const getInitialWindows = (
  width: number,
  height: number,
  defaultWindowTransform: WindowTransform
): WindowProps[] => {
  if (isMobile) {
    return [
      Landing(
        {
          ...defaultWindowTransform,
          x: 0,
          y: 0,
          h: 250
        },
        fileIcon
      ),
      ren_faire_2026Png(
        {
          ...defaultWindowTransform,
          x: 0,
          y: 250,
          z: MAX_WINDOW_COUNT - 1
        },
        fileIcon
      )
    ];
  }

  return [
    Landing(
      {
        ...defaultWindowTransform,
        x: Math.max(width / 2 - defaultWindowTransform.w - 75, 0),
        y: Math.max(height / 2 - defaultWindowTransform.h / 2, 0)
      },
      fileIcon
    ),
    ren_faire_2026Png(
      {
        ...defaultWindowTransform,
        x: Math.max(width / 2, 0),
        y: Math.max(height / 2 - defaultWindowTransform.w / 2, 0),
        z: MAX_WINDOW_COUNT - 1
      },
      fileIcon
    )
  ];
};

export const Desktop = ({
  width,
  height,
  user,
  handleLogOut
}: DesktopProps) => {
  const DEFAULT_WINDOW_TRANSFORM = buildInitialTransform({
    w: width,
    h: height
  });
  const fullPath = pathJoin('root', 'Users', user.name);
  const currentPath = pathJoin(fullPath, 'Desktop');
  const clickDownSound = new Audio(ClickDownSound);
  const clickUpSound = new Audio(ClickUpSound);
  clickDownSound.volume = 0.25;
  clickUpSound.volume = 0.25;

  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [desktopApps, setDesktopApps] = useState<Application[]>([]);
  const [fullDirectory, setFullDirectory] = useState<Application[]>([]);
  const [fullAppList, setFullAppList] = useState<Application[]>([]);
  const [openWindows, setOpenWindows] = useState<WindowProps[]>(
    getInitialWindows(width, height, DEFAULT_WINDOW_TRANSFORM)
  );

  /**
   * Handles the position and scale of window at the given index
   * @param index index of the window being modified
   * @returns a function that updates the transform of the giving index
   */
  const handleWindowTransform =
    (index: number) => (newTransform: WindowTransform) => {
      const newOpenWindows = [...openWindows];
      newOpenWindows[index]!.transform = newTransform;
      setOpenWindows(newOpenWindows);
    };

  /**
   * Handles opening a window for the given application
   * @param application the application that is being opened
   * @param parentName Optional - the name of parent window of the given application
   */
  const handleWindowOpen = (
    { name, applications, imageSrc, windowGeneratorFn }: Application,
    parentName?: string
  ) => {
    setIsStartMenuOpen(false);
    const currentOpenWindow = openWindows.findIndex(
      (window) => window.name === name
    );

    if (currentOpenWindow < 0) {
      const parentIndex = openWindows.findIndex(
        (window) => window.name === parentName
      );
      const parent = openWindows[parentIndex];

      const transform =
        !!parent?.transform && !!applications
          ? parent.transform
          : DEFAULT_WINDOW_TRANSFORM;
      const newOpenWindows = [
        ...openWindows,
        windowGeneratorFn(transform, imageSrc, {
          name,
          applications: applications!
        })
      ];

      if (parentIndex >= 0 && !!applications) {
        newOpenWindows.splice(parentIndex, 1);
      }
      const focusedWindows = windowFocus(
        newOpenWindows,
        newOpenWindows.length - 1
      );

      setOpenWindows(focusedWindows);
    } else {
      handleWindowFocus(currentOpenWindow)();
    }
  };

  const handleMultipleWindowOpen = (
    applications: Application[],
    appTransforms: WindowTransform[]
  ) => {
    const newOpenWindows = [...openWindows];
    newOpenWindows.splice(newOpenWindows.length - 1, 1);

    applications.forEach((application, index) => {
      const currentOpenWindow = openWindows.findIndex(
        (window) => window.name === application.name
      );

      if (currentOpenWindow < 0) {
        newOpenWindows.push(
          application.windowGeneratorFn(
            appTransforms[index]!,
            application.imageSrc,
            { name: application.name!, applications: [] }
          )
        );
      }
    });

    const focusedWindows = windowFocus(
      newOpenWindows,
      newOpenWindows.length - 1
    );
    setOpenWindows(focusedWindows);
  };

  /**
   * Handles closing the window for the given index
   * @param index index of the window being closed
   * @returns a function that closes the window at the given index
   */
  const handleWindowClose = (index: number) => () => {
    const newOpenWindows = [...openWindows];
    newOpenWindows.splice(index, 1);
    setOpenWindows(newOpenWindows);
  };

  /**
   * Sets the z position for given window to the max value and reduces all the other windows' z positions by 2
   * @param windows array of windows that is being modified
   * @param index index of the window being focused
   * @returns the inputted array of windows with all z positions modified
   */
  const windowFocus = (windows: WindowProps[], index: number) =>
    windows.map((window, windowIndex): WindowProps => {
      const newWindow = { ...window };
      if (windowIndex === index) {
        newWindow.transform.z = MAX_WINDOW_COUNT;
      } else if (newWindow.transform.z > 0) {
        newWindow.transform.z -= 2;
      }
      return newWindow;
    });

  /**
   * Handles focusing the window for the given index
   * @param index index of the window being focused
   * @returns a function that focuses the window at the given index
   */
  const handleWindowFocus = (index: number) => () => {
    const newOpenWindows = windowFocus(openWindows, index);
    setOpenWindows(newOpenWindows);
  };

  /**
   * Handles playing the mouse click audio
   * @param isMouseDown boolean value that determines if the mouse up or mouse down audio should play
   */
  const handleClickSound = (isMouseDown: boolean) => {
    if (isMuted) return;
    const audio = isMouseDown ? clickDownSound : clickUpSound;
    audio.play();
  };

  useEffect(() => {
    buildDirectoryFromData(currentPath).then((currentDir) => {
      setDesktopApps(currentDir);
    });
    buildDirectoryFromData(fullPath).then((fullDir) => {
      setFullDirectory(fullDir);
    });
  }, []);

  useEffect(() => {
    const appList = buildAppListFromDirectory(fullDirectory);
    setFullAppList(appList);
  }, [fullDirectory]);

  return (
    <DesktopControl
      value={{
        handleWindowOpen,
        handleMultipleWindowOpen,
        desktopScale: {
          w: width,
          h: height
        },
        currentUser: user,
        userFullDirectory: fullDirectory!,
        fullAppList
      }}
    >
      <div
        className="Desktop"
        style={{
          backgroundImage: `url("${user.backgroundImage}")`
        }}
        onMouseDown={() => handleClickSound(true)}
        onMouseUp={() => handleClickSound(false)}
      >
        <span>
          <IconGrid
            applications={desktopApps}
            openWindowFn={handleWindowOpen}
          />
        </span>
        {openWindows.map((window, index) => (
          <Window
            key={`${window.name}-${index}`}
            handleTransform={handleWindowTransform(index)}
            handleClose={handleWindowClose(index)}
            handleFocus={handleWindowFocus(index)}
            {...window}
          />
        ))}
        <footer className="haos-border Taskbar">
          <button
            type="button"
            className={`haos-border haos-button Taskbar-button ${isStartMenuOpen ? 'active' : ''}`}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          >
            <img src={haos} alt="icon for HAOS" />
            haOS
          </button>
          <span className="Taskbar-windows">
            {openWindows.map((window, index) => (
              <button
                type="button"
                className={`haos-border haos-button Taskbar-button ${window.transform.z < MAX_WINDOW_COUNT ? '' : 'active'}`}
                onClick={handleWindowFocus(index)}
                key={`Taskbar-${window.name}`}
              >
                <img src={window.iconSrc} alt={`icon for ${window.name}`} />
                <p>
                  {window.iconSrc !== folderIcon
                    ? window.name
                    : `C:${window.name}/`}
                </p>
              </button>
            ))}
          </span>
          <span className="Taskbar-controls">
            <Clock />
            <button onClick={() => setIsMuted(!isMuted)}>
              <img src={isMuted ? muteIcon : volumeIcon} />
            </button>
          </span>
          <StartMenu
            isVisible={isStartMenuOpen}
            openWindowFn={handleWindowOpen}
            handleLogOut={handleLogOut}
          />
        </footer>
      </div>
    </DesktopControl>
  );
};
