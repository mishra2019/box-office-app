import { useEffect, useReducer } from "react";

const showsReducer = (prevstate, action) => {
  switch (action.type) {
    case "ADD": {
      return [...prevstate, action.showId];
    }
    case "REMOVE": {
      return prevstate.filter((showId) => showId !== action.showId);
    }

    default:
      return prevstate;
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
