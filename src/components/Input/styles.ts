import styled, { css } from 'styled-components';
import Tooltip from '../../components/Tooltip';

interface ContainerProps{
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 14px;
  width: 100%;
  color: #666360;
  display: flex;
  justify-content: flex-start;

  ${ props => props.isErrored && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  ` }

  ${props => props.isFilled && css`
    color: #ff9000;
  `}

  input {
    border:0;
    flex:1;
    background:transparent;
    color: #F4EDE8;
    &::placeholder {
      color: #666360;
    }
  }

  & + div{
    margin-top: 10px;
  }

  svg{
    margin-right: 10px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg{
    margin: 0;
  }
  span{
    background: #c53030;
    color: #fff;

    &::before{
      border-color: #c53030 transparent;
    }
  }
`;
;
