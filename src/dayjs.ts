import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(isBetween)
export default dayjs
