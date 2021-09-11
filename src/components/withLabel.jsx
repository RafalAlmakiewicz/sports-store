import { firstLetterToUpper } from "../utils";

const withLabel = (WrappedComponent, labelProp) => (props) => {
  return (
    <div>
      <label htmlFor={props[labelProp]}>
        {firstLetterToUpper(props[labelProp])}
      </label>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withLabel;
