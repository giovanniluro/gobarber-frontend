import React from 'react';
import { Container, Toast } from './styles';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast type="sucess" hasDescription={false}>
        <FiAlertCircle size={20} />
        <div>
          <strong> Aconteceu um Toast</strong>
        </div>

        <button><FiXCircle size={18}/></button>
      </Toast>
    </Container>
  );
}

export default ToastContainer;
