import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <li><Link to="/search" data-testid="link-to-search">Pesquisa</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </nav>
      </header>
    );
  }
}

export default Header;
