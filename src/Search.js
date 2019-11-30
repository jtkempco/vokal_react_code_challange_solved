import React, { Fragment } from "react";

const Search = props => {
  return (
    <Fragment>
      <input type="text" onChange={props.onChange} />
      <button onClick={props.onClick}>Submit</button>
    </Fragment>
  );
};

export default Search;
