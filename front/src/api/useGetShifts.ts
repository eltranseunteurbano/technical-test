import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Nurse } from '../types/Nurse'
import type { QueryShift, Shift } from '../types/Shift'

const nursesQuery = () => axios.get('/nurses').then((res) => res.data)
const shiftsQuery = () => axios.get('/shifts').then((res) => res.data)

const useGetShifts = () => {

  const [data, setData] = useState<Shift[]>([])

  const {
    data: shiftsData,
    isError: isShiftsError,
    isFetching: isShiftsFetching,
    isLoading: isShiftsLoading,
    isSuccess: isShiftsSuccess
  } = useQuery<QueryShift[], Error>('shifts', shiftsQuery)

  const {
    data: nursesData,
    isError: isNursesError,
    isFetching: isNursesFetching,
    isLoading: isNursesLoading,
    isSuccess: isNursesSuccess
  } = useQuery<Nurse[], Error>('nurses', nursesQuery)


  useEffect(() => {
    if (isShiftsSuccess && isNursesSuccess) {
      const formattedData = shiftsData.map((shift) => {
        const nurse = nursesData.find(({ id }) => id === shift.nurseId)
        return {
          id: shift.id,
          qualification: shift.qualification,
          startDate: new Date(shift.startDate),
          endDate: new Date(shift.endDate),
          nurse: nurse || null,
        }
      }, []) as Shift[]

      setData(formattedData)
    }
  }, [shiftsData, nursesData, isShiftsSuccess, isNursesSuccess])

  return {
    isLoading: isNursesFetching || isShiftsLoading || isNursesFetching || isNursesLoading,
    isShiftsLoading: isShiftsFetching || isShiftsLoading,
    isNursesLoading: isNursesFetching || isNursesLoading,
    isError: isNursesError || isShiftsError,
    isShiftsError,
    isNursesError,
    data
  }
}

export default useGetShifts