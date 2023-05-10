import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setSearchQuery } from "../../redux/searchSlice";
import "./SearchComponent.css";
import { RootState } from "../redux/reducers";
import { setSearchQuery } from "../redux/searchSlice";

interface Props {
  onChangeText: (inputValue: string) => void;
}

export default function SearchComponent({ onChangeText }: Props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    setQueryString(query || "");
  }, [location]);

  useEffect(() => {
    // setQueryString(searchQuery);
  }, [searchQuery]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQueryString(newQuery);
      dispatch(setSearchQuery(newQuery));
      onChangeText(newQuery);
    },
    [dispatch, onChangeText]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (queryString) {
      searchParams.set("q", queryString);
    }
    const newPath = `/tasks${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    window.history.replaceState(null, "", newPath);
  }, [queryString]);

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
