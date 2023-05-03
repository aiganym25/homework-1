import { useCallback } from "react";
import "./SearchComponent.css";
interface Props {
  searchQuery: string;
  onChangeText: (inputValue: string) => void;
}
export default function SearchComponent({ searchQuery, onChangeText }: Props) {
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
