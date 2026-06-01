import React from 'react';

import './picture.scss';
import { PictureProps } from './picture.utils';

export const Picture = ({ src, alt }: PictureProps) => {
  return (
    <div className="Picture">
      <img src={src} alt={alt} />
    </div>
  );
};
