const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`;

const getQuestions = async () => {
  const response = await fetch(QUESTIONS_URL);
  const data = await response.json();
  return data;
};

export default getQuestions;
