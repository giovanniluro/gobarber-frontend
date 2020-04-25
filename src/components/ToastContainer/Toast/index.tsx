import React, {useEffect} from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
import { ToastMessage } from '../../../hooks/toast';
import { Container } from './styles';
import { useToast} from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  error: <FiAlertCircle size={20} />,
  sucess: <FiCheckCircle size={20} />,
  info: <FiInfo size={20}/>
}

const Toast: React.FC<ToastProps> = ({message, style}) => {
  const { removeToast } = useToast();

  useEffect(() =>{
    const timer = setTimeout(()=>{
      removeToast(message.id as string);
    }, 3000);

    return ()=>{
      clearTimeout(timer);
    }
  },[message.id, removeToast])

  return (
    <Container style={style} type={message.type} hasDescription={!!message.description}>
      {icons[message.type || "info"]}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id as string)}><FiXCircle size={18} /></button>
    </Container>
  );
}

export default Toast;
