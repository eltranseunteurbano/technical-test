import { describe, expect, it } from 'vitest';

import { RuleMessage } from '../types/RuleErrors';
import { isNurseQualifiedToSfhit } from './shiftRules';

describe('Get shift rules', () => {
  it('CNA assigned to CNA shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'CNA', shiftQualification: 'CNA' }),
    ).to.be.null;
  });

  it('LPN assigned to CNA shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'LPN', shiftQualification: 'CNA' }),
    ).to.equal(RuleMessage.nurseUnqualified);
  });

  it('RN assigned to CNA shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'RN', shiftQualification: 'CNA' }),
    ).to.equal(RuleMessage.nurseUnqualified);
  });

  it('CNA assigned to LPN shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'CNA', shiftQualification: 'LPN' }),
    ).to.be.null;
  });

  it('LPN assigned to LPN shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'LPN', shiftQualification: 'LPN' }),
    ).to.be.null;
  });

  it('RN assigned to LPN shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'RN', shiftQualification: 'LPN' }),
    ).to.equal(RuleMessage.nurseUnqualified);
  });

  it('CNA assigned to RN shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'CNA', shiftQualification: 'RN' }),
    ).to.be.null;
  });

  it('LPN assigned to RN shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'RN', shiftQualification: 'RN' }),
    ).to.be.null;
  });

  it('RN assigned to RN shift', () => {
    expect(
      isNurseQualifiedToSfhit({ nurseQualification: 'RN', shiftQualification: 'RN' }),
    ).to.be.null;
  });
});

describe('Get the rule message', () => {
  it('Right nurseUnqualified rule message', () => {
    expect(RuleMessage['nurseUnqualified']).be.equal(
      "This nurse isn't qualified to work the chosen shift.",
    );
  });

  it('Wrong nurseUnqualified rule message', () => {
    expect(RuleMessage['nurseUnqualified']).not.be.equal(
      'This nurse is already working during the chosen shift.',
    );
  });

  it('Wrong nurseUnqualified rule message', () => {
    expect(RuleMessage['nurseUnqualified']).not.be.equal('');
  });

  it('Right bussyNurse rule message', () => {
    expect(RuleMessage['bussyNurse']).be.equal(
      'This nurse is already working during the chosen shift.',
    );
  });

  it('Wrong bussyNurse rule message', () => {
    expect(RuleMessage['bussyNurse']).not.be.equal(
      "This nurse isn't qualified to work the chosen shift.",
    );
  });

  it('Wrong bussyNurse rule message', () => {
    expect(RuleMessage['bussyNurse']).not.be.equal('');
  });
});
