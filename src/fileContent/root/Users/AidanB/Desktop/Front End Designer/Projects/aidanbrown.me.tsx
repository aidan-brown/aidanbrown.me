import React from 'react';
import { isMobile } from 'react-device-detect';

import { WindowProps, WindowTransform } from 'components';
import { Website } from 'pages/subpages/website';
import { defaultWebsiteTransform } from 'pages/subpages/website/website.utils';

const Component = () => (
  <Website url="https://aidanbrown.me/" title="aidanbrown.me" />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'https://aidanbrown.me/',
  transform: isMobile
    ? initialTransform
    : {
        ...defaultWebsiteTransform,
        z: initialTransform.z
      },
  iconSrc,
  content: <Component />
});
