import { WindowTransform } from 'components';

export type WebsiteProps = {
  url: string;
  title: string;
};

export const defaultWebsiteTransform: WindowTransform = {
  w: 1280,
  h: 720,
  x: 20,
  y: 20,
  z: 0
};
