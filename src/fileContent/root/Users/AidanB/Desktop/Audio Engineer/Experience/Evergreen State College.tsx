import React from 'react';

import { WindowProps, WindowTransform } from 'components';

const styles: { [key: string]: React.CSSProperties } = {
  experience: {
    width: '100%',
    height: '100%'
  }
};

const Component = () => (
  <div style={styles.experience}>
    <h1>Evergreen State College</h1>
    <h2>Audio Fundementals & Mixing Techniques Certificate</h2>
    <ul>
      <li>September 2025 to May 2026</li>
    </ul>
    <h3>Overview</h3>
    <ul>
      <li>
        Achieved a certifacte for Audio Fundementals & Mixing Techniques at
        Evergreen State College.
      </li>
      <li>
        Was tasked with editing, mixing, and mastering various studio recordings
        from a plethora of different genres.
      </li>
    </ul>
    <h3>Technologies Used</h3>
    <ul>
      <li>Pro Tools</li>
    </ul>
  </div>
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'Evergreen State College',
  transform: initialTransform,
  iconSrc,
  content: <Component />
});
