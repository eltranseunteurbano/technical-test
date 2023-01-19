import Dialog from '../atoms/Dialog';
import SetShiftForm from '../molecules/SetShiftForm';

interface ISetShiftAssignmentModal {
  className?: string;
  open: boolean;
  onClose: () => void;
}

const SetShiftAssignmentModal: React.FC<ISetShiftAssignmentModal> = (props) => {
  const { className, open, onClose } = props;

  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <header className="mb-4 pb-2">
        <h2 className="text-base font-medium leading-6 text-gray-900">
          Set Shift Assignment
        </h2>
      </header>
      <SetShiftForm />
    </Dialog>
  );
};

export default SetShiftAssignmentModal;
