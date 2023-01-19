import { Nurse } from './Nurse';
import Qualification from './Qualification';

export type QueryShift = {
  id: string;
  startDate: Date;
  endDate: Date;
  nurseId: Nurse['id'];
  qualification: Qualification;
};

export type Shift = {
  id: string;
  startDate: Date;
  endDate: Date;
  nurse: Nurse | null;
  qualification: Qualification;
};
