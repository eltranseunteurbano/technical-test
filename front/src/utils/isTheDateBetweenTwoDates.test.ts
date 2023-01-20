import { describe, expect, it } from 'vitest';

import isTheDateBetweenTwoDates from './isTheDateBetweenTwoDates';

describe('Is the nurse Bussy', () => {
  const startDate = new Date(2023, 1, 15, 8, 0, 0);
  const endDate = new Date(2023, 1, 15, 10, 0, 0);

  it('The day is between two dates', () => {
    const checkDate = new Date(2023, 1, 15, 9, 0, 0, 0);
    expect(isTheDateBetweenTwoDates(startDate, endDate, checkDate)).to.be.true;
  });

  it('The day is not between two dates', () => {
    const checkDate = new Date(2023, 1, 20, 9, 0, 0, 0);
    expect(isTheDateBetweenTwoDates(startDate, endDate, checkDate)).to.be.false;
  });
});
