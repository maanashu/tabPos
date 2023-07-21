import {
  Cart,
  columbiaMen,
  Delivery,
  deliveryTruck,
  dhl,
  drawerdeliveryTruck,
  fedex,
  fedexNew,
  fedx,
  Group,
  NoCard,
  ReturnTruck,
  task,
  timer,
  ups,
  usps,
} from '@/assets';

export const orderStatus = [
  {
    key: '1',
    status: 'Orders to Review',
    count: '49',
    image: require('@/assets/icons/ic_deliveryOrder/order.png'),
  },
  {
    key: '2',
    status: 'Order Preparing',
    count: '23',
    image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
  },
  {
    key: '3',
    status: 'Ready to pickup',
    count: '15',
    image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
  },
  {
    key: '4',
    status: 'Delivering',
    count: '9',
    image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
  },
];

export const loadingData = [
  {
    key: '1',
  },
  {
    key: '2',
  },
  {
    key: '3',
  },
  {
    key: '4',
  },
  {
    key: '5',
  },
  {
    key: '6',
  },
  {
    key: '7',
  },
  {
    key: '8',
  },
  {
    key: '9',
  },
];
export const deliveryOrderStatus = [
  {
    key: '1',
    status: 'New Shipping Orders',
    count: '49',
    image: require('@/assets/icons/ic_deliveryOrder/order.png'),
  },
  {
    key: '2',
    status: 'Ready To Ship',
    count: '23',
    image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
  },
  {
    key: '3',
    status: 'Order Shipped',
    count: '15',
    image: require('@/assets/icons/ic_deliveryOrder/Category.png'),
  },
  {
    key: '4',
    status: 'Cancelled',
    count: '9',
    image: require('@/assets/icons/ic_deliveryOrder/driver.png'),
  },
];

