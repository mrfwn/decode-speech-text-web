import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Context({ children }) {
  const [nome] = useState('Mário');
  return (
    <MyContext.Provider
      value={{
        nome,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

Context.propTypes = {
  children: PropTypes.element.isRequired,
};
