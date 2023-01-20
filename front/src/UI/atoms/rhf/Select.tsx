import { UseFormReturn } from 'react-hook-form';

type Option = {
  name: string;
  value: string;
};

interface ISelect {
  placeholder: string;
  options: Option[];
  rhForm: UseFormReturn<any, any>;
  name: string;
  disabled?: boolean;
}

const Select: React.FC<ISelect> = (props) => {
  const { placeholder, options, rhForm, name, disabled } = props;

  const { register } = rhForm;

  return (
    <select className="w-full" {...register(name)} disabled={disabled}>
      <>
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </>
    </select>
  );
};

export default Select;
