import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { setSearchQuery } from "../redux/searchSlice";
import "./SearchComponent.css";

export default function SearchComponent() {
  const location = useLocation();
  const [queryString, setQueryString] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); // from url it sets the searchQUERY
    const query = searchParams.get("q");
    setQueryString(query || "");
    // console.log(query)
    dispatch(setSearchQuery(query));
  }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams();  // from INPUT it sets the searchQUERY
    if (queryString) {
      searchParams.set("q", queryString);
    }
    const newPath = `/tasks${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    window.history.replaceState(null, "", newPath);
  }, [queryString]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQueryString(newQuery);
      dispatch(setSearchQuery(newQuery));
    },
    [dispatch]
  );

  return (
    <input
      value={queryString}
      onChange={handleChange}
      type="text"
      placeholder="Search Task"
      className="search"
    />
  );
}
