import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const { name } = await getUser();

    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <h1 data-testid="header-user-name">{ name }</h1>}
      </header>
    );
  }
}

export default Header;
