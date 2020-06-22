import React, {useRef, useCallback} from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiLock, FiMail} from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link } from 'react-router-dom';

interface UserData{
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: UserData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Insira o seu e-mail!").email("Insira um e-mail válido!"),
        password: Yup.string().min(3, "Senha obrigatória")
      });
      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
         password: data.password,
         email: data.email
      });
    } catch (error) {

      if(error instanceof Yup.ValidationError){
        const erros = getValidationErrors(error);
        formRef.current?.setErrors(erros);
      }

      addToast({type:"error", title:"Erro na autenticação", description:"Verifique o seu usuário ou a sua senha"});

    }
  }, [addToast, signIn]);

  return(
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">Entrar</Button>
          <Link to='forgot-password'>Esqueci minha senha</ Link>
        </Form>
        <Link to="/signup">
          <FiLogIn size={20} />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
