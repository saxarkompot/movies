import React from "react";

class Pagination extends React.Component {
  render() {
    const { page, changePage } = this.props;
    const arrayOfNumbers = ["<", page, ">"];
    const handleClick = value => value === "<" ? changePage(false) : changePage(true);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {arrayOfNumbers.map((e, i) => {
            return (
              <li className="page-item" key={i}>
                <div
                  className="page-link"
                  onClick={() => (e === page) || (page === 1 && e === "<") ? null : handleClick(e)}>
                  {e}
                </div>
              </li>
            )
          })}
        </ul >
      </nav >
    )
  }
}

export default Pagination;