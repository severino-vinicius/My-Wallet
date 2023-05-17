import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editItem } from '../redux/actions/index';

class Table extends Component {
  // state = {
  //   expenses: [],
  // };

  // componentDidMount() {
  //   const { expenses } = this.props;
  //   this.setState({
  //     expenses,
  //   });
  // }

  handleDeleteClick = (id) => {
    const { dispatch, expenses } = this.props;
    const removedExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(removedExpense));
  };

  handleEditClick = (id) => {
    const { dispatch } = this.props;
    dispatch(editItem(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          { expenses
            .map(({ id, value, description, currency, method, tag, exchangeRates }) => (
              <tr key={ id }>
                <td>
                  { description }
                </td>
                <td>
                  { tag }
                </td>
                <td>
                  { method }
                </td>
                <td>
                  { Number(value).toFixed(2) }
                </td>
                <td>
                  { exchangeRates[currency].name }
                </td>
                <td>
                  { Number(exchangeRates[currency].ask).toFixed(2) }
                </td>
                <td>
                  { (Number(exchangeRates[currency].ask) * Number(value)).toFixed(2) }
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteClick(id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditClick(id) }
                  >
                    Editar despesa
                  </button>
                </td>
              </tr>
            )) }
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          ask: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  ).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Table);
