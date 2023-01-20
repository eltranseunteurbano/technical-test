import cn from 'classnames';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useGetNurses } from '../../hooks/useNurses';
import { useGetShifts, useMutateShift } from '../../hooks/useShifts';
import { Nurse } from '../../types/Nurse';
import { Shift } from '../../types/Shift';
import getShiftDate from '../../utils/getShiftDate';
import Button from '../atoms/Button';
import InputGroup from '../atoms/form/InputGroup';
import Select from '../atoms/rhf/Select';

interface ISetShiftForm {
  className?: string;
  cb?: () => void;
}

type FormValuesType = {
  nurse: Nurse['id'];
  shift: Shift['id'];
};

const defaultValues: FormValuesType = {
  nurse: '',
  shift: '',
};

const SetShiftForm: React.FC<ISetShiftForm> = (props) => {
  const { className, cb } = props;

  const { mutate: updateShift, isLoading: isMutationLoading } = useMutateShift();
  const { data: shifts, isLoading: isShiftsLoading } = useGetShifts();
  const { data: nurses, isLoading: isNursesLoading } = useGetNurses();

  const isLoading = isNursesLoading || isShiftsLoading;

  const rhForm = useForm<FormValuesType>({ defaultValues });
  const { handleSubmit, watch, setValue } = rhForm;
  const shiftValue = watch('shift');
  const nurseValue = watch('nurse');

  const onSubmit: SubmitHandler<FormValuesType> = (data) => {
    updateShift({ id: data.shift, data: { nurseId: data.nurse } });
    if (cb) cb();
  };

  useEffect(() => {
    if (shiftValue && shifts) {
      const selectedNurse = shifts.find((shift) => shift.id === shiftValue);
      if (selectedNurse?.nurse?.id) setValue('nurse', selectedNurse.nurse.id);
    }
  }, [shiftValue]);

  return (
    <form className={cn('grid gap-4', className)} onSubmit={handleSubmit(onSubmit)}>
      <InputGroup label="Shift">
        {isLoading ? (
          <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md" />
        ) : (
          <Select
            name="shift"
            rhForm={rhForm}
            placeholder="Select a shift"
            options={(shifts || []).map(({ id, startDate, endDate }) => ({
              name: `Shift ${id}: ${getShiftDate(startDate)} - ${getShiftDate(endDate)}`,
              value: id,
            }))}
            disabled={isMutationLoading}
          />
        )}
      </InputGroup>

      {isLoading ? (
        <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md" />
      ) : (
        <InputGroup label="Nurse">
          <Select
            name="nurse"
            rhForm={rhForm}
            placeholder="Select a nurse"
            options={(nurses || []).map((nurse) => ({
              name: `${nurse.firstName} ${nurse.lastName}, ${nurse.qualification}`,
              value: nurse.id,
            }))}
            disabled={isMutationLoading}
          />
        </InputGroup>
      )}

      <Button className="w-fit" type="submit" disabled={!shiftValue || !nurseValue}>
        {isMutationLoading ? 'Saving' : 'Save assignment'}
      </Button>
    </form>
  );
};

export default SetShiftForm;
