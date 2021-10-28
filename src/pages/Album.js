import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      response: false,
    };

    this.getMusicDetails = this.getMusicDetails.bind(this);
    this.listMusics = this.listMusics.bind(this);
  }

  componentDidMount() {
    this.listMusics();
  }

  getMusicDetails() {
    const { album, response } = this.state;
    if (response) {
      const { artworkUrl100, artistName, collectionName } = album[0];
      return (
        <div>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3 data-testid="album-name">{ collectionName }</h3>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      );
    }
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
      <di>
        { album.slice(1).map((music) => (
          <div key={ music.trackId }>
            <h4>{ music.trackName }</h4>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <MusicCard music={ music } />
          </div>
        ))}
      </di>
    );
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.getMusicDetails() }
        { this.renderMusics() }
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
