import styled from 'styled-components';
import ReactModal from 'react-modal';
import { darken } from 'polished';

export const Container = styled.div`
  width: 90%;
  max-width: 1180px;
  margin: 100px auto;
  position: absolute;
  height: 60vh;
  .toastStyle {
    width: 100%;
    @media (max-width: 400px) {
      float: right;
      width: 50%;
    }
  }

  svg.copyIcon {
    margin: 5px;
    position: absolute;
    right: 0;
    opacity: 0.2;
    cursor: pointer;
  }

  svg.copyIcon:hover {
    opacity: 0.7;
  }
`;

export const TextTranscript = styled.textarea.attrs((props) => ({
  defaultValue: props.text,
}))`
  width: 100%;
  height: 60vh;
  border: 0;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 1.5em;
  line-height: 1.3;
  position: relative;

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
`;

export const ControlRec = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;

  button {
    width: 50px;
    height: 50px;
    border: 0;
    outline: none;
    background: #f6494d;
  }

  button:disabled {
    opacity: 1;
    cursor: no-drop;
  }

  div.register {
    height: 900px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .pisca {
    opacity: 0.3;
    background: ${darken(0.09, '#f6494d')};
    animation: anima 2s ease infinite;
  }
  @keyframes anima {
    to {
      opacity: 1;
      background: ${darken(0.03, '#f6494d')};
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

    width: 40%;

    @media (max-width: 700px) {
      width: 80%;
    }
  }

  .titleModal {
    h3 {
      font-size: 1.5em;
    }

    @media (max-width: 400px) {
      width: 80%;

      h3 {
        font-size: 1.2em;
      }
    }
    width: 70%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bodyModel {
    display: flex;
    flex-direction: column;
    width: 70%;
    input,
    select {
      width: 100%;
      border: 0;
      height: 50px;
      font-size: 1.2em;
      padding-left: 20px;
      margin: 5px 5px;
    }

    @media (max-width: 400px) {
      select option {
        font-size: 0.8em;
      }
    }
  }

  .footerModel {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 5px;
      margin-bottom: 10px;
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
      background: ${darken(0.08, '#f6494d')};
      svg {
        fill: #ffffff;
      }
    }
  }
`;
