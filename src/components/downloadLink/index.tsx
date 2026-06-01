import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type DownloadLinkProps = {
  src: string;
};

export const DownloadLink = ({ src }: DownloadLinkProps) => {
  const link = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    link.current?.click();
    navigate('/');
  }, []);

  return <a ref={link} href={src} download={true} />;
};
