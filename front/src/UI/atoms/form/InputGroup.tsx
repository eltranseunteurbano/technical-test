import cn from 'classnames';

interface IInputGroup {
  children: React.ReactNode;
  label: string;
  className?: string;
}

const InputGroup: React.FC<IInputGroup> = (props) => {
  const { children, className, label } = props;

  return (
    <label className={cn(className)}>
      <span className="text-xs mb-1 tracking-wide absolute -top-2 ml-1 bg-white px-2 box-border text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
};

export default InputGroup;
