import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./searchBox.module.scss";

interface SearchBoxProps {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = ({ value, handleChange }: SearchBoxProps) => {
  return (
    <div className={styles.searchBox}>
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
