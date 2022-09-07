import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../pages/Loading';
import { getUser } from '../../services/userAPI';
import styles from './styles.module.scss';
import trybeTunesLogo from '../../images/trybeTunes.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
      isSearch: false,
      isFav: false,
      isProf: false,
    };

    this.select = this.select.bind(this);
  }

  componentDidMount() {
    this.getUserName();
    this.select();
  }

  async getUserName() {
    const { name } = await getUser();

    this.setState({
      name,
      loading: false,
    });
  }

  headerLogo(name) {
    return (
      <div className={ styles.logo }>
        <img src={ trybeTunesLogo } alt="trybe tunes logo" />
        <p data-testid="header-user-name">{ name }</p>
      </div>);
  }

  select() {
    if (window.location.pathname === '/profile') {
      this.setState({ isProf: true });
    }

    if (window.location.pathname === '/search') {
      this.setState({ isSearch: true });
    }

    if (window.location.pathname === '/favorites') {
      this.setState({ isFav: true });
    }
  }

  render() {
    const { name, loading, isSearch, isFav, isProf } = this.state;
    return (
      <header data-testid="header-component" className={ styles.container }>
        {loading ? <Loading /> : this.headerLogo(name)}
        <nav>
          <li className={ `${isSearch && styles.selected}` }>
            <Link
              className={ styles.decoration }
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisa
            </Link>
          </li>
          <li className={ `${isFav && styles.selected}` }>
            <Link
              className={ styles.decoration }
              to="/favorites"
              data-testid="link-to-favorites"
              name="Favoritos"
            >
              Favoritos
            </Link>
          </li>
          <li className={ `${isProf && styles.selected}` }>
            <Link
              className={ styles.decoration }
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </li>
        </nav>
      </header>
    );
  }
}

export default Header;
