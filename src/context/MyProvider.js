import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Context({ children }) {
  const [startTime, setStartTime] = useState(0);
  return (
    <MyContext.Provider
      value={{
        startTime,
        setStartTime,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

Context.propTypes = {
  children: PropTypes.element.isRequired,
};
