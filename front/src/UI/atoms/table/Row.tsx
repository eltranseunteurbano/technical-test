import React from 'react';
import cn from 'classnames'; 

interface iRow {
  className?: string
  type?: 'head' | 'body'
  children: React.ReactNode
}

const Row:React.FC<iRow> = (props) => {
  const { className, children, type = 'body' } = props;

  const isRowBody = type === 'body';
  const classes = cn(className, isRowBody ? "hover:bg-gray-50" : "bg-gray-100");

  if(isRowBody) return <tbody className={classes}>{children}</tbody>

  return <thead className={classes}>{children}</thead>
}

export default Row;
