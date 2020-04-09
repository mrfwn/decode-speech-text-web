import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 90%;
  max-width: 1180px;
  margin: 100px auto;
  position: absolute;

  .toastStyle {
    width: 200px;
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

export const TextTranscript = styled.textarea`
  width: 100%;
  height: 60vh;
  border: 0;
  border-radius: 8px;
  padding: 5px 10px;
  position: relative;
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

export const Form = styled.form``;

/* .pisca {
  opacity: 0.5;
  animation: anima 3s ease infinite;
}
@keyframes anima {
  to {
      opacity: 1;
  }
} */
