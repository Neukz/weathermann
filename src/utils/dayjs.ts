import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

// Add plugins
dayjs.extend(utc);
dayjs.extend(advancedFormat);

export default dayjs;
