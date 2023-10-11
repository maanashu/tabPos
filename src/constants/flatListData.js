import {
  newCustomer,
  returnCustomer,
  onlineCutomer,
  security,
  device,
  bell,
  pinLight,
  plan,
  invoiceSett,
  walletSett,
  shipping,
  langu,
  work,
  policy,
  dropScan,
  staffIcon,
  tableProfile,
  moneyIcon,
  qrCodeIcon,
  cardPayment,
  cardReader,
  tray,
  printer,
} from '@/assets';

export const newCustomerDataLoader = [
  {
    customertype: 'New Customers',
    img: newCustomer,
    id: '1',
  },
  {
    customertype: 'Returning Customers',
    img: returnCustomer,
    id: '2',
  },
  {
    customertype: 'Online Customers',
    img: onlineCutomer,
    id: '3',
  },
  {
    customertype: 'Shipping Customers',
    img: onlineCutomer,
    id: '4',
  },
];

export const settingLabelData = [
  {
    id: 1,
    name: 'security',
    subhead: 'Not updated',
    image: security,
  },
  {
    id: 2,
    name: 'Devices',
    subhead: 'Not connected',
    image: device,
  },
  {
    id: 3,
    name: 'Notifications',
    subhead: 'Not updated',
    image: bell,
  },
  {
    id: 4,
    name: 'Locations',
    subhead: '1 Locations',
    image: pinLight,
  },
  {
    id: 5,
    name: 'Plans',
    subhead: 'Expire on April 2024',
    image: plan,
  },
  {
    id: 6,
    name: 'Invoice',
    subhead: 'Defaults',
    image: invoiceSett,
  },
  // {
  //   id: 7,
  //   name: 'Taxes',
  //   subhead: 'Not updated ',
  //   image: tax,
  // },
  {
    id: 8,
    name: 'Wallet',
    subhead: 'Not connected',
    image: walletSett,
  },
  {
    id: 9,
    name: 'Shipping & Pickups',
    subhead: 'Defaults',
    image: shipping,
  },
  {
    id: 10,
    name: 'Staffs',
    subhead: '3',
    image: staffIcon,
  },
  {
    id: 11,
    name: 'Language',
    subhead: 'Defaults',
    image: langu,
  },
  {
    id: 12,
    name: 'Legal',
    subhead: 'Defaults',
    image: work,
  },
  {
    id: 13,
    name: 'Policies',
    subhead: 'Defaults',
    image: policy,
  },
  {
    id: 14,
    name: 'Device Details',
    subhead: 'Defaults',
    image: policy,
  },
];

export const deviceDropDownArray = [
  {
    id: 1,
    title: 'Add Barcode Scanner',
    image: dropScan,
  },
  {
    id: 2,
    title: 'Card Reader',
    image: cardReader,
  },
  {
    id: 3,
    title: 'Cash drawers',
    image: tray,
  },
  {
    id: 4,
    title: 'Receipt printers',
    image: printer,
  },
];

export const PLANFEATUREDATA = [
  {
    id: 1,
    title: 'Online store',
  },
  {
    id: 2,
    title: 'Shareable product pages',
  },
  {
    id: 3,
    title: 'Unlimited products',
  },
  {
    id: 4,
    title: '24/7 support',
  },
  {
    id: 5,
    title: 'Abandoned cart recovery',
  },
  {
    id: 6,
    title: 'Advanced report builder',
  },
];

export const ANNUALDATA = [
  {
    id: 1,
    title: 'Monthly Billing',
  },
  {
    id: 2,
    title: 'Annually Billing',
  },
];

export const basicData = [
  {
    id: 1,
    heading: 'Basic',
  },
  {
    id: 2,
    heading: 'Standard',
  },
  {
    id: 3,
    heading: 'Standard',
  },
];

export const COUNTRYNAME = [
  { id: 1, name: 'Spanish' },
  { id: 2, name: 'Portuguese ' },
  { id: 3, name: 'Arabic' },
  { id: 4, name: 'Arabic' },
  { id: 5, name: 'Arabic' },
];

export const catTypeData = [
  {
    id: 1,
    name: 'Choose category',
  },
  {
    id: 2,
    name: 'Choose Sub categories ',
  },
  {
    id: 3,
    name: 'Choose Brand',
  },
];

export const getCustomerDummy = {
  newCustomer: 0,
  onlineCustomers: 0,
  returningCustomer: 0,
  walkingCustomers: 0,
};

