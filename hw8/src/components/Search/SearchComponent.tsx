import { useCallback} from "react";
import { SearchProps } from "../../interfaces/SearchProps";
import "./SearchComponent.css";

export default function SearchComponent({
  searchQuery,
  onChangeText,
}: SearchProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeText(e.target.value);
    },
    [onChangeText]
  );

  return (
    <input
      value={searchQuery}
      onChange={handleChange}
      type="text"
      placeholder="Search Task"
      className="search"
    />
  );
}
