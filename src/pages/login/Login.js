import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading';
import styles from './styles.module.scss';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      min: 3,
      save: false,
      loading: false,
    };

    this.onClickButton = this.onClickButton.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async onClickButton(e) {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ save: true, loading: false });
  }

  render() {
    const { name, min, save, loading } = this.state;
    return (
      <div className={ styles.container }>
        <div data-testid="page-login" className={ styles.form }>
          <input
            className={ styles.inputName }
            onChange={ this.onInputChange }
            data-testid="login-name-input"
            type="text"
            name="name"
            placeholder="nome"
          />
          <input
            className={ styles.inputSubmit }
            onClick={ this.onClickButton }
            disabled={ name.length < min }
            data-testid="login-submit-button"
            type="submit"
            value="Entrar"
          />
          { loading && <Loading /> }
          { save && <Redirect to="/search" /> }
        </div>
      </div>
    );
  }
}

export default Login;
