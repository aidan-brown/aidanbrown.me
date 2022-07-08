import React from 'react';
import {
  defaultIcon,
  codeProjectsIcons,
  artProjectsIcons,
  musicProjectsIcons,
  experienceIcons,
  photosIcons,
} from './icons';
import {
  fileIcon, folderIcon,
} from '../assets/images';
import { Directory, Window } from '../components';
import Landing from '../pages/subpages/Landing/Landing';

const desktopIcons = [
  {
    ...defaultIcon,
    name: 'Landing.html',
    img: fileIcon,
    window: {
      Type: Window,
      name: 'Landing',
      initialTransform: {
        w: 500,
        h: 250,
      },
      className: 'Landing',
      content: <Landing />,
    },
  },
  {
    ...defaultIcon,
    name: 'projects',
    img: folderIcon,
    window: {
      Type: Directory,
      name: 'projects/',
      initialTransform: {
        w: 500,
        h: 500,
      },
      icons: [
        {
          ...defaultIcon,
          name: 'code',
          img: folderIcon,
          window: {
            Type: Directory,
            name: 'projects/code/',
            initialTransform: {
              w: 500,
              h: 500,
            },
            icons: codeProjectsIcons,
          },
        },
        {
          ...defaultIcon,
          name: 'art',
          img: folderIcon,
          window: {
            Type: Directory,
            name: 'projects/art/',
            initialTransform: {
              w: 500,
              h: 500,
            },
            icons: artProjectsIcons,
          },
        },
        {
          ...defaultIcon,
          name: 'music',
          img: folderIcon,
          window: {
            Type: Directory,
            name: 'projects/music/',
            initialTransform: {
              w: 500,
              h: 500,
            },
            icons: musicProjectsIcons,
          },
        },
      ],
    },
  },
  {
    name: 'experience',
    img: folderIcon,
    window: {
      Type: Directory,
      name: 'experience/',
      initialTransform: {
        w: 500,
        h: 500,
      },
      icons: experienceIcons,
    },
  },
  {
    name: 'photos',
    img: folderIcon,
    window: {
      Type: Directory,
      name: 'photos',
      initialTransform: {
        w: 500,
        h: 500,
      },
      icons: photosIcons,
    },
  },
];

export {
  desktopIcons,
};
