const ValidationErrors = ({ errors }: { errors: string[] }) => {
  return (
    <ul>
      {errors.map((error) => (
        <li key={error} className="error">
          {error}
        </li>
      ))}
    </ul>
  );
};

export default ValidationErrors;
