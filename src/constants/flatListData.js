import {
  jbrCoin,
  cash,
  card2,
  newCustomer,
  returnCustomer,
  onlineCutomer,
  security,
  device,
  bell,
  pinLight,
  plan,
  invoiceSett,
  tax,
  walletSett,
  shipping,
  langu,
  work,
  policy,
  dropScan,
  sellingBucket,
  productBasket,
  cloth,
  onlineMan,
  clay,
} from '@/assets';
import { COLORS } from '@/theme';

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

export const SubcategoryData = [
  {
    id: 1,
    name: 'Accessories',
    brands: '21 Brands',
    products: 55,
    Image: '',
  },
  {
    id: 2,
    name: 'Bottoms',
    brands: '21 Brands',
    products: 55,
    Image: '',
  },
  {
    id: 3,
    name: 'Coats & Jackets',
    brands: '21 Brands',
    products: 55,
    Image: '',
  },
  {
    id: 4,
    name: 'Coats & Jackets',
    brands: '21 Brands',
    products: 55,
    Image: '',
  },
  // {
  //   id: 5,
  //   name: 'Coats & Jackets',
  //   brands: '21 Brands',
  //   products: 55,
  //   Image: '',
  // },
  // {
  //   id: 6,
  //   name: 'Accessories',
  //   Brands: '21 Brands',
  //   products: 55,
  //   Image: '',
  // },
];

export const CategoryDataHorizontal = [
  {
    name: 'Tobacco',
    id: '1',
  },
  {
    name: 'Vape',
    id: '2',
  },
  {
    name: 'Vape',
    id: '3',
  },
  {
    name: 'Vape',
    id: '4',
  },
  {
    name: 'Vape',
    id: '5',
  },
];

export const userData = [
  {
    percentage: '10%',
    id: '1',
  },
  {
    percentage: '20%',
    id: '2',
  },
  {
    percentage: '30%',
    id: '3',
  },
];

