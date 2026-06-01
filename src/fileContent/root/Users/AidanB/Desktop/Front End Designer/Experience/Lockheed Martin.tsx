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
    <h1>Lockheed Martin</h1>
    <h2>Software Developer/Frontend Developer</h2>
    <ul>
      <li>July 2020 to December 2020</li>
      <li>June 2021 to September 2023</li>
    </ul>
    <h3>Overview</h3>
    <ul>
      <li>
        Hired to work on a team of full-time software developers to create and
        develop products for both customers and internal Lockheed Martin
        employees.
      </li>
      <li>
        Developed an internal web application for data collection, analytics and
        presentation to assist other teams within Lockheed Martin.
      </li>
      <li>
        Led the migration of the application's infrastructure to use modern
        front-end frameworks.
      </li>
    </ul>
    <h3>Technologies Used</h3>
    <h4>Languages</h4>
    <ul>
      <li>JavaScript</li>
      <li>Python</li>
      <li>HTML</li>
      <li>CSS</li>
      <li>Java</li>
    </ul>
    <h4>Libraries</h4>
    <ul>
      <li>ReactJS</li>
      <li>Django</li>
      <li>Pandas</li>
      <li>Chart.js</li>
      <li>Plotly.js</li>
    </ul>
    <h4>Tools</h4>
    <ul>
      <li>GitLab</li>
      <li>JIRA</li>
      <li>Confluence</li>
      <li>Atlassian Suite</li>
    </ul>
  </div>
);

export default (
  initialTransform: WindowTransform,
  iconSrc: string
): WindowProps => ({
  name: 'Lockheed Martin',
  transform: initialTransform,
  iconSrc,
  content: <Component />
});
