import styled, { keyframes } from 'styled-components';

const fadeInOpacity = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

export const Container = styled.div`
  width: 90%;
  max-width: 1180px;
  margin: 100px auto;

  position: absolute;
`;

export const Header = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 1;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3 solid black;
    .barsearch {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      input {
        width: 100%;
        border: 0;
        height: 50px;
        font-size: 20px;
        padding-left: 20px;
      }

      button {
        border: 0;
        outline: none;
        background: #f6494d;
        width: 50px;
        height: 50px;
      }
    }

    .fade-in {
      opacity: 1;
      animation-name: ${fadeInOpacity};
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 0.3s;
    }

    .boxfilter {
      width: 100%;
      height: 200px;
      background: #f6494d;
    }
  }
`;

export const ListCard = styled.ul`
  overflow-y: scroll;
  margin-top: 80px;
  height: 60vh;
  position: absolute;
  width: calc(100% + 15px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  list-style: none;
  padding-right: 10px;

  ::-webkit-scrollbar {
    background: #e8e8e8;
    width: 10px;
    border-radius: 4px;
    margin-top: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: #929292;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999999;
  }

  li {
    z-index: 0;
    background: #fff;
    padding: 24px;
    border-radius: 15px;
    position: relative;

    .headCard {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bodyCard {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sectionOwner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
      margin-top: 30px;
    }

    .owner,
    .date {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
    }

    .sectionButtons {
      display: flex;
      justify-content: space-between;
      svg {
        margin: 0 10px;
      }
    }

    svg {
      margin-right: 10px;
    }

    img {
      width: 100px;
      height: 100px;
    }

    button {
      background: #fff;
      right: 24px;
      height: 40px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin: 0px 4px;
    }

    button:hover {
      opacity: 0.8;
    }

    strong {
      color: #41414d;
      font-size: 2em;
      max-width: 60%;
    }

    p {
      color: #737380;
      line-height: 21px;
      font-size: 16px;
    }
  }
`;
