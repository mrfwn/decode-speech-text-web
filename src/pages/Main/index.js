import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { GoSearch } from 'react-icons/go';
import { FiTrash2 } from 'react-icons/fi';

import {
  FaPencilAlt,
  FaUserAlt,
  FaRegCalendarAlt,
  FaFilter,
} from 'react-icons/fa';

import { Container, Header, ListCard } from './styles';
import logo from '../../assets/microphone.png';
import MyContext from '../../context/MyContext';

export default function Main() {
  const [show, setShow] = useState(false);
  const [showbox, setShowbox] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');
  const [ownerModal, setOwnerModal] = useState('');
  const [programModal, setProgramModal] = useState('');
  const [cards, setCards] = useState([
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Material 1',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Material 1',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Material 1',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
    {
      owner: 'Mário Wessen',
      created_at: '20/04/2020',
      description: 'aaaaaaaaaaa',
      title: 'Entrevista com governador',
    },
  ]);
  function handleClose() {
    setDescriptionModal('');
    setTitleModal('');
    setShow(false);
  }
  function handleShow({ description, title }) {
    setDescriptionModal(description);
    setTitleModal(title);
    setShow(true);
  }

  function handleDeleteCard() {}

  return (
    <MyContext.Consumer>
      {({ nome }) => (
        <Container>
          <Header>
            <form>
              <div className="barsearch">
                <input type="text" placeholder="Buscar Materia" />
                <button
                  className="filter"
                  type="button"
                  onClick={() =>
                    showbox ? setShowbox(false) : setShowbox(true)
                  }
                >
                  <FaFilter size={20} color="#FFFFFF" />{' '}
                </button>
                <button className="search" type="submit">
                  <GoSearch size={25} color="#FFFFFF" />{' '}
                </button>
              </div>
              <div
                className={showbox ? 'boxfilter fade-in' : 'boxfilter'}
                style={
                  showbox ? { visibility: 'visible' } : { visibility: 'hidden' }
                }
              />
            </form>
          </Header>

          <ListCard>
            {cards.map((card) => (
              <li key={card.id}>
                <div className="headCard">
                  <strong>{card.title}</strong>
                  <img src={logo} alt="LogoProgram" />
                </div>
                <div className="bodyCard">
                  <div className="sectionOwner">
                    <div className="owner">
                      <FaUserAlt size={20} color="#a8a8b3" />
                      <p>{card.owner}</p>
                    </div>
                    <div className="date">
                      <FaRegCalendarAlt size={20} color="#a8a8b3" />
                      <p>{card.created_at}</p>
                    </div>
                  </div>
                  <div className="sectionButtons">
                    <button onClick={() => handleShow(card)} type="button">
                      <FaPencilAlt size={20} color="#a8a8b3" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      type="button"
                    >
                      <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ListCard>

          <Modal show={show} onHide={handleClose}>
            <Modal.Title>{titleModal}</Modal.Title>
            <Modal.Body>
              <p>Descrição {descriptionModal} </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </MyContext.Consumer>
  );
}
