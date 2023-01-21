import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';

import { getNurseByIdQuery, getShiftsQuery, updateShiftQuery } from '../api';
import { Nurse } from '../types/Nurse';
import { QueryShift, Shift } from '../types/Shift';

const key = 'shifts';

const useGetShifts = () => {
  const {
    data: shiftsResults,
    isLoading,
    isError,
    error,
  } = useQuery<QueryShift[], Error>(key, getShiftsQuery);

  const finalShiftsResults = useQueries(
    (shiftsResults || [])
      .filter((shift) => shift.nurseId)
      .map((shiftQuery) => {
        return {
          queryKey: ['nurse', shiftQuery.nurseId],
          queryFn: () => getNurseByIdQuery(shiftQuery.nurseId),
          select: (data: Nurse): Shift => ({
            id: shiftQuery.id,
            startDate: new Date(shiftQuery.startDate),
            endDate: new Date(shiftQuery.endDate),
            nurse: data,
            qualification: shiftQuery.qualification,
          }),
        };
      }),
  );

  const isShiftsLoading = finalShiftsResults.some((shift) => shift.isLoading);
  const isShiftsSuccess = finalShiftsResults.every((shift) => shift.isSuccess);

  const shifts = isShiftsSuccess
    ? (shiftsResults || []).map((queryshift) => {
        const shiftWithNurseAssigned = finalShiftsResults.find(
          (shift) => shift.data?.id === queryshift.id,
        );
        return (
          shiftWithNurseAssigned?.data ?? {
            id: queryshift.id,
            startDate: new Date(queryshift.startDate),
            endDate: new Date(queryshift.endDate),
            nurse: null,
            qualification: queryshift.qualification,
          }
        );
      })
    : [];

  return {
    isLoading: isShiftsLoading || isLoading,
    isError,
    error,
    data: shifts || [],
  };
};

const useMutateShift = () => {
  const queryClient = useQueryClient();
  return useMutation(updateShiftQuery, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });
};

export { useGetShifts, useMutateShift };