export const orderReview = [
  {
    id: '1',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: 'Expess delivery',
    timeSlot: 'immediately',
  },
  {
    id: '2',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '1 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '3',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '1 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '4',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '1 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '5',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '1 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '6',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '1 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '7',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '1 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '8',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '2 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
  {
    id: '9',
    name: 'Rebecca R. Russell',
    time: '2.5 miles',
    items: '3 items',
    price: '$489.50',
    deliveryType: '2 hour delivery window',
    timeSlot: '2.00 PM - 3.00 PM',
  },
];

export const orderConversion = [
  {
    key: '1',
    title: 'Orders Placed',
    total: '49',
  },
  {
    key: '2',
    title: 'Orders Cancelled',
    total: '3',
  },
  {
    key: '3',
    title: 'Orders Delivered',
    total: '46',
  },
];

export const deliveryOrders = [
  {
    key: '1',
    image: require('@/assets/icons/ic_deliveryOrder/parcel.png'),
    delivery: 'Expess delivery',
    total: '3',
  },
  {
    key: '2',
    image: require('@/assets/icons/ic_navigator/deliveryTruck.png'),
    delivery: 'Expess delivery',
    total: '17',
  },
  {
    key: '3',
    image: require('@/assets/icons/ic_navigator/deliveryTruck.png'),
    delivery: 'Expess delivery',
    total: '49',
  },
];
export const shipdeliveryOrders = [
  {
    key: '1',
    image: require('@/assets/icons/ic_deliveryOrder/parcel.png'),
    delivery: 'USPS',
    total: '3',
  },
  {
    key: '2',
    image: require('@/assets/icons/ic_navigator/deliveryTruck.png'),
    delivery: 'UPS',
    total: '17',
  },
  {
    key: '3',
    image: require('@/assets/icons/ic_navigator/deliveryTruck.png'),
    delivery: 'Fed',
    total: '49',
  },
];

export const productList = [
  {
    key: '1',
    image: require('@/assets/icons/ic_deliveryOrder/cigar.png'),
    title: 'JFR Maduro',
    box: 'Box',
    quantity: '1',
    price: '$382.75',
  },
  {
    key: '2',
    image: require('@/assets/icons/ic_deliveryOrder/cigarrete.png'),
    title: 'Ashton Magnum',
    box: 'Box',
    quantity: '1',
    price: '$236.50',
  },
  {
    key: '3',
    image: require('@/assets/icons/ic_deliveryOrder/blueCigar.png'),
    title: 'Marlboro Touch',
    box: 'Box',
    quantity: '1',
    price: '$43.99',
  },
  {
    key: '4',
    image: require('@/assets/icons/ic_deliveryOrder/cigarBox.png'),
    title: 'Marlboro Touch',
    box: 'Box',
    quantity: '1',
    price: '$43.99',
  },
  {
    key: '5',
    image: require('@/assets/icons/ic_deliveryOrder/marlboro.png'),
    title: 'Marlboro Touch',
    box: 'Box',
    quantity: '1',
    price: '$43.99',
  },
  {
    key: '6',
    image: require('@/assets/icons/ic_deliveryOrder/marlboro.png'),
    title: 'Marlboro Touch',
    box: 'Box',
    quantity: '1',
    price: '$43.99',
  },
  {
    key: '7',
    image: require('@/assets/icons/ic_deliveryOrder/marlboro.png'),
    title: 'Marlboro Touch',
    box: 'Box',
    quantity: '1',
    price: '$43.99',
  },
  {
    key: '8',
    image: require('@/assets/icons/ic_deliveryOrder/marlboro.png'),
    title: 'Marlboro Touch',
    box: 'Box',
    quantity: '1',
    price: '$43.99',
  },
];

export const getCustomerDummy = {
  new_customers: 0,
  online_customers: 0,
  returning_customers: 0,
  shipping_customers: 0,
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

export const shippingTypes = [
  {
    key: '1',
    title: 'USPS',
    image: usps,
    total: '17',
  },
  {
    key: '2',
    title: 'UPS',
    image: fedex,
    total: '17',
  },
  {
    key: '3',
    title: 'FedEX',
    image: fedexNew,
    total: '17',
  },
  {
    key: '4',
    title: 'DHL',
    image: dhl,
    total: '17',
  },
];

export const rightSideDrawer = [
  {
    key: '1',
    image: task,
  },
  {
    key: '2',
    image: drawerdeliveryTruck,
  },
  {
    key: '3',
    image: timer,
  },
  {
    key: '4',
    image: Group,
  },
  {
    key: '5',
    image: Delivery,
  },
  {
    key: '6',
    image: Cart,
  },
  {
    key: '7',
    image: NoCard,
  },
  {
    key: '8',
    image: ReturnTruck,
  },
];

export const orderToReview = [
  {
    key: '1',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '2',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '3',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '4',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '5',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '6',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '7',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '8',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '9',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
  {
    key: '10',
    name: 'Rebecca R. Russell',
    totalItems: '3 items',
    deliveryType: '1 hour delivery window',
    distance: '25 miles',
    price: '$489.50',
    time: 'immediately',
  },
];

export const shippingDrawer = [
  {
    key: '1',
    image: task,
    title: 'Orders to Review',
    count: '49',
  },
  {
    key: '2',
    image: drawerdeliveryTruck,
    title: 'Accepted',
    count: '23',
  },
  {
    key: '3',
    image: timer,
    title: 'Order Preparing ',
    count: '15',
  },
  {
    key: '4',
    image: Group,
    title: 'Printing Label',
    count: '9',
  },
  {
    key: '5',
    image: Delivery,
    title: 'Shipped',
    count: '49',
  },
  {
    key: '6',
    image: Cart,
    title: 'Delivered',
    count: '15',
  },
  {
    key: '7',
    image: NoCard,
    title: 'Rejected/ Cancelled',
    count: '9',
  },
  {
    key: '8',
    image: ReturnTruck,
    title: 'Cancelled',
    count: '23',
  },
];

export const orderProducts = [
  {
    key: '1',
    name: `Columbia Men's Rain Jacket`,
    colorandsize: 'White / S',
    price: '$80.99',
    quantity: '1',
    totalprice: '$80.99',
    image: columbiaMen,
  },
  {
    key: '2',
    name: `Columbia Men's Rain Jacket`,
    colorandsize: 'White / S',
    price: '$80.99',
    quantity: '1',
    totalprice: '$80.99',
    image: columbiaMen,
  },
  {
    key: '3',
    name: `Columbia Men's Rain Jacket`,
    colorandsize: 'White / S',
    price: '$80.99',
    quantity: '1',
    totalprice: '$80.99',
    image: columbiaMen,
  },
  {
    key: '4',
    name: `Columbia Men's Rain Jacket`,
    colorandsize: 'White / S',
    price: '$80.99',
    quantity: '1',
    totalprice: '$80.99',
    image: columbiaMen,
  },
  {
    key: '5',
    name: `Columbia Men's Rain Jacket`,
    colorandsize: 'White / S',
    price: '$80.99',
    quantity: '1',
    totalprice: '$80.99',
    image: columbiaMen,
  },
];
