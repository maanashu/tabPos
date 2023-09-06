import {
  Cart,
  Delivery,
  drawerdeliveryTruck,
  Group,
  NoCard,
  ReturnTruck,
  task,
  timer,
} from '@/assets';
import { getShipping } from '@/selectors/ShippingSelector';
import { useSelector } from 'react-redux';

const shippingData = useSelector(getShipping);
const orderStatusCountData = shippingData?.orderStatus;

export const statusCount = [
  {
    key: '0',
    image: task,
    title: 'Orders to Review',
    count: orderStatusCountData?.[0]?.count ?? '0',
  },
  {
    key: '1',
    image: drawerdeliveryTruck,
    title: 'Accepted',
    count: orderStatusCountData?.[1]?.count ?? '0',
  },
  {
    key: '2',
    image: timer,
    title: 'Order Preparing ',
    count: orderStatusCountData?.[2]?.count ?? '0',
  },
  {
    key: '3',
    image: Group,
    title: 'Printing Label',
    count: orderStatusCountData?.[3]?.count ?? '0',
  },
  {
    key: '4',
    image: Delivery,
    title: 'Shipped',
    count: orderStatusCountData?.[4]?.count ?? '0',
  },
  {
    key: '5',
    image: Cart,
    title: 'Delivered',
    count: orderStatusCountData?.[5]?.count ?? '0',
  },
  {
    key: '7,8',
    image: NoCard,
    title: 'Rejected/Cancelled',
    count: orderStatusCountData?.[6]?.count ?? '0',
  },
  {
    key: '9',
    image: ReturnTruck,
    title: 'Returned',
    count: orderStatusCountData?.[7]?.count ?? '0',
  },
];
