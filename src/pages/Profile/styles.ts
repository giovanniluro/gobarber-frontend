import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  > header {
    height: 114px;
    background: #28262e;

    display: flex;
    align-items: center;

    svg {
      width: 40px;
      height: 40px;
      color: #999591;
      margin-left: 80px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const AvatarInput = styled.div`

  position: relative;
  width: 186px;
  margin: 0 auto 24px;


  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    width: 48px;
    height: 48px;
    background-color: #ff9000;
    border: 0;
    transition: background 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
      background: ${shade(0.3, "#ff9000")};
    }
  }

  input {
    display: none;
  }

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -146px auto 0;
  width: 100%;
  max-width: 700px;

  form {
    text-align: center;
    margin: 80px 0;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }

    button[type="submit"] {
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
  }

  > a {
    color: #F4EDE8;
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
        color: ${shade(0.2, "#F4EDE8")}
    }
  }

`;
