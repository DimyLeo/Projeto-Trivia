import React from 'react';
import logo from '../trivia.png';

class Settings extends React.Component {
  render() {
    return (
      <>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <h1 data-testid="settings-title">Configurações:</h1>
      </>
    );
  }
}

export default Settings;
