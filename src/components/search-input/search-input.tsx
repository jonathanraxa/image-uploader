import { Input } from "antd";

import "./search-input.scss";

interface SearchInputProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ handleSearch }) => (
  <Input
    onChange={handleSearch}
    className="search-input"
    placeholder="Search images..."
  />
);
