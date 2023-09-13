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
  3: 'Pickup',
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
