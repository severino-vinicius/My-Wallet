import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getAwesomeAPIData from '../service/economiaAwesomeApi';
import { fetchRequest, fetchNewExpense } from '../redux/actions';

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

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onLoginClick = () => {
    const { dispatch } = this.props;
    // const { value, description, currency, method, tag, id } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }));
    dispatch(fetchNewExpense(this.state));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // console.log(value, description, currency, method, tag);
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
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debt">Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>

          <button
            type="button"
            onClick={ this.onLoginClick }
          >
            Adicionar despesa
          </button>
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
