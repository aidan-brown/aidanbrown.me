import React from 'react';

import { DownDownDownFinalMix } from 'assets/audio';
import { WindowProps, WindowTransform } from 'components';
import { AudioPage } from 'pages/subpages/audio';

const Component = () => (
  <AudioPage
    src={DownDownDownFinalMix}
    title="Down Down Down"
    artist="Ellery"
  />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'DownDownDownFinalMix.mp3',
  transform: {
    ...initialTransform,
    h: 150
  },
  iconSrc,
  content: <Component />
});
