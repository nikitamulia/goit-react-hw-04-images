import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ nextPage }) => {
  return(
      <button type="button" className={s.Button} onClick={nextPage}>
        Load more
      </button>
  )
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};