import { MPOS_NAVIGATION } from '@common/commonImports';
import { Images } from '@mPOS/assets';

export const tagLine = [
  {
    label: 'Batch management',
    image: Images.batch,
    id: 1,
    navigation: MPOS_NAVIGATION.batchManagement,
  },
  {
    label: 'Customers',
    image: Images.customersIcon,
    id: 2,
    navigation: MPOS_NAVIGATION.customers,
  },
  {
    label: 'Rewards',
    image: Images.rewardIcon,
    id: 3,
  },
  {
    label: 'Analytics ',
    image: Images.analyticsIcon,
    id: 4,
    navigation: MPOS_NAVIGATION.analytics,
  },
  {
    label: 'Wallet ',
    image: Images.wallet,
    id: 5,
  },
];

export const acccessAndConfirmation = [
  {
    label: 'Face Recognitions',
    image: Images.faceRecoIcon,
    id: 1,
    navigation: MPOS_NAVIGATION.faceId,
  },
  {
    label: 'PIN',
    image: Images.numPad,
    id: 2,
    navigation: MPOS_NAVIGATION.pinId,
  },
];

export const essential = [
  {
    label: 'Security',
    image: Images.security,
    id: 1,
  },
  {
    label: 'Notifications',
    image: Images.notification,
    id: 2,
    navigation: MPOS_NAVIGATION.notificationSettings,
  },
  {
    label: 'Plans',
    image: Images.planIcon,
    id: 3,
    navigation: MPOS_NAVIGATION.plans,
  },
  {
    label: 'Shipping & Pickups',
    image: Images.shippingIcon,
    id: 4,
  },
  {
    label: 'Devices',
    image: Images.devices,
    id: 5,
  },
];

export const moreApp = [
  {
    label: 'Settings',
    image: Images.settings,
    id: 1,
    navigation: MPOS_NAVIGATION.settings,
  },
  {
    label: 'Terms & Conditions',
    image: Images.terms,
    id: 2,
  },
  {
    label: 'Privacy Policy',
    image: Images.privacy,
    id: 3,
  },
  {
    label: 'Help center',
    image: Images.helpCenter,
    id: 4,
  },
];

export const DUMMY_IMAGE = 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg';
export const DUMMY_USER_IMAGE = 'https://picsum.photos/id/64/200/300';

// export const homePageData = [
//   {
//     key: '1',
//     title: 'Products',
//     image: Images.products,
//     listedProducts: '125 Products listed',
//   },
//   {
//     key: '2',
//     title: 'Services',
//     image: Images.services,
//     listedProducts: '125 Products listed',
//   },
//   {
//     key: '3',
//     title: 'On-Hold',
//     image: Images.hold,
//   },
//   {
//     key: '4',
//     title: 'Return',
//     image: Images.returnIcon,
//     listedProducts: 'Incomplete: 3',
//   },
//   {
//     key: '5',
//     title: 'Delivery',
//     image: Images.delivery,
//     listedProducts: 'Processing: 16',
//   },
//   {
//     key: '6',
//     title: 'Shipping',
//     image: Images.shippingImage,
//     listedProducts: 'On-going: 3',
//   },
//   {
//     key: '7',
//     title: 'Booking',
//     image: Images.calendar,
//     listedProducts: 'On-going: 3',
//   },
//   {
//     key: '8',
//     title: 'Add Title',
//     image: Images.addTitle,
//   },
// ];

export const AccountsData = [
  {
    name: 'Drawer-Cash Management',
    key: 1,
    img: Images.drawer,
  },

  {
    name: 'Appointment/Calendar ',
    key: 2,
    img: Images.calendar,
  },
  {
    name: 'Rewards',
    key: 3,
    img: Images.rewards,
  },
  {
    name: 'Analytics',
    key: 4,
    img: Images.analytics,
  },
];

export const AccessConfirmation = [
  {
    name: 'Face ID & PIN',
    key: 1,
    img: Images.faceId,
  },
  {
    name: 'Settings',
    key: 2,
    img: Images.settings,
  },
  {
    name: 'Help center',
    key: 3,
    img: Images.helpCenter,
  },
  {
    name: 'Terms & Conditions',
    key: 4,
    img: Images.terms,
  },
  {
    name: 'Privacy Policy',
    key: 5,
    img: Images.privacy,
  },
];

