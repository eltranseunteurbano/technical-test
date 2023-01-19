import cn from 'classnames';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useNurses from '../../hooks/useNurses';
import { Nurse } from '../../types/Nurse';
import { Shift } from '../../types/Shift';
import getShiftDate from '../../utils/getShiftDate';
import Button from '../atoms/Button';
import InputGroup from '../atoms/form/InputGroup';
import Select from '../atoms/rhf/Select';

interface ISetShiftForm {
  className?: string;
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
  const { className } = props;

  const { getNurses } = useNurses();
  const { data: nurses, isLoading: isNurseLoading } = getNurses;
  const shifts: Shift[] = [
    {
      id: '0',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '2',
        firstName: 'Fredd',
        lastName: 'Trimp',
        username: 'username',
        qualification: 'LPN',
      },
    },
    {
      id: '1',
      qualification: 'RN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '1',
        firstName: 'Nichols',
        lastName: 'Fellini',
        username: 'username',
        qualification: 'RN',
      },
    },
    {
      id: '2',
      qualification: 'CNA',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '2',
        firstName: 'Fredd',
        lastName: 'Trimp',
        username: 'username',
        qualification: 'LPN',
      },
    },
    {
      id: '3',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '0',
        firstName: 'Mitchell',
        lastName: 'Bagnall',
        username: 'username',
        qualification: 'RN',
      },
    },
    {
      id: '4',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '0',
        firstName: 'Mitchell',
        lastName: 'Bagnall',
        username: 'username',
        qualification: 'RN',
      },
    },
    {
      id: '5',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '1',
        firstName: 'Nichols',
        lastName: 'Fellini',
        username: 'username',
        qualification: 'RN',
      },
    },
    {
      id: '6',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '2',
        firstName: 'Fredd',
        lastName: 'Trimp',
        username: 'username',
        qualification: 'LPN',
      },
    },
    {
      id: '7',
      qualification: 'RN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '1',
        firstName: 'Nichols',
        lastName: 'Fellini',
        username: 'username',
        qualification: 'RN',
      },
    },
    {
      id: '8',
      qualification: 'CNA',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '2',
        firstName: 'Fredd',
        lastName: 'Trimp',
        username: 'username',
        qualification: 'LPN',
      },
    },
    {
      id: '9',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '0',
        firstName: 'Mitchell',
        lastName: 'Bagnall',
        username: 'username',
        qualification: 'RN',
      },
    },
    {
      id: '10',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: null,
    },
    {
      id: '11',
      qualification: 'LPN',
      startDate: new Date('Wed, 18 Jan 2023 23:44:16 GMT'),
      endDate: new Date('Wed, 25 Jan 2023 23:44:16 GMT'),
      nurse: {
        id: '1',
        firstName: 'Nichols',
        lastName: 'Fellini',
        username: 'username',
        qualification: 'RN',
      },
    },
  ];
  // const { isLoading: isShiftsLoading } = useGetShifts();

  const isLoading = isNurseLoading;

  const rhForm = useForm<FormValuesType>({ defaultValues });
  const { handleSubmit, watch, setValue } = rhForm;
  const shiftValue = watch('shift');
  const nurseValue = watch('nurse');

  const onSubmit: SubmitHandler<FormValuesType> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (shiftValue) {
      const selectedNurse = shifts.find((shift) => shift.id === shiftValue);
      setValue('nurse', selectedNurse?.nurse?.id || '');
    }
  }, [shiftValue]);

  return (
    <form className={cn('grid gap-4', className)} onSubmit={handleSubmit(onSubmit)}>
      <InputGroup label="Shift">
        <Select
          name="shift"
          rhForm={rhForm}
          placeholder="Select a shift"
          options={shifts.map((shift) => ({
            name: `Shift ${shift.id}: ${getShiftDate(shift.startDate)} - ${getShiftDate(
              shift.endDate,
            )}`,
            value: shift.id,
          }))}
        />
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
          />
        </InputGroup>
      )}

      <Button className="w-fit" type="submit" disabled={!shiftValue || !nurseValue}>
        Save assignment
      </Button>
    </form>
  );
};

export default SetShiftForm;
