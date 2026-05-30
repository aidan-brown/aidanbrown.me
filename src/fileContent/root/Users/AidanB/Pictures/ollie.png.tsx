import React from 'react';

import { ollie } from 'assets/images';
import { WindowProps, WindowTransform } from 'components';
import { Picture } from 'pages/subpages/picture';

const Component = () => (
  <Picture src={ollie} alt="A cat named Ollie just being a lil guy." />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => {
  const img = new Image();
  img.src = ollie;
  const aspectRatio = img.width / img.height;

  return {
    name: 'ollie.png',
    transform: {
      ...initialTransform,
      h: initialTransform.w * aspectRatio
    },
    iconSrc,
    content: <Component />
  };
};
