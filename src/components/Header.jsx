import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../img/TrybeWalletLogo.png';
import UserIcon from '../img/user.png';

class Header extends Component {
  handleTotal = () => {
    const { expenses } = this.props;

    const sumQuot = expenses.reduce((acc, { currency, value, exchangeRates }) => {
      const expenseValue = parseFloat(value) * exchangeRates[currency].ask;
      return acc + expenseValue;
    }, 0);
    return sumQuot;
  };

  render() {
    const { email } = this.props;
    const total = Number(this.handleTotal()).toFixed(2);
    return (
      <header
        className="bg-white flex justify-between items-center w-3/4 rounded-md shadow-lg"
      >
        <div>
          <img src={ Logo } alt="Logo Trybe Wallet" className="w-60 rounded-md" />
        </div>
        <div>
          <p data-testid="total-field">
            { `Total de despesas: ${total} BRL` }
          </p>
        </div>
        <div className="flex">
          <img src={ UserIcon } alt="UserIcon" className="w-6 h-6" />
          <p data-testid="email-field">
            { email }
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
