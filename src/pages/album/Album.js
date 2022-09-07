import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../Loading';
import styles from './styles.module.scss';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      response: false,
      loading: false,
      favorites: [],
    };

    this.getMusicDetails = this.getMusicDetails.bind(this);
    this.listMusics = this.listMusics.bind(this);
    this.testCheckBox = this.testCheckBox.bind(this);
  }

  componentDidMount() {
    this.listMusics();
    this.handleGetFavoriteSong();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { favorites } = this.state;
    if (prevState.favorites !== favorites) {
      this.testCheckBox();
    }
  }

  async handleGetFavoriteSong() {
    this.setState({
      loading: true,
    }, async () => {
      const favorite = await getFavoriteSongs();
      this.setState({
        favorites: favorite,
        loading: false,
      });
    });
  }

  getMusicDetails() {
    const { album, response } = this.state;
    if (response) {
      const { artworkUrl100, artistName, collectionName } = album[0];
      return (
        <div className={ styles.album }>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3 data-testid="album-name">{ collectionName }</h3>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      );
    }
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

  async listMusics() {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      album: music,
      response: true,
    });
  }

  renderMusics() {
    const { album } = this.state;
    return (
      <div className={ styles.musics }>
        { album.slice(1).map((music) => (
          <div key={ music.trackId } className={ styles.musicCard }>
            <h4>{ music.trackName }</h4>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <MusicCard music={ music } fetch={ () => {} } />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        { loading && <Loading /> }
        <Header />
        <div className={ styles.albumContainer }>
          { this.getMusicDetails() }
          { this.renderMusics() }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
