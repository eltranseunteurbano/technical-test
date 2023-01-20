import { describe, expect, it } from 'vitest';

import { RuleMessage } from '../types/RuleErrors';
import { isNurseQualifiedToSfhit, isTheNurseBussy } from './shiftRules';

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

describe('Is the nurse Bussy', () => {
  const nurseStarts = new Date(2023, 1, 15, 8, 0, 0);
  const nurseEnds = new Date(2023, 1, 15, 10, 0, 0);

  it("The shift is before nurse's shift", () => {
    const shiftStarts = new Date(2023, 1, 15, 4, 0, 0);
    const shiftEnds = new Date(2023, 1, 15, 5, 15, 0, 0);
    expect(isTheNurseBussy({ shiftStarts, shiftEnds, nurseStarts, nurseEnds })).to.be
      .null;
  });

  it("The shift is after nurse's shift", () => {
    const shiftStarts = new Date(2023, 1, 15, 13, 0, 0);
    const shiftEnds = new Date(2023, 1, 15, 15, 0, 0, 0);
    expect(isTheNurseBussy({ shiftStarts, shiftEnds, nurseStarts, nurseEnds })).to.be
      .null;
  });

  it("The start of the shift is overlapping on nurse's shift", () => {
    const shiftStarts = new Date(2023, 1, 15, 8, 25, 0);
    const shiftEnds = new Date(2023, 1, 15, 8, 30, 0);
    expect(
      isTheNurseBussy({ shiftStarts, shiftEnds, nurseStarts, nurseEnds }),
    ).to.be.equal(RuleMessage.bussyNurse);
  });

  it("The end of the shift is overlapping on nurse's shift", () => {
    const shiftStarts = new Date(2023, 1, 15, 6, 0, 0);
    const shiftEnds = new Date(2023, 1, 15, 9, 0, 0);
    expect(
      isTheNurseBussy({ shiftStarts, shiftEnds, nurseStarts, nurseEnds }),
    ).to.be.equal(RuleMessage.bussyNurse);
  });

  it("The shift is overlapping on nurse's shift", () => {
    const shiftStarts = new Date(2023, 1, 15, 7, 0, 0);
    const shiftEnds = new Date(2023, 1, 15, 11, 0, 0);

    expect(
      isTheNurseBussy({ shiftStarts, shiftEnds, nurseStarts, nurseEnds }),
    ).to.be.equal(RuleMessage.bussyNurse);
  });
});
