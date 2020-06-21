import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Container, Appointment, Section, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_full_url: string;
  }
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const [appointments, setAppointmets] = useState<Appointment[]>([])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available === true && !modifiers.disabled)  {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback(() => {

  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability.filter(
      monthDays => monthDays.available === false
    ).map(monthDays => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), monthDays.day));

    return dates;
  }, [monthAvailability, currentMonth]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    })
  }, [selectedDate]);

  const selectedWeekDateAsText = useMemo(() => {
    return format(selectedDate, "cccc", {
      locale: ptBR
    })
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment => isAfter(parseISO(appointment.date), new Date())));
  }, [appointments]);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    }).then(response => {
      setMonthAvailability(response.data);
    }
    );
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get('/appointments/me', {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      setAppointmets(response.data);
      console.log(response.data);
    })
  }, [selectedDate]);

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
                <Link to="/profile"><strong>{user.name}</strong></Link>
              </strong>
            </div>
          </Profile>
          <button onClick={signOut} type="button">
            <FiPower size={24} color='#999591' />
          </button>
        </HeaderContent>
      </Header>
      <Content >
        <Schedule >
          <h1>Horários Agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDateAsText}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img src={nextAppointment.user.avatar_full_url} alt={nextAppointment.user.name}/>
                <strong>{nextAppointment.user.name}</strong>

                <span>
                  <FiClock size={20} color="#ff9000" />
                  {format(parseISO(nextAppointment.date), 'HH:mm')}
              </span>
              </div>
            </NextAppointment>)
          }
          <Section >
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && <p> Não há agendamentos para este período </p>}

            {morningAppointments.map(appointment => {
              console.log(appointment.user.avatar_full_url);
              return (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock /> {format(parseISO(appointment.date), 'HH:mm')}
                  </span>

                  <div>
                    <img src={appointment.user.avatar_full_url} alt={appointment.user.name} />
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              );
            })}
          </Section>
          <Section >
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && <p> Não há agendamentos para este período </p>}

            {afternoonAppointments.map(appointment => {
              console.log(appointment.user.avatar_full_url);
              return (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock /> {format(parseISO(appointment.date), 'HH:mm')}
                  </span>

                  <div>
                    <img src={appointment.user.avatar_full_url} alt={appointment.user.name} />
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              );
            })}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={
              ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
            }
            months={
              [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
              ]
            }
            fromMonth={new Date()}
            selectedDays={selectedDate}
            disabledDays={
              [{
                daysOfWeek: [0, 6]
              }, ...disabledDays]
            }
            modifiers={{
              available: {
                daysOfWeek: [1, 2, 3, 4, 5]
              }
            }}
            onMonthChange={handleMonthChange}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
}

export default Dashboard;
