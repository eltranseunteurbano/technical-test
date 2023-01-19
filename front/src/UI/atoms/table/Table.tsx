import cn from 'classnames';

interface iTable {
  className?: string
  children: React.ReactNode
}

const Table: React.FC<iTable> = (props) => {
  const { className, children } = props;

  return <table className={cn("transition-all duration-200 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg min-w-full divide-y divide-gray-300", className)}>
    {children}
  </table>
}

export default Table;
