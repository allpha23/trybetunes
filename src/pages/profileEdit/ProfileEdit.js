import React from 'react';
import Header from '../../components/header/Header';
import profileDefault from '../../images/profileDefault.svg';
import styles from './styles.module.scss';
import { getUser } from '../../services/userAPI';

class ProfileEdit extends React.Component {
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
      <div data-testid="page-profile-edit">
        <Header />
        <div className={ styles.profile_container }>
          <div className={ styles.logo_container }>
            <img src={ profileDefault } alt="profile default" />
            <input type="file"/>
          </div>
          <form className={ styles.form }>
            <label htmlFor="input_name">
              Nome
              <input type="text" id="input_name"/>
            </label>
            <label htmlFor="input_email">
              Email
              <input type="text" id="input_email"/>
            </label>
            <label htmlFor="input_description">
              Descrição
              <textarea className={ styles.input_description} id="input_description"/>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
