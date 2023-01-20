import { useState } from 'react';

import { useGetShifts } from '../hooks/useShifts';
import Button from '../UI/atoms/Button';
import SetShiftAssignmentModal from '../UI/organisms/SetShiftAssignmentModal';
import ShiftsTable from '../UI/organisms/ShiftsTable';

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, isError, error } = useGetShifts();

  if (isLoading && !isError) return <p>Loading...</p>;
  if (isError && error) return <p>Sorry. {error?.message}</p>;

  return (
    <main className="w-full max-w-5xl m-auto p-12 box-border flex flex-col gap-8">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900">Shifts</h1>
        <Button onClick={() => setOpenModal(true)}>Set Shift Assignment</Button>
      </header>
      <ShiftsTable data={data} />
      <SetShiftAssignmentModal open={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
};

export default Main;
