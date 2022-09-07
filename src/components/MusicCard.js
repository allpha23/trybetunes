import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  async onInputChange({ target }) {
    const { music, fetch } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        await addSong(music);
      } else await removeSong(music);
      this.setState({
        loading: false,
      });
    });
    await fetch();
  }

  isCheked(favorites, music) {
    favorites.every((favorite) => favorite.trackId === music.trackId);
  }

  render() {
    const { music } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading && <Loading />}
        <div>
          <label htmlFor={ music.trackId }>
            Favorita
            <input
              type="checkbox"
              id={ music.trackId }
              onChange={ this.onInputChange }
              data-testid={ `checkbox-music-${music.trackId}` }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favorites: PropTypes.shape({
    trackId: PropTypes.number,
  }),
  fetch: PropTypes.func,
  music: PropTypes.shape({
    trackId: PropTypes.number,
  }),
}.isRequired;

export default MusicCard;
