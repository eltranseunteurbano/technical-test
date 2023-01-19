import axios from 'axios'
import { Nurse } from './types/Nurse'

export const getNurseByIdQuery = (id: Nurse['id']) => axios.get(`/nurses/${id}`).then((res) => res.data)
export const getNursesQuery = () => axios.get('/nurses').then((res) => res.data)
export const getShiftsQuery = () => axios.get('/shifts').then((res) => res.data)

