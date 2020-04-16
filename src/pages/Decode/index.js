import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlay, FaTrash, FaPause, FaSave, FaRegCopy } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextTranscript, ControlRec, Modal } from './styles';
import api from '../../services/api';
import MyContext from '../../context/MyContext';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  recognition: PropTypes.object,
  listening: PropTypes.bool,
  browserSupportsSpeechRecognition: PropTypes.bool,
};

const options = {
  autoStart: false,
};

function Decode({
  transcript,
  resetTranscript,
  listening,
  recognition,
  startListening,
  stopListening,
  browserSupportsSpeechRecognition,
}) {
  recognition.lang = 'pt-BR';
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [program, setProgram] = useState('BDPE');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [locality, setLocality] = useState('PE');
  // const [startTime, setStartTime] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  function notify(message, status) {
    status === 'success' && toast.success(message, { className: 'toastStyle' });
    status === 'info' && toast.info(message, { className: 'toastStyle' });
    status === 'error' && toast.error(message, { className: 'toastStyle' });
  }

  function handleClose() {
    setShow(false);
  }
  function handleShow(startTime) {
    stopListening();
    setAccumulatedTime(
      accumulatedTime + differenceInSeconds(new Date(), startTime)
    );
    setShow(true);
  }

  function copyToClipboard() {
    const copyTextarea = document.getElementById('text');
    copyTextarea.select();
    try {
      document.execCommand('copy');
      copyTextarea.value
        ? notify('Texto copiado!', 'success')
        : notify('Texto Vazio!', 'info');
    } catch (err) {
      notify('Ops, Não conseguimos copiar o texto!', 'error');
    }
  }

  function handleClear() {
    setShow(false);
    setTitle('');
    setProgram('BDPE');
    setName('');
    setLogin('');
    setLocality('PE');
  }

  async function handleSave(e) {
    e.preventDefault();

    try {
      await api.post('/transcriptions', {
        text: transcript,
        title,
        name,
        login,
        locality,
        program,
        accumulatedTime,
      });
      resetTranscript();
      handleClear();
      resetTranscript();
      stopListening();
      setAccumulatedTime(0);
      notify('Transcrição salva com sucesso!', 'success');
    } catch (err) {
      notify('Falha ao salvar transcrição!', 'error');
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <MyContext.Consumer>
      {({ startTime, setStartTime }) => (
        <Container>
          <ToastContainer />
          <TextTranscript id="text" value={transcript} />

          <FaRegCopy
            className="copyIcon"
            onClick={copyToClipboard}
            size={25}
            color="#f6494d"
          />

          <ControlRec>
            <button
              className={listening ? 'pisca' : ' '}
              type="button"
              onClick={() => {
                if (listening) {
                  stopListening();
                  setAccumulatedTime(
                    accumulatedTime + differenceInSeconds(new Date(), startTime)
                  );
                } else {
                  startListening();
                  setStartTime(new Date());
                }
              }}
            >
              {listening ? (
                <FaPause size={25} color="#FFFFFF" />
              ) : (
                <FaPlay size={25} color="#FFFFFF" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                if (transcript) {
                  resetTranscript();
                  stopListening();

                  setAccumulatedTime(0);
                  notify('Texto Descartado!', 'success');
                } else {
                  notify('Texto Vazio!', 'info');
                }
              }}
            >
              <FaTrash size={25} color="#FFFFFF" />
            </button>
            {transcript ? (
              <button type="button" onClick={() => handleShow(startTime)}>
                <FaSave size={25} color="#FFFFFF" />
              </button>
            ) : (
              <button type="button" disabled>
                <FaSave size={25} color="#FFFFFF" />
              </button>
            )}

            <Modal isOpen={show}>
              <form className="containerModal" onSubmit={handleSave}>
                <div className="titleModal">
                  <h3>Cadastro da Transcrição</h3>
                </div>
                <div className="bodyModel">
                  <input
                    type="text"
                    value={title}
                    placeholder="Titulo"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    maxLength="16"
                    type="text"
                    value={name}
                    placeholder="Nome e Sobrenome"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    maxLength="10"
                    value={login}
                    placeholder="Login"
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <select
                    value={locality}
                    onChange={(e) => {
                      setLocality(e.target.value);
                      locality === 'DF' && setProgram('BDDF');
                    }}
                  >
                    <option selected disabled>
                      Escolha uma localidade
                    </option>
                    <option value="PE">Pernambuco</option>
                    <option value="DF">Brasília</option>
                  </select>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                  >
                    {locality === 'PE' && (
                      <>
                        <option value="BDPE">BDPE</option>
                        <option value="G1PE">G1PE</option>
                      </>
                    )}

                    {locality === 'DF' && (
                      <>
                        <option value="BDDF">BDDF</option>
                        <option value="G1DF">G1DF</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="footerModel">
                  <button type="button" onClick={handleClose}>
                    <GiCancel size={25} color="#f6494d" />
                  </button>
                  {title !== '' &&
                  name !== '' &&
                  login !== '' &&
                  locality !== '' &&
                  program !== '' ? (
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
          </ControlRec>
        </Container>
      )}
    </MyContext.Consumer>
  );
}

Decode.propTypes = propTypes;
export default SpeechRecognition(options)(Decode);
