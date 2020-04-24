import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FormHandles } from '@unform/core'
import { FiArrowLeft, FiUser, FiLock, FiMail } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import * as Yup from 'yup';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Insira o seu nome!"),
        email: Yup.string().required("Insira o seu e-mail!").email("Insira um e-mail válido!"),
        password: Yup.string().min(6, "A senha deve ter no mínimo 6 carácteres!")
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      const erros = getValidationErros(error);
      formRef.current?.setErrors(erros);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="create">
          <FiArrowLeft size={20} />
          Voltar para o ínicio
        </a>
      </Content>
    </Container>
  )
}

export default SignUp;
