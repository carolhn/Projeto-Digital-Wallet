import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Testar se existe uma pagina Login', () => {
  it('Testar se existe um input de password', () => {
    renderWithRouterAndRedux(<App />);

    const password = screen.getByPlaceholderText(/digite sua senha/i);
    expect(password).toBeInTheDocument();
  });
});

describe('Testar se existe na pagina Login', () => {
  it('Testar se existe um input de email', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/digite seu email/i);
    expect(email).toBeInTheDocument();
  });
});

describe('Testar se existe na pagina Login', () => {
  it('Testar se existe um button', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailTest = screen.getByPlaceholderText(/digite seu email/i);
    userEvent.type(emailTest, 'judas@hotmail.com');

    const passwordTest = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(passwordTest, '1234567wwsd');

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(button).toHaveProperty('disabled', false);

    // history.location.pathname para verificar se estamos na página correta
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Teste na tela Wallet', () => {
  it('Testar se existe um campo email', () => {
    renderWithRouterAndRedux(<Wallet />);

    const email = screen.getByText(/email:/i);
    expect(email).toBeInTheDocument();

    const brl = screen.getByText(/brl/i);
    expect(brl).toBeInTheDocument();

    const despesaTotal = screen.getByTestId('total-field');
    expect(despesaTotal).toBeInTheDocument();

    const value = screen.getByTestId('value-input');
    userEvent.type(value, '152.2');
    expect(value).toHaveValue('152.2');

    const description = screen.getByTestId('description-input');
    userEvent.type(description, 'agua');
    expect(description).toHaveValue('agua');

    const adcDespesa = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(adcDespesa).toBeInTheDocument();
    userEvent.click(adcDespesa);
  });
});

describe('Testar pagina carteira', () => {
  it('testar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    userEvent.type(value, '178.90');
    expect(value).toHaveValue('178.90');

    const descriptions = screen.getByTestId('description-input');
    expect(descriptions).toBeDefined();
    userEvent.type(descriptions, 'agua');
    expect(descriptions).toHaveValue('agua');

    const pg = screen.getByRole('combobox', { name: /tag:/i });
    userEvent.type(pg, 'Alimentação');
    expect(pg).toHaveValue('Alimentação');

    const adcDespesa = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(adcDespesa).toBeInTheDocument();
    userEvent.click(adcDespesa);

    const excluirBtn = await screen.findByText(/excluir/i);
    expect(excluirBtn).toBeDefined();
    userEvent.click(excluirBtn);

    const button = await screen.findByRole('button', { name: /excluir/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
