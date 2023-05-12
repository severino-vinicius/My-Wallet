import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userLogin from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    saveBtnDisabbled: true,
  };

  verifyInput = () => {
    const { password, email } = this.state;
    const minChars = 6;
    const re = /\S+@\S+\.\S+/;
    if (password.length >= minChars && re.test(email)) {
      this.setState({
        saveBtnDisabbled: false,
      });
    } else {
      this.setState({
        saveBtnDisabbled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.verifyInput);
  };

  onLoginClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userLogin({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, password, saveBtnDisabbled } = this.state;
    return (
      <div>
        <h1> Login </h1>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Digite seu Email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <br />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="Digite sua senha"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="button"
          disabled={ saveBtnDisabbled }
          onClick={ this.onLoginClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
