export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCSSES = 'REQUEST_SUCSSES';
export const REQUEST_ERROR = 'REQUEST_ERROR';
const randomNumber = 0.5;

const receiveTokenSuccess = (token) => ({
  type: 'RECEIVE_TOKEN_SUCCESS',
  token,
});

const requestAPI = () => ({
  type: REQUEST_API,
});

const requestSuccess = (obj) => ({
  type: REQUEST_SUCSSES,
  questions: obj.results,
  requestState: obj.response_code,
  randomArray: obj.results.map((question) => [
    question.correct_answer,
    ...question.incorrect_answers].sort(() => Math.random() - randomNumber)),
});

const requestError = () => ({
  type: REQUEST_ERROR,
});

export const requestQuestions = (endPoint) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const resolve = await fetch(endPoint);
    const data = await resolve.json();
    dispatch(requestSuccess(data));
  } catch (error) {
    dispatch(requestError());
  }
};

const playerInfoToStore = (playerName, playerEmail) => ({
  type: 'PLAYER_INFO_TO_STORE',
  playerName,
  playerEmail,
});

const showTimer = (payload) => ({ type: 'SHOW_TIMER', payload });

const timeOver = (payload) => ({ type: 'TIME_OVER', payload });

const actionReciveButton = (payload) => ({ type: 'SHOW_BUTTON', payload });

const sumScore = (payload) => ({ type: 'SUM_SCORE', payload });

const sumTotalPoints = () => ({ type: 'SUM_TOTAL_POINTS' });

const resetScoreAction = () => ({ type: 'RESET_SCORE' });

const resetAssertionsAction = () => ({ type: 'RESET_ASSERTIONS' });

export {
  receiveTokenSuccess,
  playerInfoToStore,
  showTimer,
  timeOver,
  actionReciveButton,
  sumScore,
  sumTotalPoints,
  resetScoreAction,
  resetAssertionsAction,
};
