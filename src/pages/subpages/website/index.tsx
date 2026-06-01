import React, { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

import './website.scss';
import { WebsiteProps } from './website.utils';

export const Website = ({ url, title }: WebsiteProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isMobile) {
      linkRef.current?.click();
    }
  }, []);

  return (
    <div className="Website">
      <iframe src={url} title={title} />
      <a href={url} target="_blank" ref={linkRef}>
        Visit Site
      </a>
    </div>
  );
};
