import cn from 'classnames'; 

interface iCell {
  className?: string
  type?: 'header' | 'body'
  children: React.ReactNode
}

const Cell:React.FC<iCell> = (props) => {
  const { className, children, type = 'body' } = props;

  const isCellBody = type === 'body';

  const conditionallyClases = isCellBody ? 'py-4 text-gray-500' : 'py-3.5 text-gray-900 font-semibold';
  const classes = cn(className, conditionallyClases, "px-3 text-left text-sm transition-all duration-150");

  if(isCellBody) return <td className={classes}>{children}</td>
  return <th scope="col" className={classes}>{children}</th>
}

export default Cell;
