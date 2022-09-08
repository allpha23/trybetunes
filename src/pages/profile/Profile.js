import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import styles from './styles.module.scss';
import profileDefault from '../../images/profileDefault.svg';
import { getUser } from '../../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      description: '',
      email: '',
      image: '',
      name: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const user = await getUser();
    console.log(user);
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  render() {
    const { name, image, email, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className={ styles.profile_container }>
          <div className={ styles.logo_container }>
            { image ? <img src={ image } alt="profile" />
              : <img src={ profileDefault } alt="default" />}
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
          <form className={ styles.form }>
            <h4>Nome</h4>
            <p>{ name }</p>
            <h4>Email</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
