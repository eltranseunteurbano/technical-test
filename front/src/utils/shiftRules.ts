import { isAfter, isBefore } from 'date-fns';

import Qualification from '../types/Qualification';
import { RuleMessage } from '../types/RuleErrors';
import { Shift } from '../types/Shift';
import isTheDateBetweenTwoDates from './isTheDateBetweenTwoDates';

type isNurseQualifiedToSfhitProps = {
  shiftQualification: Qualification;
  nurseQualification: Qualification;
};

const isNurseQualifiedToSfhit = ({
  shiftQualification,
  nurseQualification,
}: isNurseQualifiedToSfhitProps) => {
  const qualificationRules: { [key in Qualification]: Qualification[] } = {
    CNA: ['CNA'],
    LPN: ['CNA', 'LPN'],
    RN: ['CNA', 'LPN', 'RN'],
  };

  const shiftsPermissions = qualificationRules[shiftQualification];
  return !shiftsPermissions.includes(nurseQualification)
    ? RuleMessage.nurseUnqualified
    : null;
};

type isTheNurseBussyProps = {
  shiftStarts: Shift['startDate'];
  shiftEnds: Shift['endDate'];
  nurseStarts: Shift['startDate'];
  nurseEnds: Shift['endDate'];
};

const isTheNurseBussy = ({
  nurseStarts,
  nurseEnds,
  shiftStarts,
  shiftEnds,
}: isTheNurseBussyProps) => {
  if (isTheDateBetweenTwoDates(nurseStarts, nurseEnds, shiftStarts))
    return RuleMessage.bussyNurse;
  if (isTheDateBetweenTwoDates(nurseStarts, nurseEnds, shiftEnds))
    return RuleMessage.bussyNurse;
  if (isBefore(shiftStarts, nurseStarts) && isAfter(shiftEnds, nurseEnds))
    return RuleMessage.bussyNurse;

  return null;
};

export { isNurseQualifiedToSfhit, isTheNurseBussy };
