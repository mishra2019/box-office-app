import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import apiGet from "../misc/config";
import { usedLastQuery } from "../misc/custom-hooks";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const Home = () => {
  const [input, setInput] = usedLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onSearchHandler = () => {
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
      <SearchInput
        type="text"
        placeholder="Search for something"
        onKeyDown={onKeyDownHandler}
        onChange={onInputChangeHandler}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            onChange={onRadioHandler}
            checked={isShowsSearch}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            onChange={onRadioHandler}
            checked={!isShowsSearch}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearchHandler}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
