import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    // const { expenses } = this.props;
    return (
      <>
        <div>Table</div>
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
          {/* { expenses.map(({ id, value, description, currency, method, tag }) => (
            <th>
              {`${description}`}
            </th>
            <th>
              {`${tag}`}
            </th>
            <th>
              {`${method}`}
            </th>
            <th>
              {`${value}`}
            </th>
          )) } */}
        </tr>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Table);
