import {
  jbrCoin,
  cash,
  card2,
  newCustomer,
  returnCustomer,
  onlineCutomer,
} from '@/assets';
export const jbritemList = [
  {
    name: 'JFR Maduro',
    price: '$382.75',
    id: '1',
  },
  {
    name: 'Ashton Magnum',
    price: '$236.50',
    id: '2',
  },
  {
    name: 'Marlboro Touch',
    price: '$43.99',
    id: '3',
  },
  {
    name: 'Hokkah',
    price: '$5.75',
    id: '4',
  },
];
export const orderCompleteData = [
  {
    name: 'JFR Maduro',
    price: '$382.75',
    id: '1',
  },
  {
    name: 'Ashton Magnum',
    price: '$236.50',
    id: '2',
  },
  {
    name: 'Marlboro Touch',
    price: '$43.99',
    id: '3',
  },
  {
    name: 'Hokkah',
    price: '$5.75',
    id: '4',
  },
];
export const CategoryData = [
  {
    name: 'Category',
    id: '1',
  },
  {
    name: 'Sub-Category',
    id: '2',
  },
  {
    name: 'Brand',
    id: '3',
  },
];
export const ProductData = [
  {
    name: 'Marlboro Red',
    id: '1',
  },
  {
    name: 'Marlboro Red1',
    id: '2',
  },
  {
    name: 'Marlboro Red2',
    id: '3',
  },
  {
    name: 'Marlboro Red2',
    id: '4',
  },
  {
    name: 'Marlboro Red2',
    id: '5',
  },
  {
    name: 'Marlboro Red2',
    id: '6',
  },
];
export const bundleOfferData = [
  {
    packname: 'Buy Pack',
    packItem: '2',
    price: '$84.99',
    id: '1',
  },
  {
    packname: 'Buy Pack',
    packItem: '2',
    price: '$84.99',
    id: '2',
  },
  {
    packname: 'Buy Pack',
    packItem: '2',
    price: '$84.99',
    id: '3',
  },
  {
    packname: 'Buy Pack',
    packItem: '2',
    price: '$84.99',
    id: '4',
  },
];
export const searchProductData = [
  {
    productName: 'Marlboro Red-Pack',
    stock: '206 in stock',
    price: '$84.99',
    location: 'Available in another location',
    id: '1',
  },
  {
    productName: 'Marlboro Red-Pack',
    stock: '206 in stock',
    price: '$84.99',
    location: 'Available in another location',
    id: '2',
  },
  // {
  //   productName: 'Marlboro Red-Pack',
  //   stock: '206 in stock',
  //   price: '$84.99',
  //   location:'Available in another location',
  //   id: '3',
  // }
];

export const productUnitData = [
  {
    unitType: 'unit Type',
    price: '430',
    id: '1',
  },
  {
    unitType: 'Unit Weight',
    price: '430',
    id: '2',
  },
  {
    unitType: 'SKU ',
    price: '430',
    id: '3',
  },
  {
    unitType: 'Barcode',
    price: '430',
    id: '4',
  },
  {
    unitType: 'Stock ',
    price: '430',
    id: '5',
  },
  {
    unitType: 'Stock',
    price: '430',
    id: '6',
  },
];
export const aboutTransactionData = [
  {
    aboutTransaction: 'JBR COIN',
    price: '$8,426,590',
    img: jbrCoin,
    id: '1',
  },
  {
    aboutTransaction: 'CASH',
    price: '$8,426,590',
    img: cash,
    id: '2',
  },
  {
    aboutTransaction: 'CARD',
    price: '$8,426,590',
    img: card2,
    id: '3',
  },
];
export const tipsData = [
  {
    heading: 'Tips',
    price: '$390',
    id: '1',
  },
  {
    heading: 'Delivery Charge',
    price: '$390',
    id: '2',
  },
  {
    heading: 'Shipping Charge',
    price: '$1,496',
    id: '3',
  },
];
export const allTransactionData = [
  {
    transaction: 'All',
    count: '(190)',
    id: '1',
  },
  {
    transaction: 'JBR',
    count: '(23)',
    id: '2',
  },
  {
    transaction: 'Cash',
    count: '(19)',
    id: '3',
  },
  {
    transaction: 'Card',
    count: '(65)',
    id: '4',
  },
];
export const TransactionTableHeading = [
  '#',
  'Date',
  'Transection Id',
  'Transection type',
  'Mode of payment',
  'Cash In',
  'Cash Out',
  'Status',
];

export const TransactionTableData = [
  '1',
  'Jun 21 , 2022',
  '6677787777',
  'Sales',
  'JBR',
  '$2562',
  '$2562',
  'Completed',
];
export const UserTableHeading = [
  '#',
  'Name',
  'Total orders',
  'Total Products',
  'Lifetime spent',
];
export const UserTableData = [
  ['1', 'Curtis M. Wheeler  , 2022', '60 ', '481', '$6,850.00'],
  ['1', 'Curtis M. Wheeler, 2022', '60 ', '481', '$6,850.00'],
];

