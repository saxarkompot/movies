import React from 'react'

class MovieItem extends React.Component {
  constructor() {
    super();
    this.state = {
      willWatch: false,
    };
  }

  // componentWillUnmount() {
  //   console.log("unmount", this.props.movie.title);
  // }

  // greenfunction = (soso) => {
  //   if (soso) {
  //     this.setState({
  //       sososo: !this.state.sososo
  //     })
  //   }
  // }

  // componentDidMount(){
  //   const {soso} = this.props;
  //   this.greenfunction(soso)
  // }

  render() {
    console.log("MovieItem render");
    const { moviesWillWatch, movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props;
    console.log(moviesWillWatch.includes(movie));
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
            movie.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {movie.vote_average}</p>
            <button
              type="button"
              className={`btn btn-${this.state.willWatch || moviesWillWatch.includes(movie) ? "success" : "secondary"}`}
              onClick={() => {
                this.setState({
                  willWatch: !this.state.willWatch
                });
                this.state.willWatch ? removeMovieFromWillWatch(movie) : addMovieToWillWatch(movie)
              }}              >
              {`${this.state.willWatch ? 'Remove Will Watch' : ' Add Will Watch'}`}
            </button>
          </div>
          <button onClick={removeMovie.bind(null, movie)}>Delete movie</button>
        </div>
      </div>
    );
  };
}

export default MovieItem;