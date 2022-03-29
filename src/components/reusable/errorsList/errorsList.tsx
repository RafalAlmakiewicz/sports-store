import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./errorsList.module.scss";

const ErrorsList = ({ errors }: { errors: string[] }) => {
  return (
    <div className={styles.errors}>
      {errors.length > 0 && (
        <span>
          <FontAwesomeIcon icon="exclamation" />
        </span>
      )}
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsList;