export const ItemsData = [
  {
    key: '1',
    title: 'Baby Boy',
    products: '24 listed',
    image: Images.babyBoy,
  },
  {
    key: '2',
    title: 'Baby Girl',
    products: '24 listed',
    image: Images.babyGirl,
  },
  {
    key: '3',
    title: 'Boys',
    products: '24 listed',
    image: Images.boy,
  },
  {
    key: '4',
    title: 'Girls',
    products: '24 listed',
    image: Images.girl,
  },
  {
    key: '5',
    title: 'Men',
    products: '24 listed',
    image: Images.men,
  },
  {
    key: '6',
    title: 'Women',
    products: '24 listed',
    image: Images.women,
  },
];

export const SubCategories = [
  {
    key: '1',
    title: 'Accessories',
    brands: '21 Brands',
    products: '55 Products',
    Products: [
      {
        key: '1',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
      {
        key: '2',
        productImage: 'https://m.media-amazon.com/images/I/71AS9qMcBRL._SL1500_.jpg',
      },
      {
        key: '3',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
      {
        key: '4',
        productImage:
          'https://as2.ftcdn.net/v2/jpg/03/18/30/85/1000_F_318308547_FALKncfWsTmjzwd0y0muNeCFOULPLB7Q.jpg',
      },
      {
        key: '5',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
    ],
  },
  {
    key: '2',
    title: 'Bottoms',
    brands: '21 Brands',
    products: '55 Products',
    Products: [
      {
        key: '1',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
      {
        key: '2',
        productImage: 'https://m.media-amazon.com/images/I/71AS9qMcBRL._SL1500_.jpg',
      },
      {
        key: '3',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
      {
        key: '4',
        productImage:
          'https://as2.ftcdn.net/v2/jpg/03/18/30/85/1000_F_318308547_FALKncfWsTmjzwd0y0muNeCFOULPLB7Q.jpg',
      },
      {
        key: '5',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
    ],
  },
  {
    key: '3',
    title: 'Coats & Jackets',
    brands: '21 Brands',
    products: '55 Products',
    Products: [
      {
        key: '1',
        productImage:
          'https://as2.ftcdn.net/v2/jpg/03/18/30/85/1000_F_318308547_FALKncfWsTmjzwd0y0muNeCFOULPLB7Q.jpg',
      },
      {
        key: '2',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
      {
        key: '3',
        productImage: 'https://m.media-amazon.com/images/I/71AS9qMcBRL._SL1500_.jpg',
      },
      {
        key: '4',
        productImage: 'https://m.media-amazon.com/images/I/41AZp6--pGL.jpg',
      },
      {
        key: '5',
        productImage:
          'https://as2.ftcdn.net/v2/jpg/03/18/30/85/1000_F_318308547_FALKncfWsTmjzwd0y0muNeCFOULPLB7Q.jpg',
      },
    ],
  },
];

export const ProductsList = [
  {
    key: '1',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '2',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '3',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '4',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '5',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '6',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '7',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '8',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '9',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
  {
    key: '10',
    title: 'Jacket-Nord',
    gender: 'Men',
    price: '$7.59',
    itemsInStock: '12 in Stock',
    image: DUMMY_IMAGE,
  },
];

export const StockItems = [
  {
    key: '1',
    size: '6',
    quantity: '15',
  },
  {
    key: '2',
    size: '6.5',
    quantity: '15',
  },
  {
    key: '3',
    size: '7',
    quantity: '15',
  },
  {
    key: '4',
    size: '7.5',
    quantity: '15',
  },
  {
    key: '5',
    size: '8',
    quantity: '15',
  },
  {
    key: '6',
    size: '8.5',
    quantity: '15',
  },
  {
    key: '7',
    size: '9',
    quantity: '15',
  },
  {
    key: '8',
    size: '9.5',
    quantity: '15',
  },
];

export const ServicesData = [
  {
    key: '1',
    title: 'Nail Services',
  },
  {
    key: '2',
    title: 'Hair Cut',
  },
  {
    key: '3',
    title: 'Manicure',
  },
  {
    key: '4',
    title: 'Pedicure',
  },
  {
    key: '5',
    title: 'Baby Boy',
  },
];

export const UserData = [
  {
    key: 1,
    img: DUMMY_USER_IMAGE,
  },
  {
    key: 2,
    img: DUMMY_USER_IMAGE,
  },
  {
    key: 3,
    img: DUMMY_USER_IMAGE,
  },
];

export const monthDays = [
  {
    key: 1,
    day: 'MON',
    date: '15',
  },
  {
    key: 2,
    day: 'TUE',
    date: '16',
  },
  {
    key: 3,
    day: 'WED',
    date: '17',
  },
  {
    key: 4,
    day: 'THU',
    date: '18',
  },
  {
    key: 5,
    day: 'FRI',
    date: '19',
  },
  {
    key: 6,
    day: 'SAT',
    date: '20',
  },
  {
    key: 7,
    day: 'SUN',
    date: '21',
  },
  {
    key: 8,
    day: 'MON',
    date: '22',
  },
  {
    key: 9,
    day: 'TUE',
    date: '23',
  },
];

export const timeSlotsData = [
  {
    key: 1,
    start_time: '09:00a',
    end_time: '10:00a',
  },
  {
    key: 2,
    start_time: '11:00a',
    end_time: '12:00p',
  },
  {
    key: 3,
    start_time: '12:00p',
    end_time: '01:00p',
  },
  {
    key: 4,
    start_time: '01:00p',
    end_time: '02:00p',
  },
  {
    key: 5,
    start_time: '02:00p',
    end_time: '03:00p',
  },
  {
    key: 6,
    start_time: '03:00p',
    end_time: '04:00p',
  },
  {
    key: 7,
    start_time: '04:00p',
    end_time: '05:00p',
  },
  {
    key: 8,
    start_time: '05:00p',
    end_time: '06:00a',
  },
  {
    key: 9,
    start_time: '06:00a',
    end_time: '07:00a',
  },
  {
    key: 10,
    start_time: '07:00p',
    end_time: '08:00p',
  },
  {
    key: 11,
    start_time: '08:00p',
    end_time: '09:00p',
  },
  {
    key: 12,
    start_time: '09:00p',
    end_time: '10:00p',
  },
  {
    key: 13,
    start_time: '10:00p',
    end_time: '11:00p',
  },
  {
    key: 14,
    start_time: '11:00p',
    end_time: '12:00a',
  },
  {
    key: 15,
    start_time: '12:00a',
    end_time: '01:00a',
  },
  {
    key: 16,
    start_time: '12:00a',
    end_time: '01:00a',
  },
];

export const POSUSERS = [
  {
    key: '1',
    name: 'Millicent C. Edward',
    role: 'Admin/Manager',
    lastLogin: 'Last Login',
    date: 'Today Wednesday 11 Aug 2022',
    time: 'Time 3:25 pm',
  },
  {
    key: '2',
    name: 'Millicent C. Edward',
    role: 'Admin/Manager',
    lastLogin: 'Last Login',
    date: 'Today Wednesday 11 Aug 2022',
    time: 'Time 3:25 pm',
  },
  {
    key: '3',
    name: 'Millicent C. Edward',
    role: 'Admin/Manager',
    lastLogin: 'Last Login',
    date: 'Today Wednesday 11 Aug 2022',
    time: 'Time 3:25 pm',
  },
  {
    key: '4',
    name: 'Millicent C. Edward',
    role: 'Admin/Manager',
    lastLogin: 'Last Login',
    date: 'Today Wednesday 11 Aug 2022',
    time: 'Time 3:25 pm',
  },
  {
    key: '5',
    name: 'Millicent C. Edward',
    role: 'Admin/Manager',
    lastLogin: 'Last Login',
    date: 'Today Wednesday 11 Aug 2022',
    time: 'Time 3:25 pm',
  },
];
