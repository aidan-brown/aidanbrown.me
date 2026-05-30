import React from 'react';

import './icon.scss';
import { IconProps } from './icon.utils';

export const Icon = ({ name, imageSrc, openWindowFn }: IconProps) => {
  return (
    <button className="Icon" onClick={openWindowFn}>
      <img src={imageSrc} />
      <p>{name}</p>
    </button>
  );
};
