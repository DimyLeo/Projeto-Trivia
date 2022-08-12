import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Test Login Page', () => {
  it('Test if the page have the user input', () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByPlaceholderText(/Insira o nome do jogador/i);
    expect(name).toBeInTheDocument();
  });

  it('Test if the page have the email input', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/Insira o e-mail do jogador/i);
    expect(email).toBeInTheDocument();
  });

  it('Test the validation button', () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByPlaceholderText(/Insira o nome do jogador/i);
    const email = screen.getByPlaceholderText(/Insira o e-mail do jogador/i);
    const button = screen.getByRole('button', {  name: /play/i});

    expect(button.disabled).toBe(true);

    userEvent.type(name, 'userName');
    userEvent.type(email, 'email@teste.com');

    expect(button.disabled).toBe(false);
  });

  it('Test if on click in the play button is redirect to page Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByPlaceholderText(/Insira o nome do jogador/i);
    const email = screen.getByPlaceholderText(/Insira o e-mail do jogador/i);
    const button = screen.getByRole('button', {  name: /play/i});

    userEvent.type(name, 'userName');
    userEvent.type(email, 'email@teste.com');
    userEvent.click(button);

    const getScore = await screen.findByText("0");
    const { pathname } = history.location;

    expect(pathname).toBe('/game');
    expect(getScore).toBeInTheDocument();
  });

  it('Test if page is redirect on click the button config', () => {
    renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('button', {  name: /configurações/i});
    userEvent.click(buttonConfig);

    const heading = screen.getByText(/configurações/i);
    expect(heading).toBeInTheDocument();
  });
}); 