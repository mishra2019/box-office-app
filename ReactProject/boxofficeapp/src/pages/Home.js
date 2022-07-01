import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import apiGet from "../misc/Config";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onSearchHandler = () => {
    //https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
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
  const renderResult = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };
  const onRadioHandler = (e) => {
    setSearchOption(e.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Serach for something"
        onKeyDown={onKeyDownHandler}
        onChange={onInputChangeHandler}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            onChange={onRadioHandler}
            checked={isShowsSearch}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            onChange={onRadioHandler}
            checked={!isShowsSearch}
          />
        </label>
      </div>
      <button type="button" onClick={onSearchHandler}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
