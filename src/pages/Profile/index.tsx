import React, { useCallback, useRef, ChangeEvent } from 'react';
import { Container, Content, AvatarInput } from './styles';
import { FormHandles } from '@unform/core'
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
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

      await api.post('/users', data);

      history.push('/');

      addToast({
        title: "Sucesso!",
        type: "sucess",
        description: "Cadastro no Gobarber concluído com sucesso!"
      })

    } catch (error) {
      const erros = getValidationErros(error);
      formRef.current?.setErrors(erros);

      addToast({
        title: "Erro no cadastro =(",
        type: "error",
        description: "Ops... Algo deu errado, tente novamente!"
      })
    }
  }, [addToast, history]);

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then(response => {
        updateUser(response.data);
        addToast({
          type: 'sucess',
          title: 'Avatar atualizado!'
        })
      })
    }
  }, [updateUser]);

  return (
    <Container>
      <header>
        <Link to="/dashboard">
          <FiArrowLeft />
        </Link>
      </header>
      <Content>
        <Form ref={formRef} initialData={{
          name: user.name,
          email: user.email
        }} onSubmit={handleSubmit}>
          <AvatarInput >
            <img src={user.avatar_full_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera size={20} color="#312e38" />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </ AvatarInput>

          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input name="oldPassword" icon={FiLock} type="password" placeholder="Senha atual" />
          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile;
