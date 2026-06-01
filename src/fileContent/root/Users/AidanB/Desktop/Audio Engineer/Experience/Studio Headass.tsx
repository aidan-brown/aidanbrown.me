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
    <h1>Studio Headass</h1>
    <h2>Lead Sound Designer</h2>
    <ul>
      <li>March 2026 to current</li>
    </ul>
    <h3>Overview</h3>
    <ul>
      <li>
        Lead sound designer for the studio's first independantly developed game,
        Blindisght.
      </li>
      <li>
        Collaborated with the team to create music as well as sound effects that
        match the aesthetic of the game.
      </li>
    </ul>
    <h3>Technologies Used</h3>
    <ul>
      <li>Pro Tools</li>
      <li>FL Studio</li>
      <li>Unreal Engine</li>
    </ul>
  </div>
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'Studio Headass',
  transform: initialTransform,
  iconSrc,
  content: <Component />
});
