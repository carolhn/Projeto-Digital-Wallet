import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actEmail } from '../redux/actions/index';

const numberMax = 6;

class Login extends Component {
  state = {
    button: true,
    email: '',
    password: '',
  };

  // essa função valida os inputs, salvando o value digitado
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateEmail()); // vou chamar minha função de validação de input, quando digitar algo ele vai fazer verificações ate chegar na condição de habilitar o botão
  };

  handleButton = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state; // ESTOU MANDANDO O MEU EMAIL PARA O PAYLOAD
    dispatch(actEmail(email)); // A CHAVE PAYLOAD ESTA PEGANDO O MEU EMAIL// levando para action
    history.push('/carteira');
  };

  // essa função valida a ação do button(click)
  validateEmail = () => {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const validandoEmail = re.test(email);
    const validandoPass = password.length >= numberMax;
    const buttonState = validandoPass && validandoEmail;
    this.setState({ button: !(buttonState) });
  };

  render() {
    const { button } = this.state;
    return (
      <main className="box-branco">
        <p className="title1">Digital</p>
        <p className="title2">Wallet</p>

        <form className="form">

          <input
            className="input-email"
            type="email"
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="Digite seu Email"
            required
          />

          <input
            type="password"
            className="input-senha"
            data-testid="password-input"
            onChange={ this.handleChange }
            name="password"
            placeholder="Digite sua senha"
            required
          />

          <button
            type="submit"
            className="input-button"
            onClick={ this.handleButton }
            disabled={ button }
          >
            Entrar
          </button>

        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default connect()(Login);
