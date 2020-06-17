import React, {useRef, useCallback} from 'react';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiLock} from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../services/api';

interface UserData{
  password: string;
}

const ResetPassowrd: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(async (data: UserData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        password: Yup.string().min(6, "Senha obrigatória")
      });
      await schema.validate(data, {
        abortEarly: false
      });

      const token = location.search.replace('?token=', '');

      if(!token) throw new Error()

      await api.post('password/reset', {
        password: data.password,
        token
      });

      history.push('/')

    } catch (error) {

      if(error instanceof Yup.ValidationError){
        const erros = getValidationErrors(error);
        formRef.current?.setErrors(erros);
      }

      addToast({type:"error", title:"Erro ao resetar senha"});

    }
  }, [addToast, history, location]);

  return(
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Definir uma nova senha</h1>
          <Input name="password" icon={FiLock} type="password" placeholder="Nova Senha"/>
          <Button type="submit">Alterar senha</Button>
        </Form>
        <Link to="/">
          <FiLogIn size={20} />
          Home
        </Link>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassowrd;
