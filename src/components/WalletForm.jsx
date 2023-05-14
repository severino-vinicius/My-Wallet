import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getAwesomeAPIData from '../service/economiaAwesomeApi';
import { fetchRequest } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const responseApi = await getAwesomeAPIData();
    const responseApiKeys = Object.keys(responseApi);
    const filterdcurrencies = responseApiKeys.filter((element) => element !== 'USDT');

    dispatch(fetchRequest(filterdcurrencies));
  }

  render() {
    const { currencies } = this.props;
    // const filterdcurrencies = currencies.filter((element) => element !== 'USDT');
    return (
      <>
        <h2> Inserir Despesas </h2>
        <div>

          <input
            type="number"
            name="expValue"
            data-testid="value-input"
            placeholder="Valor"
          />

          <input
            type="text"
            name="expDescription"
            data-testid="description-input"
            placeholder="Descrição"
          />

          <select
            name="expCurrencies"
            data-testid="currency-input"
          >
            { currencies.map((currencie) => (
              <option value={ currencie } key={ currencie }>
                { currencie }
              </option>
            )) }
          </select>

          <select
            name="expPaymentMethod"
            data-testid="method-input"
          >
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debt">Cartão de débito</option>
          </select>

          <select
            name="expTag"
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
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
