import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Test Feedback Page', () => {

  const withHits = {
    player: {
      name: 'Flavinho do Pneu',
      assertions: 3,
      score: 148,
      gravatarEmail: 'https://www.gravatar.com/avatar/e11459af12a777db80bb28970b21b1e27a3dc8343f69ee7587114278690ca71b'
    }
  };

  const noHits = {
    player: {
      name: 'Steve Jobs',
      assertions: 0,
      score: 0,
      gravatarEmail: 'https://www.gravatar.com/avatar/e11459af12a777db80bb28970b21b1e27a3dc8343f69ee7587114278690ca71b'
    }
  };


it('Test if the score with hits match', () => {
renderWithRouterAndRedux(<App />, withHits, '/feedback');

  const score = screen.getByTestId('feedback-total-score');
  expect(score).toHaveTextContent(withHits.player.score);
  expect(score).toBeInTheDocument();

  const message = screen.getByTestId('feedback-text');
  expect(message).toHaveTextContent('Well Done!');
  expect(message).toBeInTheDocument();

  const hits = screen.getByTestId('feedback-total-question');
  expect(hits).toHaveTextContent(withHits.player.assertions);
  expect(hits).toBeInTheDocument()
});

it('Test if the score with no hits match', () => {
  renderWithRouterAndRedux(<App />, noHits, '/feedback');
  
    const score = screen.getByTestId('feedback-total-score');
    expect(score).toHaveTextContent(noHits.player.score);
    expect(score).toBeInTheDocument();
  
    const message = screen.getByTestId('feedback-text');
    expect(message).toHaveTextContent('Could be better...');
    expect(message).toBeInTheDocument();
  
    const hits = screen.getByTestId('feedback-total-question');
    expect(hits).toHaveTextContent(noHits.player.assertions);
    expect(hits).toBeInTheDocument();
  });

it('Test if the page have the button Play Again', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/feedback')

  const button = screen.getByTestId('btn-play-again');
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  expect(history.location.pathname).toBe('/Projeto-Trivia');
});

it('Test if the page have the button Ranking', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/feedback')

  const button = screen.getByTestId('btn-ranking');
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  expect(history.location.pathname).toBe('/ranking');
  });
});