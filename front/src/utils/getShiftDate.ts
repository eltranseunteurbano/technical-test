import { format } from 'date-fns'

const getShiftDate = (date: Date): string => format(date, 'dd/MM/yyyy hh:mm:ss aa')

export default getShiftDate