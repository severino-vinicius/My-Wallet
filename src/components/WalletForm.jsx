import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getAwesomeAPIData from '../service/economiaAwesomeApi';
import { fetchRequest, fetchNewExpense, saveEditedItem } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'money',
    tag: 'food',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const responseApi = await getAwesomeAPIData();
    const responseApiKeys = Object.keys(responseApi);
    const filterdcurrencies = responseApiKeys.filter((element) => element !== 'USDT');

    dispatch(fetchRequest(filterdcurrencies));
  }

  async componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;
    if (editor && (prevProps.editor !== editor || prevProps.idToEdit !== idToEdit)) {
      const expenseToEdit = expenses.filter((expense) => expense.id === idToEdit);
      const { value,
        description,
        currency,
        method,
        tag,
        exchangeRates } = expenseToEdit[0];
      this.setState({
        id: idToEdit,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onAddClick = () => {
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }));
    dispatch(fetchNewExpense(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'money',
      tag: 'food',
    });
  };

  onEditClick = () => {
    const { dispatch } = this.props;
    dispatch(saveEditedItem(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'money',
      tag: 'food',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <h2> Inserir Despesas </h2>
        <div>

          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="Valor"
            onChange={ this.handleChange }
          />

          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ this.handleChange }
          />

          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((currencie) => (
              <option value={ currencie } key={ currencie }>
                { currencie }
              </option>
            )) }
          </select>

          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {
            !editor ? (
              <button type="button" onClick={ this.onAddClick }>
                Adicionar despesa
              </button>
            ) : (
              <button type="button" onClick={ () => this.onEditClick() }>
                Editar despesa
              </button>
            )
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
