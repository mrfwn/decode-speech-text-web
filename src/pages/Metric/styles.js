import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1180px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  justify-content: center;
`;

export const Dashboard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  .sectionFrame {
    position: relative;
    width: 70%;
    height: 100%;
    margin: 3%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 24px;
    div {
      border: 1px solid #f6494d;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      color: #f6494d;
      &:hover {
        background: #f6494d;
        color: #ffffff;
      }

      h2 {
        margin-top: 10px;
        font-size: 20px;
        font-weight: bold;
      }

      strong {
        padding-bottom: 10px;
        font-size: 60px;
      }
    }
  }

  .sectionPies {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 24px;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      width: 100%;
      height: 40vh;

      strong {
        font-size: 1.2em;
        color: #f6494d;
      }
    }
  }

  .sectionPiesDouble {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 24px;
    div {
      width: 100%;
      height: 50vh;
    }
  }

  .sectionBars {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 24px;

    div {
      width: 100%;
      height: 50vh;
    }
  }
`;
