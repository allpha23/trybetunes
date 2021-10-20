import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      min: 2,
      name: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { min, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="input-search">
          <input
            onChange={ this.onInputChange }
            data-testid="search-artist-input"
            id="input-search"
            type="text"
            name="name"
          />
        </label>
        <input
          disabled={ name.length < min }
          data-testid="search-artist-button"
          type="submit"
          value="Pesquisar"
        />
      </div>
    );
  }
}

export default Search;
