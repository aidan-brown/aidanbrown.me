import { JSX } from 'react';

export type ScalingPositions =
  | ''
  | 'n'
  | 'ne'
  | 'e'
  | 'se'
  | 's'
  | 'sw'
  | 'w'
  | 'nw';

export type WindowTransform = {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
};

export type WindowProps = {
  name: string;
  transform: WindowTransform;
  content: JSX.Element;
  iconSrc: string;
};

export const MAX_WINDOW_COUNT = 100;

const INITIAL_WIDTH = 500;
const INITIAL_HEIGHT = 300;

/**
 * Builds initial transform for the window
 * @param desktopScale holds the width and height of the desktop
 * @param windowScale Optional - the window's starting scale
 * @returns
 */
export const buildInitialTransform = (
  desktopScale: { w: number; h: number },
  windowScale?: { w: number; h: number }
): WindowTransform => {
  const width = Math.max(
    0,
    Math.min(desktopScale.w, !!windowScale ? windowScale.w : INITIAL_WIDTH)
  );
  const height = Math.max(
    0,
    Math.min(desktopScale.h, !!windowScale ? windowScale.h : INITIAL_HEIGHT)
  );

  return {
    x: desktopScale.w / 2 - width / 2,
    y: desktopScale.h / 2 - height / 2,
    z: MAX_WINDOW_COUNT,
    w: width,
    h: height
  };
};