export const transactionDataList = [
  { label: 'Manual cash in', value: 'manual_cash_in' },
  { label: 'Maunal cash out', value: 'manual_cash_out' },
  { label: 'Counted cash', value: 'counted_cash' },
  { label: 'Delivery charge', value: 'delivery_charge' },
  { label: 'Shipping charge', value: 'shipping_charge' },
  { label: 'Sales', value: 'sales' },
  { label: 'Refund', value: 'refund' },
];

export const graphOptions = [
  {
    key: '1',
    title: 'Incoming Orders',
    checked: true,
  },
  {
    key: '2',
    title: 'Order Processing',
    checked: true,
  },
  {
    key: '3',
    title: 'Ready For Pickup',
    checked: true,
  },
  {
    key: '4',
    title: 'Completed',
    checked: true,
  },
];

export const items = [
  {
    name: 'Category',
    id: 0,
    isExpand: false,
    subItems: [
      {
        name: 'Featured Styles',
        id: 1,
        isChecked: false,
      },
      {
        name: 'Straight',
        id: 2,
        isChecked: false,
      },
      {
        name: 'Loose',
        id: 3,
        isChecked: false,
      },
      {
        name: 'Skinny',
        id: 4,
        isChecked: false,
      },
      {
        name: 'Bootcut',
        id: 5,
        isChecked: false,
      },
      {
        name: 'Flare',
        id: 6,
        isChecked: false,
      },
    ],
  },
  {
    name: 'Sub Category',
    id: 1,
    isExpand: false,
    subItems: [
      {
        name: 'Featured Styles',
        id: 1,
        isChecked: false,
      },
      {
        name: 'Straight',
        id: 2,
        isChecked: false,
      },
      {
        name: 'Loose',
        id: 3,
        isChecked: false,
      },
      {
        name: 'Skinny',
        id: 4,
        isChecked: false,
      },
      {
        name: 'Bootcut',
        id: 5,
        isChecked: false,
      },
      {
        name: 'Flare',
        id: 6,
        isChecked: false,
      },
    ],
  },
  {
    name: 'Brand',
    id: 2,
    isExpand: false,
    subItems: [
      {
        name: 'Featured Styles',
        id: 1,
        isChecked: false,
      },
      {
        name: 'Straight',
        id: 2,
        isChecked: false,
      },
      {
        name: 'Loose',
        id: 3,
        isChecked: false,
      },
      {
        name: 'Skinny',
        id: 4,
        isChecked: false,
      },
      {
        name: 'Bootcut',
        id: 5,
        isChecked: false,
      },
      {
        name: 'Flare',
        id: 6,
        isChecked: false,
      },
    ],
  },
];

export const returnOrders = [
  {
    key: '1',
    id: '#7869YZ',
    name: 'Rebecca R. Russell',
    miles: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: 'Express Delivery',
    time: 'No-show',
    returnWithin: 'Return within',
    returnTime: '00:05:59',
    userProfile: tableProfile,
  },
  {
    key: '2',
    id: '#7869YZ',
    name: 'Rebecca R. Russell',
    miles: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: 'Express Delivery',
    time: 'No-show',
    returnWithin: 'Return within',
    returnTime: '00:05:59',
    userProfile: tableProfile,
  },
];

export const productList = [
  {
    key: '1',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '2',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '3',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '4',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '5',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '6',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '7',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '8',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '9',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '10',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '11',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '12',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
  {
    key: '13',
    quantity: '1',
    productName: 'Marlboro Red Gold',
    color: 'Grey',
    size: 'small',
    price: '$6.56',
  },
];

export const colorsData = [
  {
    key: '1',
    title: 'Grey',
  },
  {
    key: '2',
    title: 'Red',
  },
  {
    key: '3',
    title: 'Blue',
  },
  {
    key: '4',
    title: 'Black',
  },
  {
    key: '5',
    title: 'White',
  },
];

export const sizeData = [
  {
    key: '1',
    title: 'S',
  },
  {
    key: '2',
    title: 'M',
  },
  {
    key: '3',
    title: 'L',
  },
  {
    key: '4',
    title: 'X',
  },
  {
    key: '5',
    title: 'XL',
  },
  {
    key: '6',
    title: 'XXL',
  },
  {
    key: '7',
    title: '2XL',
  },
];

export const DATA = [
  { title: 'Cash', icon: moneyIcon },
  { title: 'JBR Coin', icon: qrCodeIcon },
  { title: 'Card', icon: cardPayment },
];

export const RECIPE_DATA = [
  { title: 'SMS', icon: cardPayment },
  { title: 'Email', icon: cardPayment },
  { title: 'No e-recipe', icon: cardPayment },
];
