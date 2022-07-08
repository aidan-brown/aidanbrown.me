import React from 'react';
import propTypes from 'prop-types';
import './GenericPage.scss';

const GenericPage = ({
  title,
  subtitle,
  sections,
}) => (
  <>
    <h1 className="GenericPage-title">{title}</h1>
    <h2 className="GenericPage-subtitle">{subtitle}</h2>
    <div className="GenericPage-description">
      {sections.map((section) => (
        <article className={`GenericPage-section ${section.name}`}>
          <h2 className="GenericPage-section-title">{section.name}</h2>
          {section.content}
        </article>
      ))}
    </div>
  </>
);

GenericPage.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string,
  sections: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    content: propTypes.node.isRequired,
  })).isRequired,
};

GenericPage.defaultProps = {
  subtitle: '',
};

export default GenericPage;
