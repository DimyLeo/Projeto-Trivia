import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Questions';
import Timer from '../components/Timer';
import {
  actionReciveButton,
  requestQuestions, showTimer, timeOver,
} from '../redux/actions';
import logo from '../trivia.png';

class Game extends React.Component {
  constructor() {
    super();
    this.state = { indexQuestions: 0 };
  }

  componentDidMount = () => {
    const { fetchAPI } = this.props;
    fetchAPI(
      `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem(
        'token',
      )}`,
    );
  };

  saveInLocalStorage = () => {
    const { player, login } = this.props;
    const ranking = localStorage.getItem('ranking');
    const persson = {
      name: login.playerName,
      score: player.score,
      picture: login.playerEmail,
    };
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([persson]));
    } else {
      const ricoverRankingAtLocalStorage = JSON.parse([ranking]);
      console.log(ricoverRankingAtLocalStorage);
      ricoverRankingAtLocalStorage.push(persson);
      localStorage.setItem('ranking', JSON.stringify(ricoverRankingAtLocalStorage));
    }
  }

  onClickChange = () => {
    const { history, showTimerAction, timeOverAction, reciveButton } = this.props;
    const { indexQuestions } = this.state;
    const numberIndex = 4;
    const MAGICNUMBER = 30;
    this.setState((prevState) => ({
      indexQuestions: prevState.indexQuestions + 1,
    }));
    if (indexQuestions === numberIndex) {
      this.saveInLocalStorage();
      history.push('/feedback');
    }
    showTimerAction(MAGICNUMBER);
    timeOverAction(false);
    reciveButton(false);
    this.removeClass();
  }

  removeClass = () => {
    const answers = document.getElementsByClassName('button');
    for (let i = answers.length - 1; i >= 0; i -= 1) {
      answers[i].className = 'button';
    }
  }

  render() {
    const { indexQuestions } = this.state;
    const { questions, requestAPI, requestState, randomArray, showButton } = this.props;
    const requestFailed = 3;
    if (requestState === requestFailed) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Header />
        <header className="App-header">
          <Link
            to="/Projeto-Trivia"
          >
            <img src={ logo } className="App-logo" alt="logo" />
          </Link>
        </header>
        <div className="div-game">
          <Timer />
          {!requestAPI && (
            <Question
              question={ questions[indexQuestions] }
              randomArray={ randomArray[indexQuestions] }
            />
          )}
          { showButton ? (
            <button
              id="buttonNext"
              type="button"
              data-testid="btn-next"
              onClick={ this.onClickChange }
            >
              Next
            </button>
          ) : ('')}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (endPoint) => dispatch(requestQuestions(endPoint)),
  reciveButton: (payload) => dispatch(actionReciveButton(payload)),
  showTimerAction: (payload) => dispatch(showTimer(payload)),
  timeOverAction: (payload) => dispatch(timeOver(payload)),
});

const mapStateToProps = (store) => ({
  questions: store.game.questions,
  requestAPI: store.game.requestAPI,
  requestState: store.game.requestState,
  randomArray: store.game.randomArray,
  showButton: store.game.showButton,
  player: store.player,
  login: store.login,
});

Game.propTypes = {
  requestState: PropTypes.number,
  questions: PropTypes.arrayOf(PropTypes.object),
  fetchAPI: PropTypes.func.isRequired,
  requestAPI: PropTypes.bool,
  randomArray: PropTypes.arrayOf(PropTypes.any),
  showButton: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  showTimerAction: PropTypes.func.isRequired,
  timeOverAction: PropTypes.func.isRequired,
  reciveButton: PropTypes.func.isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
  login: PropTypes.objectOf(PropTypes.any).isRequired,
};

Game.defaultProps = {
  questions: [],
  requestAPI: true,
  requestState: 0,
  randomArray: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
