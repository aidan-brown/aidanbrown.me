import React from 'react';

import { ren_faire_2026 } from 'assets/images';
import { WindowProps, WindowTransform } from 'components';
import { Picture } from 'pages/subpages/picture';

const Component = () => (
  <Picture
    src={ren_faire_2026}
    alt="Photo taken of Aidan during a ren faire in 2026."
  />
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => {
  const img = new Image();
  img.src = ren_faire_2026;
  const aspectRatio = img.width / img.height;

  return {
    name: 'ren_faire_2026.png',
    transform: {
      ...initialTransform,
      h: initialTransform.w * aspectRatio
    },
    iconSrc,
    content: <Component />
  };
};
