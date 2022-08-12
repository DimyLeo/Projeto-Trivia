import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { playerInfoToStore } from '../redux/actions';
import getToken from '../services/tokenAPI';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerEmail: '',
      isButtonDisabled: true,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { playerName, playerEmail } = this.state;
      const regex = /\S+@\S+\.\S+/;
      this.setState({
        isButtonDisabled: playerName.length === 0 || !regex.test(playerEmail),
      });
    });
  }

  handleClick = async () => {
    const { history, sendPlayerInfoToStore } = this.props;
    const { playerName, playerEmail } = this.state;
    const require = await getToken();
    const { token } = require;
    sendPlayerInfoToStore(playerName, playerEmail);
    await localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    const { playerName, playerEmail, isButtonDisabled } = this.state;
    const { history } = this.props;
    return (
      <>
        <header className="App-header">
          <Link
            to="/Projeto-Trivia"
          >
            <img src={ logo } className="App-logo" alt="logo" />
          </Link>
        </header>
        <form>
          <h1>Login</h1>
          <label htmlFor="input-player-name">
            Jogador:
            <input
              type="text"
              data-testid="input-player-name"
              id="input-player-name"
              name="playerName"
              placeholder="Insira o nome do jogador"
              onChange={ this.handleInputChange }
              value={ playerName }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            E-mail:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              name="playerEmail"
              placeholder="Insira o e-mail do jogador"
              onChange={ this.handleInputChange }
              value={ playerEmail }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          className="cfg-button"
          data-testid="btn-settings"
          onClick={ () => { history.push('/settings'); } }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  sendPlayerInfoToStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendPlayerInfoToStore: (playerName, playerEmail) => (
    dispatch(playerInfoToStore(playerName, playerEmail))),
});

export default connect(null, mapDispatchToProps)(Login);
