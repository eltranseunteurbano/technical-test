import useGetShifts from '../hooks/useGetShifts'
import ShiftsTable from '../UI/organisms/ShiftsTable'

const Main = () => {
  const { isLoading, isError, data } = useGetShifts()

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Sorry, something wrong happened</p>
  
  return (
    <div className="w-full min-h-screen max-w-5xl m-auto p-12 box-border flex items-center">
      <ShiftsTable data={data} />
    </div>
  )
}

export default Main