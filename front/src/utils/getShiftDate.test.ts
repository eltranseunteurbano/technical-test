import { describe, expect, it } from 'vitest';

import getShiftDate from './getShiftDate';

describe('Get shift date', () => {
  const originDate = new Date(2023, 0, 20, 14, 54, 35);
  const formatDate = getShiftDate(originDate);

  it('Should show the right format date', () => {
    expect(formatDate).to.equal('20/01/2023 02:54:35 PM');
  });

  it('Should failed is display wrong Meridiem', () => {
    expect(formatDate).to.not.equal('20/01/2023 02:54:35 AM');
  });
});
