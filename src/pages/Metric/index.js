import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import api from '../../services/api';
import { Container, Dashboard } from './styles';

const optionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
};

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
};

export default function Metric() {
  const [totalTrans, setTotalTrans] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalTransProgram, setTotalTransProgram] = useState({});
  const [totalTransLocality, setTotalTransLocality] = useState({});
  const [totalHoursLocality, setTotalHoursLocality] = useState({});
  const [totalHoursProgram, setTotalHoursProgram] = useState({});
  const [totalTransUser, setTotalTransUser] = useState({});
  const [totalHoursUser, setTotalHoursUser] = useState({});

  function adjustTime(time) {
    const dateObj = new Date(time * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();
    const timeString = `${hours
      .toString()
      .padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return timeString;
  }

  function setDates(res) {
    setTotalTrans(res.totalTrans[0].total);
    setTotalTime(adjustTime(res.totalTime[0].sum));

    setTotalTransProgram({
      labels: res.totalTransProgram.map((item) => item.program),
      datasets: [
        {
          dataIndex: '1',
          data: res.totalTransProgram.map((item) => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });

    setTotalTransLocality({
      labels: res.totalTransLocality.map((item) => item.locality),
      datasets: [
        {
          dataIndex: '2',
          data: res.totalTransLocality.map((item) => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });

    setTotalHoursLocality({
      labels: res.totalHoursLocality.map((item) => item.locality),
      datasets: [
        {
          dataIndex: '3',
          data: res.totalHoursLocality.map((item) => item.sum),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });

    setTotalHoursProgram({
      labels: res.totalHoursProgram.map((item) => item.program),
      datasets: [
        {
          dataIndex: '4',
          data: res.totalHoursProgram.map((item) => item.sum),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    });

    setTotalTransUser({
      labels: res.totalTransUser.map((item) => item.login),
      datasets: [
        {
          label: 'Total de Transcrições x Usuário',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: res.totalTransUser.map((item) => item.count),
        },
      ],
    });

    setTotalHoursUser({
      labels: res.totalHoursUser.map((item) => item.login),
      datasets: [
        {
          label: 'Tempo de Transcrição x Usuário',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: res.totalHoursUser.map((item) => item.sum),
        },
      ],
    });
  }

  useEffect(() => {
    api.get('/dashboard').then((response) => setDates(response.data));
  }, []);
  return (
    <Container>
      <Dashboard>
        <div className="sectionFrame">
          <div>
            <h2>Total de decupagens</h2>
            <strong>{totalTrans}</strong>
          </div>
          <div>
            <h2>Tempo total de decupagem</h2>
            <strong>{totalTime}</strong>
          </div>
        </div>
        <div className="sectionPies">
          <div>
            <strong>Transcrições x Programa</strong>
            <Pie
              id="transprogra"
              options={optionsPie}
              data={totalTransProgram}
            />
          </div>
          <div>
            <strong>Transcrições x Localidade</strong>
            <Pie
              id="translocal"
              options={optionsPie}
              data={totalTransLocality}
            />
          </div>
          <div>
            <strong>Tempo de transcrição x Localidade</strong>
            <Pie
              id="hourlocal"
              options={optionsPie}
              data={totalHoursLocality}
            />
          </div>
          <div>
            <strong>Tempo de Transcrição x Programa</strong>
            <Pie
              id="hourprogram"
              options={optionsPie}
              data={totalHoursProgram}
            />
          </div>
        </div>
        <div className="sectionBars">
          <div>
            <Bar options={optionsBar} data={totalTransUser} />
          </div>
          <div>
            <Bar options={optionsBar} data={totalHoursUser} />
          </div>
        </div>
      </Dashboard>
    </Container>
  );
}
