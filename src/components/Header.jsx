import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const total = this.handleTotal();
    // const totalFixed = total.fixed(2);
    return (
      <header>
        <div>
          <p data-testid="email-field">
            {`Email: ${email}`}
          </p>
        </div>
        <div>
          <p data-testid="total-field">
            { Number(total).toFixed(2) }
          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">
            BRL
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
