import React from 'react';
import { isMobile } from 'react-device-detect';

import { WindowProps, WindowTransform } from 'components';
import { Website } from 'pages/subpages/website';
import { defaultWebsiteTransform } from 'pages/subpages/website/website.utils';

const Component = () => (
  <Website url="https://markrigney.net/" title="markrigney.net" />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'https://markrigney.net/',
  transform: isMobile
    ? initialTransform
    : {
        ...defaultWebsiteTransform,
        z: initialTransform.z
      },
  iconSrc,
  content: <Component />
});
