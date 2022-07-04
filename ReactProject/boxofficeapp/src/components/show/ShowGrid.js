import React from "react";
import IMAGE_NOT_FOUND from "../../images/not-found.png";
import { useShows } from "../../misc/custom-hooks";
import { FlexGrid } from "../styled";

import ShowCard from "./ShowCard";
const ShowGrid = ({ data }) => {
  const [starred, dispatchStarred] = useShows();
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starred.includes(show.id);

        const onStarredClick = () => {
          if (isStarred) {
            dispatchStarred({ type: "REMOVE", showId: show.id });
          } else {
            dispatchStarred({ type: "ADD", showId: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onStarredClick={onStarredClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
