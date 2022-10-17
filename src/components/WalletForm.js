import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, fetchExpense } from '../redux/actions';
import '../styles/form.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    currency: 'USD',
  };

  componentDidMount() {
    const { currency } = this.props;
    currency();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleButton = () => {
    const { expenseApi } = this.props;
    const { id } = this.state;
    expenseApi(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    this.setState(() => ({
      id: id + 1,
    }));
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <form className="form-wallet">

        <label
          htmlFor="input-value"
        >
          Valor:
          <input
            id="input-value"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label
          htmlFor="description-input"
        >
          Descrição:
          <input
            className="form_input"
            id="description-input"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>

        <label htmlFor="coin">
          Moeda:
          <select
            id="coin"
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies
              .map((e, index) => <option key={ index }>{ e }</option>)}
          </select>
        </label>

        <label htmlFor="method">
          Forma de Pagamento:
          <select
            id="method"
            type="select"
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            type="select"
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          className="buttonAdd"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  currency: PropTypes.func,
  expenseApi: PropTypes.func }.isRequired;

const mapDispatchToProps = (dispatch) => ({ currency: () => dispatch(fetchApi()),
  expenseApi: (expenses) => dispatch(fetchExpense(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses });

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
