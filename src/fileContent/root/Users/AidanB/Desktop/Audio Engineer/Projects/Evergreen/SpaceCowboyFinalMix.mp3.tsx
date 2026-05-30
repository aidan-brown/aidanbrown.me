import React from 'react';

import { SpaceCowboyFinalMix } from 'assets/audio';
import { WindowProps, WindowTransform } from 'components';
import { AudioPage } from 'pages/subpages/audio';

const Component = () => (
  <AudioPage
    src={SpaceCowboyFinalMix}
    title="Space Cowboy"
    artist="Manic Pixie Dreamboat"
  />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'SpaceCowboyFinalMix.mp3',
  transform: {
    ...initialTransform,
    h: 150
  },
  iconSrc,
  content: <Component />
});
