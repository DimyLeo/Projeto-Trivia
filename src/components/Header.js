import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  // componentDidMount = () => {
  //   this.sendToStorage();
  // }

  // sendToStorage = () => {
  //   const { playerName, playerScore, playerEmail } = this.props;
  //   localStorage.setItem('PlayerName', playerName);
  //   localStorage.setItem('PlayerScore', playerScore);
  //   localStorage.setItem('PlayerEmail', playerEmail);
  // }

  render() {
    const { playerName, playerScore, playerEmail } = this.props;
    console.log(playerScore);
    return (
      <header>
        <img
          className="icon-header"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(playerEmail).toString()}` }
          alt="ProfileAVATAR"
        />
        <p data-testid="header-player-name">
          Player:
          {' '}
          { playerName }
        </p>
        <p>
          Score:
          {' '}
          <span data-testid="header-score">
            { `${playerScore}` }
          </span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number,
  playerEmail: PropTypes.string.isRequired,
};

Header.defaultProps = {
  playerScore: 0,
};

const mapStateToProps = (store) => ({
  playerName: store.login.playerName,
  // playerScore: store.game.player.score,
  playerScore: store.player.score,
  playerEmail: store.login.playerEmail,
});

export default connect(mapStateToProps)(Header);
