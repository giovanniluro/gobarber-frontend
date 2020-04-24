import styled from 'styled-components';
import signInBackground from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    text-align: center;
    margin: 80px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }

    button {
        background: #ff9000;
        height: 50px;
        border-radius: 10px;
        border: 0;
        padding: 0 14px;
        width: 100%;
        font-weight: 600;
        margin-top: 10px;
        transition: background-color 0.3s;

        &:hover{
          background: ${shade(0.2, "#ff9000")};
        }
    }

    a{
      color: #F4EDE8;
      display:block;
      margin-top: 20px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover{
        color: ${shade(0.2, "#F4EDE8")}
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 20px;
    text-decoration: none;
    transition: color 0.3s;

    display: flex;
    align-items: center;

    svg{
      margin-right: 16px;

    }

    &:hover{
        color: ${shade(0.2, "#ff9000")}
      }
  }
`;
