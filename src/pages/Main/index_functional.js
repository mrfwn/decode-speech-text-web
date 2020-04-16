import React, { useState, useEffect } from 'react';
import {
  FaSave,
  FaRegTrashAlt,
  FaPencilAlt,
  FaUserAlt,
  FaRegCalendarAlt,
  FaFilter,
} from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoSearch } from 'react-icons/go';

import { Container, Header, ListCard, Modal } from './styles';
// import logo from '../../assets/microphone.png';
import logoBDPE from '../../assets/logobdpe.png';
import logoBDDF from '../../assets/logobddf.png';
import logoG1PE from '../../assets/logog1pe.svg';

import api from '../../services/api';

export default function Main() {
  const [show, setShow] = useState(false);
  const [showbox, setShowbox] = useState(false);
  const [idModal, setIdModal] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [nameModal, setNameModal] = useState('');
  const [programModal, setProgramModal] = useState('');
  const [localityModal, setLocalityModal] = useState('');
  const [loginModal, setLoginModal] = useState('');

  const [titleFilter, setTitleFilter] = useState('');
  const [textFilter, setTextFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [localityFilter, setLocalityFilter] = useState('');
  const [loginFilter, setLoginFilter] = useState('');

  const [cards, setCards] = useState([]);

  function notify(message, status) {
    status === 'success' && toast.success(message, { className: 'toastStyle' });
    status === 'info' && toast.info(message, { className: 'toastStyle' });
    status === 'error' && toast.error(message, { className: 'toastStyle' });
  }

  function handleClose() {
    setIdModal('');
    setTextModal('');
    setTitleModal('');
    setProgramModal('');
    setLocalityModal('');
    setNameModal('');
    setLoginModal('');
    setShow(false);
  }
  function handleShow({ id, text, title, program, locality, name, login }) {
    setIdModal(id);
    setTextModal(text);
    setTitleModal(title);
    setProgramModal(program);
    setLocalityModal(locality);
    setNameModal(name);
    setLoginModal(login);
    setShow(true);
  }

  function handleRemoveFilter() {
    setTextFilter('');
    setNameFilter('');
    setProgramFilter('');
    setLocalityFilter('');
    setLoginFilter('');
  }

  async function handleFilter(e) {
    e && e.preventDefault();
    setShowbox(false);
    try {
      const response = await api.get(
        `/transcriptions?title=${titleFilter}&program=${programFilter}&locality=${localityFilter}&name=${nameFilter}&login=${loginFilter}&text=${textFilter}`
      );
      setCards(response.data);
    } catch (err) {
      notify('Ops, Não conseguimos buscar os textos!', 'error');
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await api.put(`/transcriptions/${idModal}`, {
        text: textModal,
        title: titleModal,
        program: programModal,
        locality: localityModal,
        name: nameModal,
        login: loginModal,
      });
      handleFilter();
      handleClose();

      notify('Texto Atualizado com sucesso!', 'success');
    } catch (err) {
      notify('Ops, Não conseguimos atualizar o texto!', 'error');
    }
  }

  async function handleDeleteCard(id) {
    try {
      await api.delete(`/transcriptions/${id}`);
      setCards(cards.filter((card) => card.id !== id));
      notify('Texto deletado com sucesso!', 'success');
    } catch (error) {
      notify('Ops, Não conseguimos deletar o texto!', 'error');
    }
  }

  useEffect(() => {
    handleFilter();
    Modal.setAppElement('body');
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Header>
        <form onSubmit={handleFilter}>
          <div className="barsearch">
            <input
              value={titleFilter}
              placeholder="Buscar Materia"
              onChange={(e) => setTitleFilter(e.target.value)}
            />
            <button
              id="idFilterButton"
              type="button"
              onClick={() => (showbox ? setShowbox(false) : setShowbox(true))}
            >
              <FaFilter size={20} color="#FFFFFF" />{' '}
            </button>
            <button className="search" type="submit">
              <GoSearch size={25} color="#FFFFFF" />{' '}
            </button>
          </div>
          <div
            id="idFilter"
            className={showbox ? 'boxfilter fade-in' : 'boxfilter'}
            style={
              showbox ? { visibility: 'visible' } : { visibility: 'hidden' }
            }
          >
            <div className="boxContainer">
              <div className="boxSelect">
                <input
                  maxLength="16"
                  type="text"
                  value={nameFilter}
                  placeholder="Nome e Sobrenome"
                  onChange={(e) => setNameFilter(e.target.value)}
                />
                <input
                  type="text"
                  maxLength="10"
                  value={loginFilter}
                  placeholder="Login"
                  onChange={(e) => setLoginFilter(e.target.value)}
                />
                <select
                  value={localityFilter}
                  onChange={(e) => setLocalityFilter(e.target.value)}
                >
                  <option value="" selected disabled>
                    Escolha uma localidade
                  </option>
                  <option value="PE">Pernambuco</option>
                  <option value="DF">Brasília</option>
                </select>
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                >
                  <option value="" selected disabled>
                    Escolha um programa
                  </option>
                  <option value="BDPE">BDPE</option>
                  <option value="G1PE">G1PE</option>
                  <option value="BDDF">BDDF</option>
                  <option value="G1DF">G1DF</option>
                </select>
              </div>
              <button type="button" onClick={handleRemoveFilter}>
                <GiCancel size={25} color="#f6494d" />
              </button>
            </div>
          </div>
        </form>
      </Header>

      <ListCard>
        {cards.map((card) => (
          <li key={card.id}>
            <div className="headCard">
              <strong>{card.title}</strong>
              {card.program === 'BDPE' && (
                <img src={logoBDPE} alt="LogoProgram" />
              )}
              {card.program === 'G1PE' && (
                <img src={logoG1PE} alt="LogoProgram" />
              )}
              {card.program === 'BDDF' && (
                <img src={logoBDDF} alt="LogoProgram" />
              )}
              {card.program === 'G1DF' && (
                <img src={logoG1PE} alt="LogoProgram" />
              )}
            </div>
            <div className="bodyCard">
              <div className="sectionOwner">
                <div className="owner">
                  <FaUserAlt size={20} color="#a8a8b3" />
                  <p>{card.name}</p>
                </div>
                <div className="date">
                  <FaRegCalendarAlt size={20} color="#a8a8b3" />
                  <p>{card.formated_date}</p>
                </div>
              </div>
              <div className="sectionButtons">
                <button onClick={() => handleShow(card)} type="button">
                  <FaPencilAlt size={20} color="#a8a8b3" />
                </button>
                <button onClick={() => handleDeleteCard(card.id)} type="button">
                  <FaRegTrashAlt size={20} color="#a8a8b3" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ListCard>

      <Modal isOpen={show}>
        <form className="containerModal" onSubmit={handleUpdate}>
          <div className="titleModal">
            <img src={logoBDPE} alt="LogoProgram" />
          </div>
          <div className="bodyModel">
            <textarea
              defaultValue={textModal}
              onChange={(e) => setTextModal(e.target.value)}
            />

            <div className="bodyBoxSelect">
              <input
                value={titleModal}
                placeholder="Titulo"
                onChange={(e) => setTitleModal(e.target.value)}
              />
              <input
                maxLength="16"
                type="text"
                value={nameModal}
                placeholder="Nome e Sobrenome"
                onChange={(e) => setNameModal(e.target.value)}
              />
              <input
                type="text"
                maxLength="10"
                value={loginModal}
                placeholder="Login"
                onChange={(e) => setLoginModal(e.target.value)}
              />
              <select
                value={localityModal}
                onChange={(e) => setLocalityModal(e.target.value)}
              >
                <option selected disabled>
                  Escolha uma localidade
                </option>
                <option value="PE">Pernambuco</option>
                <option value="DF">Brasília</option>
              </select>
              <select
                value={programModal}
                onChange={(e) => setProgramModal(e.target.value)}
              >
                {localityModal === 'PE' && (
                  <>
                    <option value="BDPE">BDPE</option>
                    <option value="G1PE">G1PE</option>
                  </>
                )}

                {localityModal === 'DF' && (
                  <>
                    <option value="BDDF">BDDF</option>
                    <option value="G1DF">G1DF</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="footerModel">
            <button type="button" onClick={handleClose}>
              <GiCancel size={25} color="#f6494d" />
            </button>
            {titleModal !== '' &&
            nameModal !== '' &&
            loginModal !== '' &&
            localityModal !== '' &&
            programModal !== '' ? (
              <button type="submit">
                <FaSave size={25} color="#f6494d" />
              </button>
            ) : (
              <button type="submit" disabled>
                <FaSave size={25} color="#f6494d" />
              </button>
            )}
          </div>
        </form>
      </Modal>
    </Container>
  );
}
