import React, { useContext } from 'react';

import { DesktopControl } from '../../desktop/desktop.util';
import './directory.scss';
import { DirectoryProps } from './directory.utils';
import { IconGrid } from 'components';
import { Application, WindowGenerator } from 'utils/application';

const Component = ({ applications, parentName }: DirectoryProps) => {
  const context = useContext(DesktopControl);
  const handleWindowOpen = (application: Application) => {
    const isDirectory = !!application?.applications;

    context.handleWindowOpen(
      {
        ...application,
        name: isDirectory
          ? `${parentName}/${application.name}`
          : application.name
      },
      parentName
    );
  };

  return (
    <span className="Directory">
      <IconGrid applications={applications} openWindowFn={handleWindowOpen} />
    </span>
  );
};

export const Directory: WindowGenerator = (
  initalTransform,
  iconSrc,
  additionalProps
) => {
  const { name, applications } = additionalProps!;
  return {
    name,
    transform: initalTransform,
    iconSrc,
    content: <Component parentName={name} applications={applications} />
  };
};
