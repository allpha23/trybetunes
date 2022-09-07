import React from 'react';
import Header from '../../components/header/Header';
import Loading from '../Loading';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import styles from './styles.module.scss';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
    };

    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { favorites } = this.state;
    if (prevState.favorites !== favorites) {
      this.testCheckBox();
    }
  }

  async fetchFavoriteSongs() {
    this.setState({
      loading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favorites,
        loading: false,
      });
    });
  }

  testCheckBox() {
    const { favorites } = this.state;
    favorites.forEach(({ trackId }) => {
      const favorite = document.getElementById(trackId);
      if (favorite) {
        favorite.checked = true;
      }
    });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        { loading && <Loading /> }
        <Header />
        <div className={ styles.music_container }>
          { favorites.map((song) => (
            <div key={ song.trackId } className={ styles.music_card }>
              <img src={ song.artworkUrl100 } alt={ song.collectionName } />
              <h4>{ song.trackName }</h4>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <MusicCard music={ song } fetch={ this.fetchFavoriteSongs } />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
