import styled from 'styled-components';

export const Wrapper = styled.div`
  nav {
    width: 100%;
    z-index: 10;
    position: fixed;
    min-height: 70px;
    background: #f6494d;
    font: 14px 'Globotipo Rounded', sans-serif;

    #title {
      font-size: 30px;
    }

    #linkTitle {
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      color: #ffffff;
    }
    .linePath {
      border-bottom: 2px solid #ffffff;
    }

    div#responsive-navbar-nav div.navbar-nav a.nav-link {
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      color: #ffffff;

      transition: opacity 0.2s;
    }

    button:focus {
      outline: 0;
    }

    a svg {
      margin-right: 4px;
    }
    a:hover {
      opacity: 0.8;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`;