export const tipDataDummy = [
  {
    percentage: '10%',
    id: '1',
  },
  {
    percentage: '20%',
    id: '2',
  },
  {
    percentage: '30%',
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
export const cartData = [
  {
    id: 1,
    name: 'ghjkl',
  },
  {
    id: 2,
    name: 'ghjkl',
  },
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
export const categoryData = [
  {
    categoryCount: '8',
    category: 'Category',
    percentage: '1.2%',
    id: '1',
  },
  {
    categoryCount: '70',
    category: 'Subcategory',
    percentage: '1.2%',
    id: '2',
  },
  {
    categoryCount: '290',
    category: 'Brand',
    percentage: '1.2%',
    id: '3',
  },
  {
    categoryCount: '2,906',
    category: 'Product',
    percentage: '1.2%',
    id: '4',
  },
];
export const inverntrycategoryData = [
  {
    categoryCount: '906',
    category: 'Unit In',
    percentage: '1.2%',
    id: '1',
  },
  {
    categoryCount: '284',
    category: 'Unit Out',
    percentage: '1.2%',
    id: '2',
  },
  {
    categoryCount: '14',
    category: 'Unit Return',
    percentage: '1.2%',
    id: '3',
  },
  {
    categoryCount: '608',
    category: 'Stock on Hand',
    percentage: '1.2%',
    id: '4',
  },
];
export const totalOrderData = [
  {
    categoryCount: '906',
    category: 'Total Order',
    percentage: '1.2%',
    id: '1',
  },
  {
    categoryCount: '284',
    category: 'Store Order',
    percentage: '1.2%',
    id: '2',
  },
  {
    categoryCount: '14',
    category: 'Online Order',
    percentage: '1.2%',
    id: '3',
  },
  {
    categoryCount: '608',
    category: 'Shipping Order',
    percentage: '1.2%',
    id: '4',
  },
];
export const productDetailData = [
  {
    heading: 'Cost Price',
    price: '$86.50',
    id: '1',
  },
  {
    heading: 'Unit Type',
    price: 'Catron',
    id: '2',
  },
  {
    heading: 'Barcode',
    price: '$125694226955',
    id: '3',
  },
  {
    heading: 'Unit Weight',
    price: '430 g',
    id: '4',
  },
  {
    heading: 'Stock on Hand ',
    price: '430',
    id: '5',
  },
  {
    heading: 'Rating',
    price: '4.30',
    id: '5',
  },
];
export const stockHandData = [
  {
    heading: 'Number of Orders',
    price: '$90',
    id: '1',
  },
  {
    heading: 'Store Orders',
    price: '$86.50',
    id: '2',
  },
  {
    heading: 'Delivery Orders',
    price: 'Catron',
    id: '3',
  },
  {
    heading: 'Shipping Orders',
    price: '125694226955',
    id: '4',
  },
  {
    heading: 'Total Sales',
    price: '50',
    id: '5',
  },

  {
    heading: 'Total Cost',
    price: '430 g',
    id: '6',
  },
  {
    heading: 'Total Profit ',
    price: '430',
    id: '7',
  },
  {
    heading: 'Total Return',
    price: '4.30',
    id: '8',
  },
];
export const allRevenueTypeData = [
  {
    transaction: 'All',
    count: '(190)',
    id: '1',
  },
  {
    transaction: 'Store',
    count: '(23)',
    id: '2',
  },
  {
    transaction: 'Delivery',
    count: '(19)',
    id: '3',
  },
  {
    transaction: 'Shipping',
    count: '(65)',
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
  {
    id: 7,
    name: 'Taxes',
    subhead: 'Not updated ',
    image: tax,
  },
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
    image: shipping,
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
    image: dropScan,
  },
  {
    id: 3,
    title: 'Cash drawers',
    image: dropScan,
  },
  {
    id: 4,
    title: 'Receipt printers',
    image: dropScan,
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

export const COUNTRYDATA = [
  {
    id: 1,
    name: 'United States of America',
  },
  {
    id: 2,
    name: 'Canada',
  },
  {
    id: 3,
    name: 'Mexico',
  },
];
export const STATEDATA = [
  {
    id: 1,
    name: 'Florida',
  },
  {
    id: 2,
    name: 'Georgia ',
  },
  {
    id: 3,
    name: 'Georgia ',
  },
  {
    id: 4,
    name: 'Georgia ',
  },
];

export const STARTSELLING = [
  {
    id: 1,
    heading: 'START SELLING',
    subHeading: 'Scan/Search',
    image: sellingBucket,
  },
  {
    id: 2,
    heading: 'ONLINE ORDERS ',
    subHeading: '30 Orders',
    image: onlineMan,
  },
];

export const homeTableData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },

  {
    id: 5,
  },
  {
    id: 6,
  },
];
export const categoryRowData = [
  {
    id: 1,
    name: 'Categories',
  },
  {
    id: 2,
    name: 'Subcategories',
  },
  {
    id: 3,
    name: 'Brands',
  },
  {
    id: 4,
    name: 'Products',
  },
];
export const categoryProRowData = [
  {
    id: 1,
    name: 'Baby Boy',
    image: cloth,
  },
  {
    id: 2,
    name: 'Baby Girl',
    image: cloth,
  },
  {
    id: 3,
    name: 'Boys',
    image: cloth,
  },
  {
    id: 4,
    name: 'Girls',
    image: cloth,
  },
  {
    id: 5,
    name: 'Men',
    image: cloth,
  },
  {
    id: 6,
    name: 'Women',
    image: cloth,
  },
];
export const productsData = [
  {
    id: 1,
    image: clay,
    name: 'Jacket_Nord',
    stocks: '206 in stock',
    type: 'Men',
    price: '$7.59',
  },
  {
    id: 2,
    image: clay,
    name: 'Jacket_Nord',
    stocks: '206 in stock',
    type: 'Men',
    price: '$7.59',
  },
  {
    id: 3,
    image: clay,
    name: 'Jacket_Nord',
    stocks: '206 in stock',
    type: 'Men',
    price: '$7.59',
  },
  {
    id: 4,
    image: clay,
    name: 'Jacket_Nord',
    stocks: '206 in stock',
    type: 'Men',
    price: '$7.59',
  },
];
export const polGraphDummyData = [
  {
    value: 44,
    spacing: 2,
    label: 'Saturday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 56,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 66, frontColor: COLORS.lightGreen },
  {
    value: 22,
    spacing: 2,
    label: 'Sunday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 55,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 88, frontColor: COLORS.lightGreen },
  {
    value: 99,
    spacing: 2,
    label: 'Monday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 22,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 55, frontColor: COLORS.lightGreen },
  {
    value: 44,
    spacing: 2,
    label: 'Tuesday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 44,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 22, frontColor: COLORS.lightGreen },
  {
    value: 10,
    spacing: 2,
    label: 'Wednesday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 10,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 20, frontColor: COLORS.lightGreen },
  {
    value: 30,
    spacing: 2,
    label: 'Thursday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 11,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 67, frontColor: COLORS.lightGreen },
  {
    value: 10,
    spacing: 2,
    label: 'Friday',
    labelWidth: 60,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11 },
    frontColor: COLORS.primary,
  },
  {
    value: 40,
    spacing: 2,
    frontColor: COLORS.bluish_green,
  },
  { value: 20, frontColor: COLORS.lightGreen },
];

export const COUNTRYNAME = [
  { id: 1, name: 'Spanish' },
  { id: 2, name: 'Portuguese ' },
  { id: 3, name: 'Arabic' },
];

export const LEGALDATA = [
  {
    id: 1,
    publishDate: 'Publish date:',
    dateTime: 'Sep 27, 2023   10: 00 AM',
    titleName: 'Refund policy',
    title:
      'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com. ',
    title1: ' These Terms will be applied fully and affect to your use of',
    update: 'Last update date:',
    Lastupdatedate: 'Sep 27, 2023   10: 00 AM',
    active: 'Active',
  },
  {
    id: 2,
    publishDate: 'Publish date:',
    dateTime: 'Sep 27, 2023   10: 00 AM',
    titleName: 'Refund policy',
    title:
      'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com. ',
    title1: ' These Terms will be applied fully and affect to your use of',
    update: 'Last update date:',
    Lastupdatedate: 'Sep 27, 2023   10: 00 AM',
    active: 'Active',
  },
  {
    id: 3,
    publishDate: 'Publish date:',
    dateTime: 'Sep 27, 2023   10: 00 AM',
    titleName: 'Refund policy',
    title:
      'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com.',
    title1: ' These Terms will be applied fully and affect to your use of',
    update: 'Last update date:',
    Lastupdatedate: 'Sep 27, 2023   10: 00 AM',
    active: 'Active',
  },
  {
    id: 4,
    publishDate: 'Publish date:',
    dateTime: 'Sep 27, 2023   10: 00 AM',
    titleName: 'Refund policy',
    title:
      'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com. ',
    title1: ' These Terms will be applied fully and affect to your use of',
    update: 'Last update date:',
    Lastupdatedate: 'Sep 27, 2023   10: 00 AM',
    active: 'Active',
  },
];

export const policyLabelData = [
  {
    id: 1,
    publishDate: 'Publish date:',
    dateTime: 'Sep 27, 2023   10: 00 AM',
    titleName: 'Refund policy',
    title:
      'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com. ',
    title1: ' These Terms will be applied fully and affect to your use of',
    update: 'Last update date:',
    Lastupdatedate: 'Sep 27, 2023   10: 00 AM',
    active: 'Active',
  },
];
