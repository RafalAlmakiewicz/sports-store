import Radio from "./radio";

interface RadioGroupProps {
  buttons: { id: string; value?: string }[];
  selectedValue: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  className?: string;
}

const RadioGroup = ({
  buttons,
  selectedValue,
  handleChange,
  name,
  className,
}: RadioGroupProps) => {
  return (
    <div className={className}>
      {buttons.map((button) => (
        <Radio
          key={button.id}
          id={button.id}
          value={button.value}
          name={name}
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
