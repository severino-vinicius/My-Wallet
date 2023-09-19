import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogin } from '../redux/actions/index';

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
    const btnStyleDisabled = 'w-4/5 text-white rounded-lg p-1 bg-gray-800';
    const btnStyleenabled = 'w-4/5 text-white rounded-lg p-1 bg-blue-800';
    return (
      <div
        className="
        bg-stone-300
        min-h-screen
        flex
        flex-col
        justify-center
        items-center text-center"
      >
        <div className="bg-white px-16 py-6 rounded-xl shadow-lg">
          <h1 className="text-4xl mb-6"> Login </h1>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Digite seu Email"
            data-testid="email-input"
            className="w-full border-2 border-slate-400 mb-2 rounded-lg text-center"
            onChange={ this.handleChange }
          />
          <br />
          <input
            type="password"
            name="password"
            value={ password }
            placeholder="Digite sua senha"
            data-testid="password-input"
            className="w-full border-2 border-slate-400 mb-3 rounded-lg text-center"
            onChange={ this.handleChange }
          />
          <br />
          <button
            type="button"
            disabled={ saveBtnDisabbled }
            onClick={ this.onLoginClick }
            className={ saveBtnDisabbled ? btnStyleDisabled : btnStyleenabled }
          >
            Entrar
          </button>
        </div>
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
