import { useMemo } from 'react';
import { useQueries, useQuery, UseQueryResult } from 'react-query';

import { getNurseByIdQuery, getShiftsQuery } from '../api';
import { Nurse } from '../types/Nurse';
import type { QueryShift, Shift } from '../types/Shift';

const useGetShifts = () => {
  const {
    data: shiftsData,
    isError: isShiftsError,
    isFetching: isShiftsFetching,
    isLoading: isShiftsLoading,
    isSuccess: isShiftsSuccess,
    error: shiftError,
  } = useQuery<QueryShift[], Error>('shifts', getShiftsQuery);

  const nurseQueries: UseQueryResult[] = useQueries(
    (shiftsData?.filter((item) => item.nurseId) || []).map((shift) => ({
      queryKey: ['nurse', shift.nurseId],
      queryFn: () => getNurseByIdQuery(shift.nurseId),
    })),
  );

  const isNursesError = nurseQueries.every((item) => item.isError);
  const isNursesFetching = nurseQueries.every((item) => item.isFetching);
  const isNursesLoading = nurseQueries.every((item) => item.isLoading);
  const isNursesSuccess = nurseQueries.every((item) => item.isSuccess);
  const nurseError = nurseQueries.find((item) => item.error)?.error as Error;
  const nursesData = nurseQueries.map((item) => item.data) as Nurse[];

  const transformShiftsWithNurseData = () => {
    if (isShiftsSuccess && isNursesSuccess) {
      return shiftsData.map((shift) => {
        const nurse = nursesData.find(({ id }) => id === shift.nurseId);
        return {
          id: shift.id,
          qualification: shift.qualification,
          startDate: new Date(shift.startDate),
          endDate: new Date(shift.endDate),
          nurse: nurse || null,
        };
      }, []) as Shift[];
    }
    return [];
  };

  const shifts = useMemo(transformShiftsWithNurseData, [
    isShiftsSuccess,
    isNursesSuccess,
    shiftsData,
    nursesData,
  ]);

  return {
    isLoading: isShiftsFetching || isShiftsLoading || isNursesFetching || isNursesLoading,
    isShiftsLoading: isShiftsFetching || isShiftsLoading,
    isNursesLoading: isNursesFetching || isNursesLoading,
    isError: isNursesError || isShiftsError,
    isShiftsError,
    isNursesError,
    data: shifts,
    error: shiftError || nurseError,
  };
};

export default useGetShifts;
