import React from 'react';
import { Link } from 'react-router-dom';

import { charactersService } from '../_services';

class Characters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      page: 1,
    };

    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPrevPage = this.fetchPrevPage.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
  }

  componentDidMount() {
    this.setState(
      (state, props) => ({ characters: { loading: true } }),
      this.fetchPage,
    );   
  }

  fetchNextPage() {
    this.setState(
      (state, props) => ({
        page: state.page + 1,
        characters: { loading: true },
      }),
      this.fetchPage,
    );    
  }

  fetchPrevPage() {
    if (this.state.page > 1) {
      this.setState(
        (state, props) => ({
          page: state.page - 1,
          characters: { loading: true },
        }),
        this.fetchPage,
      );    
    }
  }
  
  fetchPage() {
    charactersService.getCharacters(this.state.page).then(characters => this.setState({ characters }));
  }

  render() {
    const { characters } = this.state;
    return (
      <div>
        <div className="col-md-6 col-md-offset-3">
          <h1>Bienvenido!</h1>
          <h3>Personajes de Rick and Morty</h3>
          {characters.loading && <em>Cargando personajes...</em>}
          {characters.length &&
            <table className="table">
              {characters.map((character, index) =>
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>{character.status}</td>
                  <td>{character.gender}</td>
                  <td>{character.image}</td>
                </tr>
              )}
            </table>
          }
        </div>     
        <div className="col-md-6 col-md-offset-3">
          <button className="btn btn-default" onClick={ this.fetchPrevPage }>
            Página anterior
          </button>
          <button className="btn btn-default" onClick={ this.fetchNextPage }>
            Página siguiente 
          </button>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
      </div>      
    );
  }
}

export { Characters };