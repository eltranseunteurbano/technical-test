export type RuleErrors = 'nurseUnqualified' | 'bussyNurse';

export const RuleMessage: { [key in RuleErrors]: string } = {
  nurseUnqualified: "This nurse isn't qualified to work the chosen shift.",
  bussyNurse: 'This nurse is already working during the chosen shift.',
};
