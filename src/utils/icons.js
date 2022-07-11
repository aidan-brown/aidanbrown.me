import React from 'react';
import { Window } from '../components';
import {
  pageIcon, imageIcon, colorado, fileIcon,
} from '../assets/images';
import { resume } from '../assets/files';
import GenericPage from '../pages/subpages/GenericPage/GenericPage';

const experiencePages = [
  {
    company: 'Lockheed Martin',
    title: 'Software Developer/Frontend Developer',
    sections: [
      {
        name: '',
        content: (
          <ul>
            <li>July 2020 to December 2020</li>
            <li>June 2021 to Current</li>
          </ul>
        ),
      },
      {
        name: 'Overview',
        content: (
          <p>
            I was hired at Lockheed Martin to work on a team of full-time software developers to
            create and develop products for both customers and internal Lockheed Martin employees.
            The team I was on was dedicated to designing and implementing an internal web
            application for data collection, analytics and presentation for use by other teams at
            Lockheed Martin. During this time, I also led a migration of our web
            application&apos;s frontend infastructure towards the use of modern
            technologies/practices such as: ES6, ReactJS and CSS stylesheets.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with several different technologies over the course of my internship.</p>
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
          </>
        ),
      },
    ],
  },
  {
    company: 'Monmouth University',
    title: 'Game Developer/Research Assistant',
    sections: [
      {
        name: '',
        content: (
          <ul>
            <li>June 2017 to August 2017</li>
          </ul>
        ),
      },
      {
        name: 'Overview',
        content: (
          <p>
            I was selected to work alongside undergraduate students at Monmouth University on a
            summer game development project. With funding from the Urban Coastal Institute, me and
            four other highschool students were given three months to develop a game based on Coast
            Guard rescue procedures. During this time I learned a great deal about programming
            practices as well as what it is like working on a game with a small team.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with a few different technologies over the course of my internship.</p>
            <h4>Languages</h4>
            <ul>
              <li>C#</li>
            </ul>
            <h4>Tools</h4>
            <ul>
              <li>Unity3D</li>
              <li>GitHub</li>
            </ul>
          </>
        ),
      },
    ],
  },
];

