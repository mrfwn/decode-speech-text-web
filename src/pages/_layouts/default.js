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
  return (
    <Wrapper>
      <Navbar collapseOnSelect expand="lg">
        <Link id="linkTitle" className="nav-link" to="/">
          <FaMicrophone color="#ffffff" size={35} />{' '}
          <span id="title">Decupator</span>
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
              <span>Textos</span>
            </Link>
            <Link
              className={
                pathname === '/decode' ? 'nav-link linePath' : 'nav-link'
              }
              to="/decode"
            >
              <FaMicrophone color="#ffffff" size={20} />
              <span>Decupador</span>
            </Link>

            <Link
              className={
                pathname === '/metrics' ? 'nav-link linePath' : 'nav-link'
              }
              to="/metrics"
            >
              <FaChartLine color="#ffffff" size={20} />
              <span>Métricas</span>
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
