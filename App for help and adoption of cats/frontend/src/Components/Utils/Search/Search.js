import { useEffect, useState } from "react";
import classes from "./Search.module.css";

const Search = (props) => {
  const [text, setText] = useState(props.text ? props.text : "");

  useEffect(() => {
    const timer = setTimeout(() => {
      props.getAllItems(text);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  },[text]);

  return (
    <div className={classes.search}>
      <label htmlFor="search">Search:</label>
      <input
        type="search"
        id="search"
        placeholder="search..."
        onChange={(event) => setText(event.target.value)}
      ></input>
    </div>
  );
};

export default Search;
