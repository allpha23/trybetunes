import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange() {
    const { music } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(music);
      this.setState({
        loading: false,
      });
    });
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
  music: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
