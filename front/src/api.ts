import axios from 'axios';

import { Nurse } from './types/Nurse';
import { QueryShift, Shift } from './types/Shift';

export const getNurseByIdQuery = (id: Nurse['id']) =>
  axios.get(`/nurse/${id}`).then((res) => res.data);

export const getNursesQuery = () => axios.get('/nurses').then((res) => res.data);

export const getShiftsQuery = () => axios.get('/shifts').then((res) => res.data);

type updateShiftQueryProps = {
  id: Shift['id'];
  data: Partial<QueryShift>;
};

export const updateShiftQuery = ({ id, data }: updateShiftQueryProps) =>
  axios.patch(`/shift/${id}`, data).then((res) => res.data);
