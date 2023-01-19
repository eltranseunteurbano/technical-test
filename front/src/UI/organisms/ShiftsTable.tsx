import { Shift } from '../../types/Shift';
import getShiftDate from '../../utils/getShiftDate';
import Cell from '../atoms/table/Cell';
import Row from '../atoms/table/Row';
import Table from '../atoms/table/Table';

interface iShiftsTable {
  data: Shift[];
}

const ShiftsTable: React.FC<iShiftsTable> = (props) => {
  const { data } = props;

  return (
    <Table>
      <Row type="head">
        <tr>
          <Cell type="header" className="!pl-4 pr-3 sm:!pl-6">
            Shift
          </Cell>
          <Cell type="header" className="hidden sm:table-cell">
            Start time
          </Cell>
          <Cell type="header" className="hidden sm:table-cell">
            End time
          </Cell>
          <Cell type="header" className="hidden lg:table-cell">
            Certification required
          </Cell>
          <Cell type="header" className="table-cell">
            Assigned nurse
          </Cell>
        </tr>
      </Row>
      <Row type="body" className="divide-y divide-gray-200 bg-white">
        {data.map(({ nurse, id, qualification, startDate, endDate }) => (
          <tr key={id}>
            <Cell className="w-full max-w-0 !pl-4 !pr-3 !font-medium sm:w-auto sm:max-w-none sm:pl-6">
              <span>Shift {id}</span>
              <dl className="lg:hidden">
                <dt>Start Time</dt>
                <dd className="mt-1 sm:hidden">Start time: {getShiftDate(startDate)}</dd>
                <dt>End Time</dt>
                <dd className="mt-1 md:hidden">End time: {getShiftDate(endDate)}</dd>
                <dt>Certification required</dt>
                <dd className="mt-1 lg:hidden">
                  Certification Required: {qualification}
                </dd>
              </dl>
            </Cell>
            <Cell className="hidden sm:table-cell">{getShiftDate(startDate)}</Cell>
            <Cell className="hidden sm:table-cell">{getShiftDate(endDate)}</Cell>
            <Cell className="hidden lg:table-cell">{qualification}</Cell>
            {nurse ? (
              <Cell>
                {nurse.firstName} {nurse.lastName} | {nurse.qualification}
              </Cell>
            ) : (
              <Cell> </Cell>
            )}
          </tr>
        ))}
      </Row>
    </Table>
  );
};

export default ShiftsTable;
