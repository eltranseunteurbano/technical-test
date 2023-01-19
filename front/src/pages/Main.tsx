import useGetShifts from '../hooks/useGetShifts';
import ShiftsTable from '../UI/organisms/ShiftsTable';

const Main = () => {
  const { isLoading, isError, data, error } = useGetShifts();

  if (isLoading && !isError) return <p>Loading...</p>;
  if (isError && error) return <p>Sorry. {error?.message}</p>;

  return (
    <div className="w-full min-h-screen max-w-5xl m-auto p-12 box-border flex items-center">
      <ShiftsTable data={data} />
    </div>
  );
};

export default Main;
