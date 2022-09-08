import React from 'react';
import { Redirect } from 'react-router';
import Header from '../../components/header/Header';
import profileDefault from '../../images/profileDefault.svg';
import styles from './styles.module.scss';
import { getUser, updateUser } from '../../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      description: '',
      email: '',
      image: '',
      name: '',
      save: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onImageChange({ target }) {
    const { files } = target;
    const image = URL.createObjectURL(files[0]);
    this.setState({
      image,
    });
  }

  async updateProfile(e) {
    e.preventDefault();
    this.setState({ loading: true });
    await updateUser(this.state);
    this.setState({
      loading: false,
      save: true,
    });
  }

  async fetchUser() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  render() {
    const { name, image, email, description, save } = this.state;
    console.log(image);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className={ styles.profile_container }>
          <div className={ styles.logo_container }>
            { image ? <img src={ image } alt="profile" />
              : <img src={ profileDefault } alt="default" />}
            <label htmlFor="input_image">
              Alterar imagem
              <input
                className={ styles.input_image }
                id="input_image"
                type="file"
                onChange={ this.onImageChange }
              />
            </label>
          </div>
          <form onSubmit={ this.updateProfile } className={ styles.form }>
            <label htmlFor="input_name">
              Nome
              <input
                value={ name }
                name="name"
                type="text"
                id="input_name"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="input_email">
              Email
              <input
                value={ email }
                name="email"
                type="text"
                id="input_email"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="input_description">
              Descrição
              <textarea
                className={ styles.input_description }
                id="input_description"
                name="description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </label>
            <div className={ styles.btn_submit_conatainer }>
              <button className={ styles.btn_submit } type="submit">Salvar</button>
            </div>
          </form>
        </div>
        { save && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