export const ProfileTableHeading = [
  '#',
  'Order id#',
  'Date',
  'Store location',
  'Responsible',
  'No. of items',
  'Amount',
  'Sales type',
];
export const ProfileTableData = [
  [
    '1',
    '362501',
    'Jun 11, 2022',
    'Maimi',
    'DHL',
    '3 times',
    '$6,850.00',
    'Shipping',
  ],
  [
    '1',
    '362501',
    'Jun 11, 2022',
    'Maimi',
    'DHL',
    '3 times',
    '$6,850.00',
    'Store',
  ],
];

export const sessionHistoryTableHeading = [
  '#',
  'Date',
  'Ended By',
  'Session Started',
  'Added cash',
  'Removed cash',
  'Counted cash',
  'Session Ended',
];
export const sessionHistoryTableData = [
  [
    '1',
    'Jun 21, 2022',
    'Allein ',
    '$0.00',
    '$6,850.00',
    '$1,350.00',
    '$1,350.00',
    '-$40.00',
  ],
  [
    '1',
    'Jun 21, 2022',
    'Allein ',
    '$0.00',
    '$6,850.00',
    '$1,350.00',
    '$1,350.00',
    '-$40.00',
  ],
];
export const newCustomerData = [
  {
    customertype: 'New Customers',
    count: '2906',
    img: newCustomer,
    id: '1',
  },
  {
    customertype: 'Returning Customers',
    count: '2906',
    img: returnCustomer,
    id: '2',
  },
  {
    customertype: 'Online Customers',
    count: '2906',
    img: onlineCutomer,
    id: '3',
  },
  {
    customertype: 'Shipping Customers',
    count: '2906',
    img: onlineCutomer,
    id: '4',
  },
  {
    customertype: 'Online Customers',
    count: '2906',
    img: newCustomer,
    id: '5',
  },
  {
    customertype: 'Returning Customers',
    count: '2906',
    img: returnCustomer,
    id: '6',
  },
  {
    customertype: 'Shipping Customers',
    count: '2906',
    img: onlineCutomer,
    id: '7',
  },
  {
    customertype: 'Shipping Customers',
    count: '2906',
    img: onlineCutomer,
    id: '8',
  },
];

export const notificationData = [
  {
    notificationType: 'Haircut',
    notificationTime: '10.00 AM- 11.00 PM',
    notificationDate: 'Sunday, Oct 29, 2022',
    id: '1',
  },
  {
    notificationType: 'Haircut',
    notificationTime: '10.00 AM- 11.00 PM',
    notificationDate: 'Sunday, Oct 29, 2022',
    id: '2',
  },
  {
    notificationType: 'Haircut',
    notificationTime: '10.00 AM- 11.00 PM',
    notificationDate: 'Sunday, Oct 29, 2022',
    id: '3',
  },
];
export const totalProductData = [
  {
    headerType: 'Total Products',
    range: '20,590',
    id: '1',
  },
  {
    headerType: 'Total Inventory  Cost',
    range: '$8,426,590',
    id: '2',
  }, 
  {
    headerType: 'Total Revenue',
    range: '$6,920,590',
    id: '4',
  },
  {
    headerType: 'Total Orders',
    range: '$7,426,590',
    id: '3',
  },
 
];
export const categoryData =[
  {
    categoryCount: '8',
    category:'Category',
    percentage:'1.2%',
    id: '1',
  },
  {
    categoryCount: '70',
    category:'Subcategory',
    percentage:'1.2%',
    id: '2',
  },
  {
    categoryCount: '290',
    category:'Brand',
    percentage:'1.2%',
    id: '3',
  },
  {
    categoryCount: '2,906',
    category:'Product',
    percentage:'1.2%',
    id: '4',
  }
];
export const inverntrycategoryData =[
  {
    categoryCount: '906',
    category:'Unit In',
    percentage:'1.2%',
    id: '1',
  },
  {
    categoryCount: '284',
    category:'Unit Out',
    percentage:'1.2%',
    id: '2',
  },
  {
    categoryCount: '14',
    category:'Unit Return',
    percentage:'1.2%',
    id: '3',
  },
  {
    categoryCount: '608',
    category:'Stock on hand',
    percentage:'1.2%',
    id: '4',
  }
];
export const  productDetailData = [
  {
    heading: 'Selling Price',
    price:'$90',
    id: '1',
    enabled: false
  },
  {
    heading: 'Cost Price',
    price:'$86.50',
    id: '2',
    enabled: false
  },
  {
    heading: 'Unit Type',
    price:'$Catron',
    id: '3',
    enabled: false
  },
  {
    heading: 'Barcode',
    price:'$125694226955',
    id: '4',
    enabled: false
  },
]

