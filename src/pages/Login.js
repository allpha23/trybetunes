import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          Nome:
          <input
            data-testid="login-name-input"
            id="name"
            type="text"
            name="name"
          />
        </label>
        <input
          data-testid="login-submit-button"
          type="submit"
          value="Entrar"
        />
      </div>
    );
  }
}

export default Login;
