import React, {useRef, useCallback, useState} from 'react';
import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail} from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link } from 'react-router-dom';
import api from '../../services/api';

interface ForgotData{
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ForgotData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Insira o seu e-mail!").email("Insira um e-mail válido!"),
      });
      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/password/forgot', {
        email: data.email
      })

      addToast({
        type: 'sucess',
        title: 'Email de recuperação enviado'
      })

    } catch (error) {

      if(error instanceof Yup.ValidationError){
        const erros = getValidationErrors(error);
        formRef.current?.setErrors(erros);
      }

      console.log(error)

      addToast({type:"error", title:"Erro na recuperação de senha"});

    } finally {
      setLoading(false)
    }
  }, [addToast]);

  return(
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar Senha</h1>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />

          <Button loading={loading} type="submit">Recuperar</Button>
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

export default ForgotPassword;
