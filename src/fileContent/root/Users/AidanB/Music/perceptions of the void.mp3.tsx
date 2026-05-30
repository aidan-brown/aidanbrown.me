import React from 'react';

import { PerceptionsOfTheVoid } from 'assets/audio';
import { WindowProps, WindowTransform } from 'components';
import { AudioPage } from 'pages/subpages/audio';

const Component = () => (
  <AudioPage
    src={PerceptionsOfTheVoid}
    title="perceptions of the void"
    artist="Aidan Brown"
  />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'perceptions of the void.mp3',
  transform: {
    ...initialTransform,
    h: 150
  },
  iconSrc,
  content: <Component />
});
