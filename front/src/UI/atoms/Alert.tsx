import cn from 'classnames';

import { RuleErrors, RuleMessage } from '../../types/RuleErrors';

type alertType = 'error' | 'warning' | 'success';

interface IAlert {
  className?: string;
  type: alertType;
  rule: RuleErrors;
}

const Alert: React.FC<IAlert> = (props) => {
  const { className, type, rule } = props;

  const iconType: { [key in alertType]: any } = {
    warning: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        ></path>
      </svg>
    ),
    error: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        ></path>
      </svg>
    ),
    success: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  };

  const classes: { [key in alertType]: string } = {
    warning:
      'bg-yellow-100 [&>:first-child]:text-orange-600 [&>:last-child]:text-orange-900  border-orange-400',
    error:
      'bg-red-100 [&>:first-child]:text-red-600 [&>:last-child]:text-red-900 border-red-400',
    success:
      'bg-green-100 [&>:first-child]:text-green-600 [&>:last-child]:text-green-900 border-green-400',
  };

  return (
    <div
      className={cn(
        className,
        classes[type],
        'flex items-center gap-2 px-4 py-2.5 box-border rounded shadow border font-semibold text-sm',
      )}
    >
      <span className="w-5 h-5">{iconType[type]}</span>
      <span className="flex-1">{RuleMessage[rule]}</span>
    </div>
  );
};

export default Alert;
