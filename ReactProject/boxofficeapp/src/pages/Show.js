import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiGet from "../misc/Config";
const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then((results) => {
      setShow(results);
    });
  }, [id]);
  console.log(show);

  return <div>Show jwhjkk</div>;
};

export default Show;
