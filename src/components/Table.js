import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exDelete } from '../redux/actions';
import '../styles/table.css';

class Table extends Component {
  handleDelete = () => {
    const { exDeletes, expenses } = this.props;
    const deletar = expenses.splice(1);
    return exDeletes(deletar);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses.map((e) => (
          <tbody key={ e.id }>
            <tr className="conversao">
              <td>{ e.description }</td>
              <td>{ e.tag }</td>
              <td>{ e.method }</td>
              <td>{ `R$ ${Number(e.value).toFixed(2)}`}</td>
              <td>{ (e.exchangeRates[e.currency].name) }</td>
              <td>{`R$ ${Number(e.exchangeRates[e.currency].ask).toFixed(2)}`}</td>
              <td>
                { `R$ ${(Number(e.value) * Number(e.exchangeRates[e.currency]
                  .ask)).toFixed(2)}` }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  className="editar"
                  data-testid="edit-btn"
                > <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </button>

                <button
                  type="button"
                  className="excluir"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete() }
                > <svg className="lixeira" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        )) }
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  exDeletes: (expenses) => dispatch(exDelete(expenses)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    tag: PropTypes.string,
    description: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    img: PropTypes.string,
    currency: PropTypes.string,
  })).isRequired,
  exDeletes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg> */
