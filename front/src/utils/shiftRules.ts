import Qualification from '../types/Qualification';
import { RuleMessage } from '../types/RuleErrors';

type qualificationValidationProps = {
  shiftQualification: Qualification;
  nurseQualification: Qualification;
};

const isNurseQualifiedToSfhit = ({
  shiftQualification,
  nurseQualification,
}: qualificationValidationProps) => {
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

export { isNurseQualifiedToSfhit };
