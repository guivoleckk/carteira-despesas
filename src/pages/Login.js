import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendLoginAndPassword } from '../redux/actions/userLogin';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyInput);
  };

  verifyInput = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const MAGIC_NUMBER = 6;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= MAGIC_NUMBER;
    this.setState({ isDisabled: !(verifyEmail && verifyPassword) });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(sendLoginAndPassword(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div
        className="div-login"
      >
        <form
          className="form"
        >
          <h1>Carteira de despesas</h1>
          <input
            type="email"
            placeholder="Email"
            className="input-login"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            placeholder="Senha"
            className="input-password"
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            className="login-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
