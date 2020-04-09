import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlay, FaStop, FaPause, FaSave, FaRegCopy } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextTranscript, ControlRec, Form } from './styles';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
};

const options = {
  autoStart: false,
};

function Decode({
  transcript,
  resetTranscript,
  listening,
  startListening,
  stopListening,
  browserSupportsSpeechRecognition,
}) {
  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');
  function notify(message, status) {
    status === 'success' && toast.success(message, { className: 'toastStyle' });
    status === 'info' && toast.info(message, { className: 'toastStyle' });
    status === 'error' && toast.error(message, { className: 'toastStyle' });
  }

  function handleClose() {
    setShow(false);
  }
  function handleShow() {
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
      notify('Opa, Não conseguimos copiar o texto!', 'error');
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
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
          onClick={() => (listening ? stopListening() : startListening())}
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
            resetTranscript();
            stopListening();
          }}
        >
          <FaStop size={25} color="#FFFFFF" />
        </button>
        <button type="button" onClick={() => handleShow()}>
          <FaSave size={25} color="#FFFFFF" />
        </button>

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
      </ControlRec>
      <Form />
    </Container>
  );
}

export default SpeechRecognition(options)(Decode);
Decode.propTypes = propTypes;
