import { useQuery } from 'react-query';

import { getNursesQuery } from '../api';
import { Nurse } from '../types/Nurse';

const key = 'nurses';
const useGetNurses = () => useQuery<Nurse[], Error>(key, getNursesQuery);

export { useGetNurses };
