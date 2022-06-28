import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () => {
  const [input, setInput] = useState("");

  const onSearchHandler = () => {
    //https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
      });
  };
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      onSearchHandler();
    }
  };
  const onInputChangeHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onKeyDown={onKeyDownHandler}
        onChange={onInputChangeHandler}
        value={input}
      />
      <button type="button" onClick={onSearchHandler}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
