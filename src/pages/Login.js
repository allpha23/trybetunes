import React from "react";

class Login extends React.Component {
  render() {
    return(
      <div data-testid="page-login">
        <label >
          Nome:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Entrar" />
      </div>
    );
  }
}

export default Login;
