import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetAssertionsAction, resetScoreAction } from '../redux/actions';
import logo from '../trivia.png';

class Feedback extends React.Component {
  playAgainClick = () => {
    const { history, resetScore, resetAssertions } = this.props;
    resetScore();
    resetAssertions();
    history.push('/Projeto-Trivia');
  }

  rankingButtonClick = () => {
    const { history, resetScore, resetAssertions } = this.props;
    resetScore();
    resetAssertions();
    history.push('/ranking');
  }

  render() {
    const { totalPoints, getScore } = this.props;
    const MIN_POINTS = 3;
    return (
      <div>
        <Header />
        <header className="App-header">
          <Link
            to="/Projeto-Trivia"
          >
            <img src={ logo } className="App-logo" alt="logo" />
          </Link>
        </header>
        <div className="div-feedback">
          { totalPoints < MIN_POINTS
            ? (
              <p data-testid="feedback-text">Could be better...</p>)
            : <p data-testid="feedback-text">Well Done!</p>}
          <p>
            Score:
            {' '}
            <span data-testid="feedback-total-score">
              {getScore}
            </span>
          </p>
          <p>
            Hits:
            {' '}
            <span data-testid="feedback-total-question">
              {totalPoints}
            </span>
          </p>
        </div>
        <button
          type="button"
          className="btn-feedback"
          onClick={ this.playAgainClick }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          className="btn-feedback"
          data-testid="btn-ranking"
          onClick={ this.rankingButtonClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  getScore: store.player.score,
  totalPoints: store.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: (score) => { dispatch(resetScoreAction(score)); },
  resetAssertions: (assertions) => { dispatch(resetAssertionsAction(assertions)); },
});

Feedback.propTypes = {
  totalPoints: PropTypes.number.isRequired,
  getScore: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetScore: PropTypes.func.isRequired,
  resetAssertions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
