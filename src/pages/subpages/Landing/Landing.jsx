import React, { useContext } from 'react';
import './Landing.scss';
import { IconButton } from '@mui/material';
import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import { Directory, WindowControlContext } from '../../../components';
import { folderIcon } from '../../../assets/images';
import { codeProjectsIcons, experienceIcons } from '../../../utils/icons';

const Landing = () => {
  const WindowControl = useContext(WindowControlContext);

  return (
    <>
      <h1>Aidan Brown</h1>
      <h2>Frontend Developer</h2>
      <span>
        <button
          type="button"
          className="haos-border haos-button"
          onClick={() => WindowControl.handleWindowOpen(
            <Directory
              windowName="projects/code/"
              iconSrc={folderIcon}
              id="code"
              key="code"
              index={-1}
              icons={codeProjectsIcons.map(WindowControl.iconMap)}
            />,
          )}
        >
          Coding Projects
        </button>
        <button
          type="button"
          className="haos-border haos-button"
          onClick={() => WindowControl.handleWindowOpen(
            <Directory
              windowName="experience/"
              iconSrc={folderIcon}
              id="experience"
              key="experience"
              index={-1}
              icons={experienceIcons.map(WindowControl.iconMap)}
            />,
          )}
        >
          Experience
        </button>
      </span>
      <span className="social-icons">
        <IconButton href="https://github.com/aidan-brown" target="_blank" aria-label="GitHub" disableRipple><GitHub /></IconButton>
        <IconButton href="https://www.linkedin.com/in/aidan-f-brown/" target="_blank" aria-label="LinkedIn" disableRipple><LinkedIn /></IconButton>
        <IconButton href="mailto:abrownie99600@gmail.com" target="_blank" aria-label="Email" disableRipple><Email /></IconButton>
      </span>
    </>
  );
};
export default Landing;
