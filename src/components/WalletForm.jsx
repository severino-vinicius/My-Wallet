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
    method: 'Dinheiro',
    tag: 'Alimentação',
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
    const { id } = this.state;
    if (editor && (prevProps.editor !== editor || prevProps.idToEdit !== idToEdit)) {
      const expenseToEdit = expenses.filter((expense) => expense.id === idToEdit);
      const { value,
        description,
        currency,
        method,
        tag,
        exchangeRates } = expenseToEdit[0];
      this.setState({
        oldId: id,
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
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  onEditClick = () => {
    const { dispatch } = this.props;
    const { oldId } = this.state;
    dispatch(saveEditedItem(this.state));
    this.setState({
      id: oldId,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (

      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4"> Inserir Despesas </h2>
        <div className="flex flex-wrap justify-between">
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="Valor"
            className="border border-neutral-950 m-3 rounded-lg text-center"
            onChange={ this.handleChange }
          />

          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="Descrição"
            className="border border-neutral-950 m-3 rounded-lg text-center"
            onChange={ this.handleChange }
          />

          <select
            name="currency"
            data-testid="currency-input"
            value={ currency }
            className="bg-white border border-neutral-950 m-3 rounded-lg text-center"
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
            className="bg-white border border-neutral-950 m-3 rounded-lg text-center"
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
            className="bg-white border border-neutral-950 m-3 rounded-lg text-center"
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
              <button
                type="button"
                className="w-full text-white rounded-lg mt-3 p-1 bg-blue-800"
                onClick={ this.onAddClick }
              >
                Adicionar despesa
              </button>
            ) : (
              <button
                type="button"
                className="w-full text-white rounded-lg mt-3 p-1 bg-blue-800"
                onClick={ () => this.onEditClick() }
              >
                Editar despesa
              </button>
            )
          }
        </div>
      </div>
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
