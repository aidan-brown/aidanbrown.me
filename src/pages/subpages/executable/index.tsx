import React, { useContext, useEffect } from 'react';

import { ExecutableProps } from './executable.utils';
import { DesktopControl } from 'pages/desktop/desktop.util';

export const Executable = ({
  applications,
  appTransforms
}: ExecutableProps) => {
  const { handleMultipleWindowOpen } = useContext(DesktopControl);

  useEffect(() => {
    handleMultipleWindowOpen(applications, appTransforms);
  }, []);

  return <></>;
};
