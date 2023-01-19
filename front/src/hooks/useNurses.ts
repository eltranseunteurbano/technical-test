import { useQuery } from 'react-query';

import { getNursesQuery } from '../api';
import { Nurse } from '../types/Nurse';

const useGetNurses = () => {
  const getNurses = useQuery<Nurse[], Error>('nurses', getNursesQuery);

  return {
    getNurses,
  };
};
export default useGetNurses;
