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
    <h1>Amazon Web Services (AWS)</h1>
    <h2>Frontend Developer</h2>
    <ul>
      <li>September 2023 to July 2025</li>
    </ul>
    <h3>Overview</h3>
    <ul>
      <li>
        Operated as a front-end engineer on AWS AppSync making contributions to
        the service's web console.
      </li>
      <li>
        Collaborated with a team of front-end and software engineers to develop
        tools for customers to easily build and test AppSync applications.
      </li>
    </ul>
    <h3>Technologies Used</h3>
    <h4>Languages</h4>
    <ul>
      <li>TypeScript</li>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
    <h4>Libraries</h4>
    <ul>
      <li>ReactJS</li>
      <li>Redux</li>
    </ul>
    <h4>Tools</h4>
    <ul>
      <li>Git</li>
      <li>AppSync</li>
      <li>AWS</li>
    </ul>
  </div>
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'Amazon Web Services',
  transform: initialTransform,
  iconSrc,
  content: <Component />
});
