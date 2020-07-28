import React from 'react';
import { Link } from 'react-router-dom';

import { Character } from '../Character';
import { charactersService } from '../_services';

class Characters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      characters: [],
      page: 1,
    };

    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.fetchPrevPage = this.fetchPrevPage.bind(this);
    this.fetchPage = this.fetchPage.bind(this);
  }

  componentDidMount() {
    this.setState(
      (state, props) => ({ loading: true }),
      this.fetchPage,
    );
  }

  fetchNextPage() {
    this.setState(
      (state, props) => ({
        page: state.page + 1,
        loading: true,
      }),
      this.fetchPage,
    );
  }

  fetchPrevPage() {
    if (this.state.page > 1) {
      this.setState(
        (state, props) => ({
          page: state.page - 1,
          loading: true,
        }),
        this.fetchPage,
      );
    }
  }

  fetchPage() {
    charactersService.getCharacters(this.state.page).then(response => this.setState({ characters: response.characters, loading: false }));
  }

  render() {
    const { characters, loading, page } = this.state;

    const charactersList = characters.map((character, index) =>
      <Character key={ index } { ...character } />
    )

    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <p className="text-right">
              <a href="/login" >Logout</a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>¡Bienvenido!</h1>
            <h3>Personajes de Rick and Morty</h3>
            {!!charactersList.length &&
              <table className="table">
                <tbody>
                  { charactersList }
                </tbody>
              </table>
            }
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {loading && <em>Cargando personajes...</em>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {page > 1 &&
              <button className="btn btn-default" onClick={ this.fetchPrevPage }>
                Página anterior
              </button>
            }

            <button className="btn btn-default" onClick={ this.fetchNextPage }>
              Página siguiente
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export { Characters };
