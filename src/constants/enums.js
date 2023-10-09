export const CALENDAR_MODES = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
};

export const CALENDAR_VIEW_MODES = {
  LIST_VIEW: 'LIST_VIEW',
  CALENDAR_VIEW: 'CALENDAR_VIEW',
};

export const DELIVERY_MODE = {
  1: 'Delivery',
  2: 'Reservation',
  3: 'Walkin',
  4: 'Shipping',
};

export const CALENDAR_TIME_FORMAT = {
  TWELVE_HOUR: true, // In react native big calendar package `ampm` true means it is 12 hour format
  TWENTY_FOUR_HOURS: false, // In react native big calendar package `ampm` false means it is 24 hour format
};

export const APPOINTMENT_REQUEST_MODE = {
  MANUAL: 'manually',
  AUTOMATIC: 'automatically',
};
export const EMPLOYEES_COLOR_SET_MODE = {
  DEFAULT: 'default',
  MANUAL: 'manual',
};

export const PAGINATION_DATA = [
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
];

export const months = [
  { label: 'January', value: 'january' },
  { label: 'February', value: 'february' },
  { label: 'March', value: 'march' },
  { label: 'April', value: 'april' },
  { label: 'May', value: 'may' },
  { label: 'June', value: 'june' },
  { label: 'July', value: 'july' },
  { label: 'August', value: 'august' },
  { label: 'September', value: 'september' },
  { label: 'October', value: 'october' },
  { label: 'November', value: 'november' },
  { label: 'December', value: 'december' },
];

export const weeklyStatus = [
  {
    label: 'Review',
    value: 0,
  },
  {
    label: 'Accepted',
    value: 1,
  },
  {
    label: 'Prepare',
    value: 2,
  },
  {
    label: 'Ready Pickup',
    value: 3,
  },
  {
    label: 'Assign',
    value: 4,
  },
  {
    label: 'Pickup',
    value: 5,
  },
  {
    label: 'Delivered',
    value: 6,
  },
  {
    label: 'Cancelled',
    value: 7,
  },
  {
    label: 'Rejected',
    value: 8,
  },
  {
    label: 'Returned',
    value: 9,
  },
];
