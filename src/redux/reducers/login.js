const INITIAL_STATE = {
  token: '',
  playerName: '',
  playerEmail: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_TOKEN_SUCCESS':
    return {
      ...state,
      token: action.token,
    };
  case 'PLAYER_INFO_TO_STORE':
    return {
      ...state,
      playerName: action.playerName,
      playerEmail: action.playerEmail,
    };
  default:
    return state;
  }
};

export default login;
