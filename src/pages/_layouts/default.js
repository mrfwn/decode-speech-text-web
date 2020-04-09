import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaMicrophone,
  FaChartLine,
  FaRegFileAlt,
} from 'react-icons/fa';

import { Wrapper, Container } from './styles';

export default function AuthLayout({ children }) {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Wrapper>
      <Navbar collapseOnSelect expand="lg">
        <Link id="linkTitle" className="nav-link" to="/">
          <FaMicrophone color="#ffffff" size={35} />{' '}
          <span id="title">Decode Text</span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FaBars color="#ffffff" size={30} />
        </Navbar.Toggle>
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            <Link
              className={pathname === '/' ? 'nav-link linePath' : 'nav-link'}
              to="/"
            >
              <FaRegFileAlt color="#ffffff" size={20} />
              <span>Texts</span>
            </Link>
            <Link
              className={
                pathname === '/decode' ? 'nav-link linePath' : 'nav-link'
              }
              to="/decode"
            >
              <FaMicrophone color="#ffffff" size={20} />
              <span>Decode</span>
            </Link>

            <Link
              className={
                pathname === '/metrics' ? 'nav-link linePath' : 'nav-link'
              }
              to="/metrics"
            >
              <FaChartLine color="#ffffff" size={20} />
              <span>Metrics</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>{children}</Container>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
