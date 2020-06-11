import React from 'react';
import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_full_url} alt={user.name} />
            <div>
              <span>
                Bem-vindo,
              </span>
              <strong>
                {user.name}
              </strong>
            </div>
          </Profile>
          <button onClick= {signOut} type="button">
            <FiPower size={24} color='#999591' />
          </button>
        </HeaderContent>
      </Header>
      <Content >
        <Schedule >
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatars1.githubusercontent.com/u/42871864?s=400&u=4a0ec5b279b9a2d0dd14a2ddd99cb850f2abcde9&v=4" alt="a"/>
              <strong>Giovanni Luro</strong>

              <span>
                <FiClock size={20} color="#ff9000"/>
                08h00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
}

export default Dashboard;
