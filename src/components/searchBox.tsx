import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBoxProps {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = ({ value, handleChange }: SearchBoxProps) => {
  return (
    <div className="search-box">
      <input
        type="text"
        name="search"
        value={value}
        onChange={handleChange}
        placeholder="Search..."
      />
      <FontAwesomeIcon icon="search" />
    </div>
  );
};

export default SearchBox;
