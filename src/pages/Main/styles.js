import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';
import ReactModal from 'react-modal';

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
  z-index: 0;
  .toastStyle {
    margin-top: 20%;
    width: 100%;
    z-index: 11;
    @media (max-width: 400px) {
      float: right;
      width: 50%;
    }
  }
`;

export const Header = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 3;
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

    /*.fade-in {
      opacity: 1;
      animation-name: ${fadeInOpacity};
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 0.3s;
    }*/

    .boxfilter {
      width: 100%;
      height: 200px;
      background: #f6494d;
      display: flex;
      justify-content: center;
      align-items: center;
      .boxContainer {
        width: 98%;
        height: 90%;
        border: 1px solid #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        align-content: space-between;
        .boxSelect {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          input,
          select {
            width: 100%;
            border: 0;
            height: 50px;
            font-size: 1.2em;
            padding-left: 20px;
            margin: 5px 5px;
          }
        }

        button {
          margin: 5px;
          margin-bottom: 10px;
          width: 70px;
          height: 60px;
          border: 0;
          outline: none;
          background: #ffffff;
        }

        button:hover {
          opacity: 0.9;
        }
      }
    }
  }
`;

export const ListCard = styled.ul`
  margin-top: 80px;
  max-height: 60vh;
  position: absolute;
  width: calc(100% + 15px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  list-style: none;
  padding-right: 10px;
  z-index: 1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 4px;
    margin-top: 0px;
  }

  ::-webkit-scrollbar:hover {
    background: #e8e8e8;
  }

  ::-webkit-scrollbar-thumb {
    background: #f6494d;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${darken(0.1, '#f6494d')};
  }

  li {
    background: #fff;
    padding: 24px;
    border-radius: 15px;
    position: relative;
    z-index: 2;
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
      width: 120px;
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
    button:focus {
      outline: 0;
    }

    button:hover {
      opacity: 0.8;
      background: #f6494d;
      svg {
        background: #f6494d;
        fill: #ffffff;
      }
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

export const Modal = styled(ReactModal)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  color: #ffffff;
  position: absolute !important;
  z-index: 4 !important;
  textarea {
    width: 100%;
    height: 40vh;
    border: 0;
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 1.5em;
    line-height: 1.3;
    position: relative;
    margin-left: 10px;

    ::-webkit-scrollbar {
      background: #e8e8e8;
      width: 10px;
      border-radius: 4px;
      margin-top: 0px;
    }

    ::-webkit-scrollbar-thumb {
      background: #f6494d;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${darken(0.1, '#f6494d')};
    }
  }
  .containerModal {
    background: #f6494d;
    border-radius: 8px;
    border: 0;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    margin-top: 5%;
    width: 60%;
  }

  .titleModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px 8px 0px 0px;
    img {
      width: 20vh;
      height: 10vh;
    }
    strong {
      color: #f6494d;
      font-size: 1.5em;
    }
  }

  .bodyModel {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 95%;
  }

  .bodyBoxSelect {
    width: 70%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border-right: 1px solid #ffffff;
    padding-right: 10px;

    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .BoxElement {
    width: 100%;
    display: flex;
    align-items: center;

    strong {
      width: 35%;
      font-size: 1.5em;
    }

    input,
    select,
    option {
      border-radius: 8px;
      width: 65%;
      border: 0;
      height: 50px;
      font-size: 1.1em;
      padding-left: 15px;
      margin: 5px 5px;
    }
  }

  .footerModel {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    button {
      border-radius: 8px;
      margin: 5px;
      width: 70px;
      height: 60px;
      border: 0;
      outline: none;
      background: #ffffff;
    }

    button:disabled {
      opacity: 1;
      cursor: no-drop;
    }

    button:hover {
      opacity: 0.9;
    }
  }
`;
