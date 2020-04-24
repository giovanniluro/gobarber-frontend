import React, {useRef, useCallback} from 'react';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiLock, FiMail} from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Insira o seu nome!"),
        email: Yup.string().required("Insira o seu e-mail!").email("Insira um e-mail válido!"),
        password: Yup.string().min(6, "Senha obrigatória")
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      const erros = getValidationErrors(error);
      formRef.current?.setErrors(erros);
    }
  }, []);

  return(
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">Entrar</Button>
          <a href='forgot'>Esqueci minha senha</a>
        </Form>
        <a href="create">
          <FiLogIn size={20} />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
