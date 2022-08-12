import { REQUEST_API, REQUEST_SUCSSES } from '../actions';

const INITIAL_STATE = {
  player: {
    score: 0,
  },
  timer: 30,
  timeOver: false,
  showButton: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, requestAPI: true };
  case REQUEST_SUCSSES:
    return { ...state,
      questions: action.questions,
      player: { score: 0 },
      randomArray: action.randomArray,
      requestAPI: false,
      requestState: action.requestState,
    };
  case 'SHOW_TIMER':
    return {
      ...state, timer: action.payload,
    };
  case 'TIME_OVER':
    return {
      ...state, timeOver: action.payload,
    };

  case 'SHOW_BUTTON':
    return {
      ...state, showButton: action.payload,
    };
  // case 'SUM_SCORE':
  //   return {
  //     ...state, player: { score: action.payload },
  //   };
  default:
    return state;
  }
};

export default game;
