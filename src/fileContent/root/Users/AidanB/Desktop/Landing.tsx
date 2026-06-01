import React, { useContext } from 'react';

import { folderIcon } from 'assets/images';
import { WindowProps, WindowTransform } from 'components';
import { DesktopControl } from 'pages/desktop/desktop.util';
import { Application } from 'utils/application';

const styles: { [key: string]: React.CSSProperties } = {
  landing: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: '4rem'
  },
  role: {
    marginTop: '-2rem',
    marginBottom: '1rem'
  },
  portfolioActions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  portfolioAction: {
    margin: '0 1rem'
  },
  externalLinks: {}
};

const WINDOW_NAME = 'Landing';

const Component = () => {
  const { handleWindowOpen, userFullDirectory } = useContext(DesktopControl);
  console.log(userFullDirectory);

  const findDirectory = (directory: string) => {
    const path = directory.split('/');

    let targetDir = userFullDirectory[0];
    let applications = [...userFullDirectory];
    path.forEach((currentDir, index) => {
      const newDir = applications.find((app) => app.name.includes(currentDir));
      if (path.length - 1 === index) {
        targetDir = newDir;
        return;
      }
      if (newDir?.applications) {
        applications = [...newDir.applications];
      }
    });
    return targetDir;
  };

  const applications: { [key: string]: Application } = {
    audioExperience: {
      ...findDirectory('Desktop/Audio Engineer/Experience')!,
      name: 'Audio Engineer/Experience'
    },
    audioProjects: {
      ...findDirectory('Desktop/Audio Engineer/Projects')!,
      name: 'Audio Engineer/Projects'
    },
    webExperience: {
      ...findDirectory('Desktop/Front End Designer/Experience')!,
      name: 'Front End Designer/Experience'
    },
    webProjects: {
      ...findDirectory('Desktop/Front End Designer/Projects')!,
      name: 'Front End Designer/Projects'
    }
  };

  return (
    <div style={styles.landing}>
      <h1 style={styles.title}>Aidan Brown</h1>
      <h2 style={styles.role}>Audio Engineer/Front End Designer</h2>
      <div style={styles.portfolioActions}>
        <button
          style={styles.portfolioAction}
          className="haos-border haos-button"
          onClick={() => handleWindowOpen(applications.audioExperience!)}
        >
          Audio Experience
        </button>
        <button
          style={styles.portfolioAction}
          className="haos-border haos-button"
          onClick={() => handleWindowOpen(applications.audioProjects!)}
        >
          Audio Projects
        </button>
        <button
          style={styles.portfolioAction}
          className="haos-border haos-button"
          onClick={() => handleWindowOpen(applications.webExperience!)}
        >
          Web Experience
        </button>
        <button
          style={styles.portfolioAction}
          className="haos-border haos-button"
          onClick={() => handleWindowOpen(applications.webProjects!)}
        >
          Web Projects
        </button>
      </div>
      <div style={styles.externalLinks}></div>
    </div>
  );
};

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: WINDOW_NAME,
  transform: initialTransform,
  iconSrc,
  content: <Component />
});
