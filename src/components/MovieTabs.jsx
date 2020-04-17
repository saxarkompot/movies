import React from 'react'
import cn from "classnames";

class MovieTabs extends React.Component {
  componentWillReceiveProps(nextProps, nextState) {
    console.log("MovieTabs willReceiveProps");
    console.log("MovieTabs nextProps sort_by", nextProps.sort_by);
    console.log("MovieTabs prevProps sort_by", this.props.sort_by);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true
    }
    return false
  }

  render() {
    const { sort_by, updateSortBy } = this.props;
    const handleClick = value => () => updateSortBy(value);
    const getClassLink = (value) => cn("nav-link", { "active": sort_by === value });
    const arrayOfValuesOfDesc = [
      { desc: "popularity.desc", value: "Popularity desc" },
      { desc: "revenue.desc", value: "Revenue desc" },
      { desc: "vote_average.desc", value: "Vote average desc" }
    ];
    console.log("MovieTabs render");
    return (
      <ul className="tabs nav nav-pills">
        {arrayOfValuesOfDesc.map((e, i) => {
          return (
            <li className="nav-item" key={i}>
              <div
                className={getClassLink(e.desc)}
                onClick={handleClick(e.desc)}
              >
                {e.value}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default MovieTabs;