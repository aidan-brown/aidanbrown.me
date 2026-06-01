import React, { useEffect, useState } from 'react';

import { Icon } from '../icon';
import './iconGrid.scss';
import { IconGridProps } from './iconGrid.utils';
import { Application } from 'utils/application';

export const IconGrid = ({ applications, openWindowFn }: IconGridProps) => {
  const [sortedApplications, setSortedApplications] = useState<Application[]>(
    []
  );

  useEffect(() => {
    const sortedApps = [...applications];
    sortedApps.sort((appA, appB) => {
      if (!!appA.applications === !!appB.applications) {
        return appA.name.localeCompare(appB.name);
      }

      return !!appA.applications ? -1 : 1;
    });
    setSortedApplications(sortedApps);
  }, [applications]);

  const mapApplicationToIcon = (application: Application) => (
    <Icon
      name={application.name}
      imageSrc={application.imageSrc}
      openWindowFn={() => openWindowFn(application)}
      key={`icon-${application.name}`}
    />
  );

  return (
    <div className="IconGrid">
      {sortedApplications.map(mapApplicationToIcon)}
    </div>
  );
};
