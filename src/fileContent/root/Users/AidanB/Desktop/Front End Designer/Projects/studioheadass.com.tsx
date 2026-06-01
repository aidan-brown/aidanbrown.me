import React from 'react';
import { isMobile } from 'react-device-detect';

import { WindowProps, WindowTransform } from 'components';
import { Website } from 'pages/subpages/website';
import { defaultWebsiteTransform } from 'pages/subpages/website/website.utils';

const Component = () => (
  <Website url="https://studioheadass.com/" title="studioheadass.com" />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'https://studioheadass.com/',
  transform: isMobile
    ? initialTransform
    : {
        ...defaultWebsiteTransform,
        z: initialTransform.z
      },
  iconSrc,
  content: <Component />
});
