import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const total = 0;
class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <div className="logo-header">
          <img className="logo" src="https://cdn-icons-png.flaticon.com/512/216/216909.png" alt="logo-trybe" />
          <span className="trybe">Digital</span>
          <span className="wallet">Wallet</span>
        </div>

        <div className="total">
          <p className="name-and-email">Email:</p>
          <p data-testid="email-field">{ email }</p>
        </div>

        <div className="despesa">
          <p>Despesa Total: R$</p>
          <p data-testid="total-field">{ expenses.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = { email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.any) }.isRequired;

const mapStateToProps = (state) => ({ email: state.user.email,
  expenses: state.wallet.expenses
    .reduce((element, index) => {
      element += index.value * Number(index.exchangeRates[index.currency].ask);
      return element;
    }, total),
});

export default connect(mapStateToProps)(Header);
