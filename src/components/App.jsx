import React from "react";
//import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import { API_URL, API_KEY_3 } from "../utils/api";
import Pagination from "./Pagination";

//UI = fn(state, props);
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1
    };
    console.log("APP constructor");
  }

  componentDidMount() {
    console.log("APP did mount");
    this.getMovies();
  }

  componentDidUpdate(prevProp, prevState) {
    console.log("APP did update");
    //console.log("prev", prevProp, prevState);
    //console.log("cur", this.state, this.props);
    if (prevState.sort_by !== this.state.sort_by) {
      //console.log("call api");
      this.getMovies();
    }
    if (prevState.page !== this.state.page) {
      //console.log("call api");
      this.getMovies();
    }
  }

  changePage = direction => {
    let page = this.state.page;
    this.setState({
      page: direction ? page+1 : page-1
    })
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results
        });
      });
  }

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  }

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id
    })
    this.setState({
      movies: updateMovies,
    });
  }

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id
    })
    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  }

  render() {
    console.log("APP render");
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <Pagination
                  page={this.state.page}
                  changePage={this.changePage}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      //soso={this.state.moviesWillWatch.includes(movie)}
                      movie={movie}
                      moviesWillWatch={this.state.moviesWillWatch}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length}</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
