import React from 'react';
import { Container } from './styles';
import Toast from './Toast';
import { ToastMessage } from '../../hooks/toast'
import { useTransition } from 'react-spring';

export interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    message => message.id as string,
    {
      from: {right: '-120%'},
      enter: {right: '0%'},
      leave: {right:'-120%'}
    }
  );

  return (
    <Container>
      {messageWithTransitions.map(({item, key, props}) =>
        <Toast key={key} message={item} style={props}>

        </Toast>)}
    </Container>
  );
}

export default ToastContainer;