const codeProjectPages = [
  {
    title: 'Charity Stream App',
    subtitle: 'December 2019 to Current',
    sections: [
      {
        name: 'Overview',
        content: (
          <p>
            This web application was designed to run alongside RIT&apos;s Computer Science
            House&apos;s (semi-)annual Minecraft Charity Stream event. I led the frontend
            development of the project, implementing features such as the ability to switch to
            different streamer&apos;s perspectives of the event as well as the main
            &quot;storefront&quot; of the stream that allowed viewers to donate money to effect the
            game in realtime. Utilizing JustGiving&apos;s API, we were able to funnel donations
            through their site to carry out the financial part of the donations while still giving
            the users a nice &quot;shopping&quot; experience.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with several different technologies over the course of this project.</p>
            <h4>Languages</h4>
            <ul>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
            <h4>Libraries</h4>
            <ul>
              <li>ReactJS</li>
              <li>NodeJS</li>
              <li>Sass</li>
            </ul>
            <h4>Tools</h4>
            <ul>
              <li>GitHub</li>
            </ul>
          </>
        ),
      },
      {
        name: '',
        content: (
          <>
            <p><a href="https://github.com/aidan-brown/Charity-Stream-Web-App" rel="noreferrer" target="_blank">GitHub</a></p>
            <p><a href="https://minecraftstream.csh.rit.edu/" rel="noreferrer" target="_blank">Live Site</a></p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Project Loremaster',
    subtitle: 'December 2019 to Current',
    sections: [
      {
        name: 'Overview',
        content: (
          <p>
            An all encompassing Dungeon and Dragons web application that allows users to create,
            manage, and use custom characters and campaigns for Dungeons and Dragons 5th Edition.
            Led the design and frontend development of the application. Currently a side project
            that has been on hiatus.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with several different technologies over the course of this project.</p>
            <h4>Languages</h4>
            <ul>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
            <h4>Libraries</h4>
            <ul>
              <li>ReactJS</li>
              <li>NodeJS</li>
            </ul>
            <h4>Tools</h4>
            <ul>
              <li>GitHub</li>
            </ul>
          </>
        ),
      },
      {
        name: '',
        content: (
          <p><a href="https://github.com/rmarks6767/ProjectLoremaster" rel="noreferrer" target="_blank">GitHub</a></p>
        ),
      },
    ],
  },
  {
    title: 'Pokedex Web App',
    subtitle: 'November 2019 to February 2019',
    sections: [
      {
        name: 'Overview',
        content: (
          <p>
            A web app that allows users to search through a list of pokemon from the Pokemon game
            series using several different filters. This project started off as a class project but
            it quickly out grew the requirements of the assignment. All of the pokemon data comes
            from the PokeAPI.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with several different technologies over the course of this project.</p>
            <h4>Languages</h4>
            <ul>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
            <h4>Tools</h4>
            <ul>
              <li>GitHub</li>
            </ul>
          </>
        ),
      },
      {
        name: '',
        content: (
          <>
            <p><a href="https://github.com/aidan-brown/Pokedex" rel="noreferrer" target="_blank">GitHub</a></p>
            <p><a href="https://people.rit.edu/afb3535/235/Project2/" rel="noreferrer" target="_blank">Live Site</a></p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Breakwater',
    subtitle: 'December 2018 to May 2019',
    sections: [
      {
        name: 'Overview',
        content: (
          <p>
            A light weight, open source game engine meant to give game developers all the tools
            they need, to allow for a smooth game development experience. The original plan for
            Breakwater was to create a game but eventually turned into a game engine. The engine is
            not currently being updated anymore.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with several different technologies over the course of this project.</p>
            <h4>Languages</h4>
            <ul>
              <li>C#</li>
            </ul>
            <h4>Libraries</h4>
            <ul>
              <li>Monogame</li>
            </ul>
            <h4>Tools</h4>
            <ul>
              <li>GitHub</li>
            </ul>
          </>
        ),
      },
      {
        name: '',
        content: (
          <p><a href="https://github.com/rmarks6767/Breakwater" rel="noreferrer" target="_blank">GitHub</a></p>
        ),
      },
    ],
  },
  {
    title: 'Monogame Lighting System',
    subtitle: 'December 2018 to May 2019',
    sections: [
      {
        name: 'Overview',
        content: (
          <p>
            A lighting engine capable of drawing simple dynamic shadows of rectangles that originate
            from a single light source. This project started out as a part of a school project but
            slowly turned into an experimental lighting system for use with the Monogame graphics
            pipeline.
          </p>
        ),
      },
      {
        name: 'Technologies Used',
        content: (
          <>
            <p>Worked with several different technologies over the course of this project.</p>
            <h4>Languages</h4>
            <ul>
              <li>C#</li>
            </ul>
            <h4>Libraries</h4>
            <ul>
              <li>Monogame</li>
            </ul>
            <h4>Tools</h4>
            <ul>
              <li>GitHub</li>
            </ul>
          </>
        ),
      },
      {
        name: '',
        content: (
          <p><a href="https://github.com/aidan-brown/Monogame-Lighting-System" rel="noreferrer" target="_blank">GitHub</a></p>
        ),
      },
    ],
  },
];

const defaultIcon = {
  name: '',
  img: '',
  window: {
    Type: Window,
    name: '',
    initialTransform: {},
    className: '',
    content: null,
    icons: [],
  },
};

const codeProjectsIcons = [
  {
    ...defaultIcon,
    name: 'aidanbrown.me',
    img: pageIcon,
    window: {
      Type: Window,
      name: 'aidanbrown.me',
      initialTransform: {
        x: 12.5,
        y: 12.5,
        w: window.innerWidth - 25,
        h: window.innerHeight - 61,
      },
    },
  },
  ...(codeProjectPages.map((project) => ({
    name: `${project.title.toLowerCase().replaceAll(' ', '_')}.html`,
    img: fileIcon,
    window: {
      Type: Window,
      name: project.title,
      initialTransform: {
        w: 500,
        h: 750,
      },
      className: 'GenericPage',
      content: <GenericPage
        title={project.title}
        subtitle={project.subtitle}
        sections={project.sections}
      />,
    },
  }))),
];

const artProjectsIcons = [

];

const musicProjectsIcons = [

];

const experienceIcons = [
  {
    ...defaultIcon,
    name: `aidan_brown_resume_${(new Date()).getFullYear()}.pdf`,
    img: fileIcon,
    window: {
      Type: Window,
      name: `aidan_brown_resume_${(new Date()).getFullYear()}.pdf`,
      initialTransform: {
        w: 750,
        h: 825,
      },
      className: 'Resume',
      content: <object data={`${resume}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" width="100%" height="100%" aria-label="Resume" />,
    },
  },
  ...(experiencePages.map((experience) => ({
    ...defaultIcon,
    name: `${experience.company.toLowerCase().replace(' ', '_')}.html`,
    img: fileIcon,
    window: {
      Type: Window,
      name: experience.company,
      initialTransform: {
        w: 500,
        h: 750,
      },
      className: 'GenericPage',
      content: <GenericPage
        title={experience.company}
        subtitle={experience.title}
        sections={experience.sections}
      />,
    },
  }))),
];

const photosIcons = [
  {
    name: 'colorado_042022.png',
    img: imageIcon,
    window: {
      Type: Window,
      name: 'colorado_042022.png',
      initialTransform: {
        w: 300,
        h: 355,
      },
      className: 'Landing',
      content: <img src={colorado} alt="me waving hello. hello!" />,
    },
  },
];

export {
  defaultIcon,
  codeProjectsIcons,
  artProjectsIcons,
  musicProjectsIcons,
  experienceIcons,
  photosIcons,
};
