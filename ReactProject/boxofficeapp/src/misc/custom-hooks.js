import { useEffect, useReducer, useState } from "react";
import apiGet from "./config";

const showsReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.showId];
    }
    case "REMOVE": {
      return prevState.filter((showId) => showId !== action.showId);
    }

    default:
      return prevState;
  }
};

const usePersistedReducer = (reducer, initialstate, key) => {
  const [state, dispatch] = useReducer(reducer, initialstate, (initial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, dispatch];
};

export const useShows = (key = "show") => {
  return usePersistedReducer(showsReducer, [], key);
};

export const usedLastQuery = (key = "lastQuery") => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });

  const setPersistedInput = (newState) => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, show: action.show, error: null };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

export const useShow = (showId) => {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        dispatch({ type: "FETCH_SUCCESS", show: results });
      })
      .catch((err) => {
        dispatch({ teype: "FETCH_FAILED", error: err.message });
      });
  }, [showId]);

  return state;
};
