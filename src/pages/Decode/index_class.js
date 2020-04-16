import React, { Component } from 'react';
import { differenceInSeconds } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlay, FaTrash, FaPause, FaSave, FaRegCopy } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextTranscript, ControlRec, Modal } from './styles';
import api from '../../services/api';

const propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  listening: PropTypes.bool,
};

const options = {
  autoStart: false,
};

class Decode extends Component {
  state = {
    show: false,
    title: '',
    program: 'BDPE',
    name: '',
    login: '',
    locality: 'PE',
    startTime: 0,
    endTime: 0,
    accumulatedTime: 0,
  };

  constructor(props) {
    super(props);
    const { recognition } = this.props;
    recognition.onabort = function () {
      recognition.stop();
      console.log('Speech recognition service disconnected');
    };
    recognition.onerror = function (event) {
      console.error(event);
    };
  }

  componentDidUpdate() {
    Modal.setAppElement('body');
  }

  componentWillUnmount() {
    this.props.abortListening();
  }

  notify = (message, status) => {
    status === 'success' && toast.success(message, { className: 'toastStyle' });
    status === 'info' && toast.info(message, { className: 'toastStyle' });
    status === 'error' && toast.error(message, { className: 'toastStyle' });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = async () => {
    this.props.stopListening();
    await this.setState({ endTime: new Date() });
    await this.setState({
      accumulatedTime:
        this.state.accumulatedTime +
        differenceInSeconds(this.state.endTime, this.state.startTime),
      show: true,
    });
  };

  copyToClipboard = () => {
    const copyTextarea = document.getElementById('text');
    copyTextarea.select();
    try {
      document.execCommand('copy');
      copyTextarea.value
        ? this.notify('Texto copiado!', 'success')
        : this.notify('Texto Vazio!', 'info');
    } catch (err) {
      this.notify('Ops, Não conseguimos copiar o texto!', 'error');
    }
  };

  handleClear = () => {
    this.setState({
      show: false,
      title: '',
      program: 'BDPE',
      name: '',
      login: '',
      locality: 'PE',
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const { transcript, resetTranscript } = this.props;
    const {
      title,
      program,
      name,
      login,
      locality,
      accumulatedTime,
    } = this.state;
    api
      .post('/transcriptions', {
        text: transcript,
        title,
        name,
        login,
        locality,
        program,
        accumulatedTime,
      })
      .then(() => {
        resetTranscript();
        this.handleClear();
        this.setState({ startTime: 0, endTime: 0, accumulatedTime: 0 });
        this.notify('Transcrição salva com sucesso!', 'success');
      })
      .catch((error) => {
        this.notify(`${error.response.data.error}!`, 'error');
      });
  };

  render() {
    const { show, title, name, login } = this.state;

    const {
      transcript,
      resetTranscript,
      listening,
      startListening,
      stopListening,
    } = this.props;

    return (
      <Container>
        <ToastContainer />
        <TextTranscript id="text" text={transcript} />

        <FaRegCopy
          className="copyIcon"
          onClick={this.copyToClipboard}
          size={25}
          color="#f6494d"
        />

        <ControlRec>
          <button
            className={listening ? 'pisca' : ' '}
            type="button"
            onClick={async () => {
              if (listening) {
                stopListening();
                await this.setState({ endTime: new Date() });
                await this.setState({
                  accumulatedTime:
                    this.state.accumulatedTime +
                    differenceInSeconds(
                      this.state.endTime,
                      this.state.startTime
                    ),
                });
              } else {
                startListening();
                await this.setState({ startTime: new Date() });
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
            onClick={async () => {
              if (transcript) {
                resetTranscript();
                stopListening();

                this.setState({
                  startTime: 0,
                  endTime: 0,
                  accumulatedTime: 0,
                });
                this.notify('Texto Descartado!', 'success');
              } else {
                this.notify('Texto Vazio!', 'info');
              }
            }}
          >
            <FaTrash size={25} color="#FFFFFF" />
          </button>
          {transcript ? (
            <button type="button" onClick={this.handleShow}>
              <FaSave size={25} color="#FFFFFF" />
            </button>
          ) : (
            <button type="button" disabled>
              <FaSave size={25} color="#FFFFFF" />
            </button>
          )}

          <Modal isOpen={show}>
            <form
              className="containerModal"
              onSubmit={() => {
                this.handleSave();
                resetTranscript();
                stopListening();
              }}
            >
              <div className="titleModal">
                <h3>Cadastro da Transcrição</h3>
              </div>
              <div className="bodyModel">
                <input
                  type="text"
                  value={title}
                  placeholder="Titulo"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <input
                  maxLength="16"
                  type="text"
                  value={name}
                  placeholder="Nome e Sobrenome"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <input
                  type="text"
                  maxLength="10"
                  value={login}
                  placeholder="Login"
                  onChange={(e) => this.setState({ login: e.target.value })}
                />
                <select
                  value={this.state.locality}
                  onChange={async (e) => {
                    await this.setState({ locality: e.target.value });
                    this.state.locality === 'DF' &&
                      (await this.setState({ program: 'BDDF' }));
                  }}
                >
                  <option selected disabled>
                    Escolha uma localidade
                  </option>
                  <option value="PE">Pernambuco</option>
                  <option value="DF">Brasília</option>
                </select>
                <select
                  value={this.state.program}
                  onChange={(e) => this.setState({ program: e.target.value })}
                >
                  {this.state.locality === 'PE' && (
                    <>
                      <option value="BDPE">BDPE</option>
                      <option value="G1PE">G1PE</option>
                    </>
                  )}

                  {this.state.locality === 'DF' && (
                    <>
                      <option value="BDDF">BDDF</option>
                      <option value="G1DF">G1DF</option>
                    </>
                  )}
                </select>
              </div>
              <div className="footerModel">
                <button type="button" onClick={this.handleClose}>
                  <GiCancel size={25} color="#f6494d" />
                </button>
                {title !== '' &&
                name !== '' &&
                login !== '' &&
                this.state.locality !== '' &&
                this.state.program !== '' ? (
                  <button type="submit" onClick={this.handleSave}>
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
    );
  }
}

Decode.propTypes = propTypes;
export default SpeechRecognition(options)(Decode);
