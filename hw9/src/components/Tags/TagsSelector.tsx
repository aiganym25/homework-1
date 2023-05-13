import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { setTag } from "../../redux/tagSlice";
import "./TagsSelector.css";

export default function TagsSelector() {
  const tagOptions = ["All", "Home", "Work", "Health", "Other"];
  const tagSelector = useSelector((state: RootState) => state.tag);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = event.target.value;
    dispatch(setTag(tag));

    if (tag === "All") {
      navigate("/tasks");
    } else {
      navigate(`/tasks/${tag.toLowerCase()}`);
    }
  };

  return (
    <div id="tags-selector">
      <p className="tags-selector__header">Select tasks by tag</p>
      <select
        className="tags-selector__dropdown"
        value={tagSelector.tag}
        onChange={handleTagChange}
      >
        {tagOptions.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
