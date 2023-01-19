import cn from 'classnames';

interface IButton extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<IButton> = (props) => {
  const { className, children, ...other } = props;

  return (
    <button
      className={cn(
        'relative items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed',
        className,
      )}
      type="button"
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
