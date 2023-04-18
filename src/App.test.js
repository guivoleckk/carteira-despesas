import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Wallet from './pages/Wallet';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';

describe('testando o login', () => {
  test('minha amigo', () => {
    renderWithRouterAndRedux(<App />);
    const getInputEmail = screen.getAllByRole('textbox')[0];
    const getInputPassword = screen.getAllByRole('textbox')[1];
    const testEmail = 'teste@hotmail.com';
    const testPassword = '123456';
    const getButtonSubmit = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(getInputEmail, testEmail);
    userEvent.type(getInputPassword, testPassword);
    expect(getButtonSubmit).not.toBeDisabled();
    userEvent.click(getButtonSubmit);
    const getEmailScreen = screen.getByText(/teste@hotmail\.com/i);
    const getNumberHeader = screen.getByText(/0\.00/i);
    const getTwoInputs = screen.getAllByRole('textbox');
    const getButtonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(getNumberHeader).toBeInTheDocument();
    expect(getEmailScreen).toBeInTheDocument();
    expect(getButtonAdd).toBeInTheDocument();
    expect(getTwoInputs[0]).toBeInTheDocument();
    expect(getTwoInputs[1]).toBeInTheDocument();
  });

  test('testando header', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const READ_VALUE = 10;
    const READ_DESCRIPTION = 'sou lindo';

    const getValor = screen.getByRole('textbox', {
      name: /valor/i,
    });
    const getDescricao = screen.getByRole('textbox', {
      name: /descrição/i,
    });
    const getButtonAddDespesa = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(getButtonAddDespesa).toBeInTheDocument();
    userEvent.type(getValor, READ_VALUE);
    userEvent.type(getDescricao, READ_DESCRIPTION);
    userEvent.click(getButtonAddDespesa);

    await waitFor(() => {
      const getCell = screen.findAllByRole('cell', {
        name: /sou lindo/i,
      });
      expect(getCell).toBeInTheDocument();
    });
  });
});

// ACESSE:  https://www.youtube.com/watch?v=TRPBY_lxJfE
