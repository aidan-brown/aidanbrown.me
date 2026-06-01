import React, { useContext, useState } from 'react';

import './startMenu.scss';
import { StartMenuProps } from './startMenu.utils';
import { logoutIcon, profile } from 'assets/images';
import { DesktopControl } from 'pages/desktop/desktop.util';
import { Application } from 'utils/application';

export const StartMenu = ({
  isVisible,
  openWindowFn,
  handleLogOut
}: StartMenuProps) => {
  const { currentUser, userFullDirectory, fullAppList } =
    useContext(DesktopControl);

  const mapApplicationToButton = (application: Application) => (
    <button
      onClick={() => openWindowFn(application)}
      key={`app-button-${application.name}`}
    >
      <img src={application.imageSrc} />
      {application.name}
    </button>
  );

  const mapApplicationToDirectoryList = (application: Application) => {
    const sortedApplications = !!application.applications
      ? [...application.applications]
      : [];
    sortedApplications.sort((appA, appB) => {
      if (!!appA.applications === !!appB.applications) {
        return appA.name.localeCompare(appB.name);
      }

      return !!appA.applications ? -1 : 1;
    });

    return !!application.applications ? (
      <div
        className="directory-entry"
        key={`directory-entry-${application.name}`}
      >
        <button onClick={() => openWindowFn(application)}>
          <img src={application.imageSrc} />
          <span>{application.name}</span>
          <span>{'>'}</span>
        </button>
        <div className="expanded-list">
          {sortedApplications.map(mapApplicationToDirectoryList)}
        </div>
      </div>
    ) : (
      mapApplicationToButton(application)
    );
  };

  const filterAppList = ({ name }: Application, index: number) => {
    const lastIndex = fullAppList.findLastIndex((app) => app.name === name);

    return index === lastIndex;
  };

  const sortAppList = (appA: Application, appB: Application) => {
    const typeSort = appA.imageSrc.localeCompare(appB.imageSrc);

    if (typeSort === 0) {
      return appA.name.localeCompare(appB.name);
    }

    return typeSort;
  };

  return isVisible ? (
    <div className="StartMenu haos-border">
      <div className="menu-header">
        <img src={currentUser.profileImage || profile} />
        <h2>{currentUser.name}</h2>
      </div>
      <div className="menu-applications">
        {fullAppList
          .filter(filterAppList)
          .sort(sortAppList)
          .map(mapApplicationToButton)}
      </div>
      <div className="menu-info">
        <div>{userFullDirectory.map(mapApplicationToDirectoryList)}</div>
        <div>
          <p>Fun stuff coming soon...</p>
        </div>
        <div>
          <p>Contact</p>
          <a href="mailto:abrownie99600@gmail.com">abrownie99600@gmail.com</a>
        </div>
        <div>
          <p style={{ marginBottom: '0' }}>haOSv1.0.0</p>
          <p style={{ fontSize: '.95rem' }}>
            design by{' '}
            <a href="https://aidanbrown.me/" target="_blank">
              Aidan Brown
            </a>
          </p>
        </div>
      </div>
      <div className="menu-footer">
        <button className="haos-border haos-button" onClick={handleLogOut}>
          <img src={logoutIcon} />
        </button>
        <p>Log Out</p>
      </div>
    </div>
  ) : (
    <></>
  );
};
