import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const valorInicial = 0;
    return (
      <header>
        <div>
          <p data-testid="email-field">
            {`Email: ${email}`}
          </p>
        </div>
        <div>
          <p data-testid="total-field">
            {`Despesa Total: ${valorInicial}` }
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
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
