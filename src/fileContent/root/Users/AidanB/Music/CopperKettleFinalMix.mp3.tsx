import React from 'react';

import { CopperKettleFinalMix } from 'assets/audio';
import { WindowProps, WindowTransform } from 'components';
import { AudioPage } from 'pages/subpages/audio';

const Component = () => (
  <AudioPage
    src={CopperKettleFinalMix}
    title="Copper Kettle"
    artist="American Folk"
  />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'CopperKettleFinalMix.mp3',
  transform: {
    ...initialTransform,
    h: 150
  },
  iconSrc,
  content: <Component />
});
