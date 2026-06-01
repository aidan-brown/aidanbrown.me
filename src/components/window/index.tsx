import React, { useEffect, useRef, useState } from 'react';

import './window.scss';
import {
  MAX_WINDOW_COUNT,
  ScalingPositions,
  WindowProps,
  WindowTransform
} from './window.util';
import { folderIcon } from 'assets/images';

export const Window = ({
  name,
  transform,
  content,
  iconSrc,
  handleTransform,
  handleClose,
  handleFocus
}: WindowProps & {
  handleTransform: (newTransform: WindowTransform) => void;
  handleClose: () => void;
  handleFocus: () => void;
}) => {
  const windowStyle: React.CSSProperties = {
    top: transform.y,
    left: transform.x,
    zIndex: transform.z,
    width: `${transform.w}px`,
    height: `${transform.h}px`
  };
  const isDragging = useRef<boolean>(false);
  const isScaling = useRef<ScalingPositions>('');
  const touchPivotPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  /**
   * Handles moving the window around the desktop environment
   * @param event mouse event that holds the mouse movement vectors
   */
  const handleWindowMove = ({ movementX, movementY }: MouseEvent) => {
    if (isDragging.current) {
      const newTransform: WindowTransform = { ...transform };
      newTransform.x += movementX;
      newTransform.y += movementY;
      handleTransform(newTransform);
    }
  };

  /**
   * Handles moving the window around the desktop environment on mobile
   * @param event touch event that holds the position of the touch
   */
  const handleWindowMoveMobile = ({ targetTouches }: TouchEvent) => {
    if (isDragging.current) {
      const { pageX, pageY } = targetTouches.item(0)!;
      const newTransform: WindowTransform = { ...transform };
      newTransform.x = pageX - touchPivotPosition.current!.x;
      newTransform.y = pageY - touchPivotPosition.current!.y;
      handleTransform(newTransform);
    }
  };

  /**
   * Handles resizing the window in the desktop environment
   * @param event mouse event that holds the mouse movement vectors
   */
  const handleWindowResize = ({ movementX, movementY }: MouseEvent) => {
    if (isScaling.current) {
      const newTransform: WindowTransform = { ...transform };
      if (isScaling.current.includes('n')) {
        newTransform.y += movementY;
        newTransform.h -= movementY;
      }
      if (isScaling.current.includes('e')) {
        newTransform.w += movementX;
      }
      if (isScaling.current.includes('s')) {
        newTransform.h += movementY;
      }
      if (isScaling.current.includes('w')) {
        newTransform.x += movementX;
        newTransform.w -= movementX;
      }
      handleTransform(newTransform);
    }
  };

  useEffect(() => {
    const mouseTracking = window.addEventListener('mousemove', (event) => {
      handleWindowMove(event);
      handleWindowResize(event);
    });

    const mobileTracking = window.addEventListener('touchmove', (event) => {
      handleWindowMoveMobile(event);
    });

    const mouseUp = window.addEventListener('mouseup', () => {
      isDragging.current = false;
      isScaling.current = '';
    });

    const mobileEnd = window.addEventListener('touchend', () => {
      isDragging.current = false;
    });

    return () => {
      window.removeEventListener('mousemove', mouseTracking!);
      window.removeEventListener('touchmove', mobileTracking!);
      window.removeEventListener('mouseup', mouseUp!);
      window.removeEventListener('touchend', mobileEnd!);
    };
  }, [handleTransform, handleClose, handleFocus, transform]);

  return (
    <span
      className="haos-border Window"
      style={windowStyle}
      onMouseDown={(event) => {
        const isIconClicked =
          //@ts-ignore
          event.target.className === 'Icon' ||
          //@ts-ignore
          event.target.parentNode.className === 'Icon';
        if (isIconClicked) return;
        handleFocus();
      }}
      onTouchStart={handleFocus}
    >
      <div
        className={`Window-titlebar ${transform.z < MAX_WINDOW_COUNT ? '' : 'active'}`}
        onMouseDown={() => (isDragging.current = true)}
        onTouchStart={({ targetTouches }) => {
          const touch = targetTouches.item(0);
          touchPivotPosition.current = {
            x: touch.pageX - transform.x,
            y: touch.pageY - transform.y
          };
          isDragging.current = true;
        }}
      >
        <img
          className="Window-titlebar-icon"
          src={iconSrc}
          alt={`icon for ${name} window`}
        />
        <h2 className="Window-titlebar-text">
          {iconSrc !== folderIcon ? name : `C:${name}/`}
        </h2>
        <button
          type="button"
          className="haos-border haos-button Window-titlebar-control zicons"
          onClick={handleClose}
        >
          w
        </button>
      </div>
      <div className={`Window-content`}>{content}</div>
      <span
        className="Window-scale horizontal-scale east-scale"
        onMouseDown={() => (isScaling.current = 'e')}
      />
      <span
        className="Window-scale horizontal-scale west-scale"
        onMouseDown={() => (isScaling.current = 'w')}
      />
      <span
        className="Window-scale vertical-scale north-scale"
        onMouseDown={() => (isScaling.current = 'n')}
      />
      <span
        className="Window-scale vertical-scale south-scale"
        onMouseDown={() => (isScaling.current = 's')}
      />
      <span
        className="Window-scale corner-scale ne-scale"
        onMouseDown={() => (isScaling.current = 'ne')}
      />
      <span
        className="Window-scale corner-scale se-scale"
        onMouseDown={() => (isScaling.current = 'se')}
      />
      <span
        className="Window-scale corner-scale sw-scale"
        onMouseDown={() => (isScaling.current = 'sw')}
      />
      <span
        className="Window-scale corner-scale nw-scale"
        onMouseDown={() => (isScaling.current = 'nw')}
      />
    </span>
  );
};
