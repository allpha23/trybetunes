import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      min: 2,
      name: '',
      artist: '',
      card: [],
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onInputChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onClickButton(e) {
    e.preventDefault();
    const { name } = this.state;

    this.setState({
      loading: true,
      artist: name,
    }, async () => {
      const { artist } = this.state;
      const album = await searchAlbumsAPI(artist);
      this.setState({
        name: '',
        card: album,
        loading: false,
      });
    });
  }

  createCards() {
    const { artist, card } = this.state;
    if (card.length === 0) return <h2>Nenhum álbum foi encontrado</h2>;
    return (
      <div>
        <h3>{ `Resultado de álbuns de: ${artist}` }</h3>
        <section>
          { card.map((album, index) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <p>{ album.collectionName }</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                { `Album ${index + 1}` }
              </Link>
            </div>
          ))}
        </section>
      </div>);
  }

  render() {
    const { min, name, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <label htmlFor="input-search">
                  <input
                    onChange={ this.onInputChange }
                    data-testid="search-artist-input"
                    id="input-search"
                    type="text"
                    name="name"
                    value={ name }
                  />
                </label>

                <input
                  onClick={ this.onClickButton }
                  disabled={ name.length < min }
                  data-testid="search-artist-button"
                  type="submit"
                  value="Pesquisar"
                />
              </div>)
        }

        { this.createCards() }
      </div>
    );
  }
}

export default Search;
