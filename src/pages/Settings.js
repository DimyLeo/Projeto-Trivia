import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

class Settings extends React.Component {
  render() {
    return (
      <>
        <header className="App-header">
          <Link
            to="/Projeto-Trivia"
          >
            <img src={ logo } className="App-logo" alt="logo" />
          </Link>
        </header>
        <h1 data-testid="settings-title">Configurações:</h1>
      </>
    );
  }
}

export default Settings;
