import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';

class Ranking extends React.Component {
  goHomeButton = () => {
    const { history } = this.props;
    history.push('/Projeto-Trivia');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <div>
        <header className="App-header">
          <Link
            to="/Projeto-Trivia"
          >
            <img src={ logo } className="App-logo" alt="logo" />
          </Link>
        </header>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((position, index) => (
            <div key={ index } className="div-ranking">
              <img
                src={ `https://www.gravatar.com/avatar/${md5(position.picture).toString()}` }
                alt="GravatarImage"
              />
              <p data-testid={ `player-name-${index}` }>{position.name}</p>
              <p data-testid={ `player-score-${index}` }>{position.score}</p>
            </div>
          ))
        }

        <button
          type="button"
          id="go-home-rank"
          data-testid="btn-go-home"
          onClick={ this.goHomeButton }
        >
          Go Home!
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
