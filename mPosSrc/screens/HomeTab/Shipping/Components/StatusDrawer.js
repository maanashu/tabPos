import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SW } from '@/theme';
import { getShipping } from '@/selectors/ShippingSelector';
import {
  getOrderCount,
  getOrders,
  getReviewDefault,
  todayShippingStatus,
} from '@/actions/ShippingAction';
import { useMemo } from 'react';

const StatusDrawer = ({ closeModal, selected, selectedStatusOrder }) => {
  const dispatch = useDispatch();
  const getShippingData = useSelector(getShipping);
  const statusCount = getShippingData?.getOrderCount;
  const [selectedStatus, setSelectedStatus] = useState(selectedStatusOrder);
  const { height } = Dimensions.get('window');
  const shippingData = useSelector(getShipping);
  const orderStatusCountData = shippingData?.orderStatus;
  // const shippingDrawer = [
  //   {
  //     key: '0',
  //     image: Images.reviewOrders,
  //     title: strings.orderStatus.reviewOrders,
  //     count: statusCount?.[0]?.count ?? 0,
  //   },
  //   {
  //     key: '3',
  //     image: Images.printingLabel,
  //     title: strings.orderStatus.printingLabel,
  //     count: statusCount?.[3]?.count ?? 0,
  //   },
  //   {
  //     key: '4',
  //     image: Images.delivery,
  //     title: strings.orderStatus.trackOrders,
  //     count: statusCount?.[4]?.count ?? 0,
  //   },
  //   {
  //     key: '5',
  //     image: Images.shippingCart,
  //     title: strings.orderStatus.delivered,
  //     count: statusCount?.[5]?.count ?? 0,
  //   },
  //   {
  //     key: '7,8',
  //     image: Images.noCard,
  //     title: strings.orderStatus.rejected,
  //     count: parseInt(statusCount?.[7]?.count ?? 0) + parseInt(statusCount?.[8]?.count ?? 0) ?? 0,
  //   },
  //   {
  //     key: '9',
  //     image: Images.returnOrders,
  //     title: strings.orderStatus.returned,
  //     count: statusCount?.[9]?.count ?? 0,
  //   },
  // ];
  const shippingDrawer = useMemo(
    () => [
      {
        key: '0',
        image: Images.reviewOrders,
        title: 'Orders to Review',
        count: orderStatusCountData?.[0]?.count ?? '0',
      },
      // {
      //   key: '1',
      //   image: drawerdeliveryTruck,
      //   title: 'Accepted',
      //   count: orderStatusCountData?.[1]?.count ?? '0',
      // },
      // {
      //   key: '2',
      //   image: timer,
      //   title: 'Order Preparing ',
      //   count: orderStatusCountData?.[2]?.count ?? '0',
      // },
      {
        key: '3',
        image: Images.printingLabel,
        title: 'Printing Label',
        count: orderStatusCountData?.[3]?.count ?? '0',
      },
      {
        key: '4',
        image: Images.delivery,
        title: 'Shipped',
        count: orderStatusCountData?.[4]?.count ?? '0',
      },
      {
        key: '5',
        image: Images.shippingCart,
        title: 'Delivered',
        count: orderStatusCountData?.[5]?.count ?? '0',
      },
      {
        key: '7,8',
        image: Images.noCard,
        title: 'Rejected/Cancelled',
        count: orderStatusCountData?.[6]?.count ?? '0',
      },
      {
        key: '9',
        image: Images.returnOrders,
        title: 'Returned',
        count: orderStatusCountData?.[7]?.count ?? '0',
      },
    ],
    [orderStatusCountData]
  );
  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      disabled={item?.count > 0 ? false : true}
      onPress={() => {
        dispatch(getOrders(item?.key));
        dispatch(getReviewDefault(item?.key));
        dispatch(getOrderCount());
        dispatch(todayShippingStatus());
        setSelectedStatus(item?.key);
        closeModal();
        selected(item?.key);
      }}
      style={styles.firstIconStyle}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );

  const showBadge = (item) => {
    const selectedDelivered =
      item?.title === strings.orderStatus.delivered && selectedStatus === item?.key
        ? COLORS.primary
        : COLORS.solid_grey;
    const selectedcancelled =
      item?.title === strings.orderStatus.rejected && selectedStatus === item?.key
        ? COLORS.pink
        : COLORS.solid_grey;
    const selectedReturned =
      item?.title === strings.orderStatus.returned && selectedStatus === item?.key
        ? COLORS.yellowTweet
        : COLORS.solid_grey;
    const otherSelection = selectedStatus === item?.key ? COLORS.primary : COLORS.solid_grey;
    if (item?.title === strings.orderStatus.delivered) {
      return (
        <>
          <View style={{ flex: 0.9 }}>
            <Text style={[styles.orderCount, { color: selectedDelivered }]}>{item?.count}</Text>
            <Text style={[styles.statusTitle, { color: selectedDelivered }]}>{item?.title}</Text>
          </View>

          <Image
            source={item?.image}
            style={[styles.sideBarImage, { tintColor: selectedDelivered }]}
          />
        </>
      );
    } else if (item?.title === strings.orderStatus.rejected) {
      return (
        <>
          <View style={{ flex: 0.9 }}>
            <Text style={[styles.orderCount, { color: selectedcancelled }]}>{item?.count}</Text>
            <Text style={[styles.statusTitle, { color: selectedcancelled }]}>{item?.title}</Text>
          </View>
          <Image
            source={item?.image}
            style={[styles.sideBarImage, { tintColor: selectedcancelled }]}
          />
        </>
      );
    } else if (item?.title === strings.orderStatus.returned) {
      return (
        <>
          <View style={{ flex: 0.9 }}>
            <Text style={[styles.orderCount, { color: selectedReturned }]}>{item?.count}</Text>
            <Text style={[styles.statusTitle, { color: selectedReturned }]}>{item?.title}</Text>
          </View>
          <Image
            source={item?.image}
            style={[styles.sideBarImage, { tintColor: selectedReturned }]}
          />
        </>
      );
    } else {
      return (
        <>
          <View style={{ flex: 0.9 }}>
            <Text style={[styles.orderCount, { color: otherSelection }]}>{item?.count}</Text>
            <Text style={[styles.statusTitle, { color: otherSelection }]}>{item?.title}</Text>
          </View>
          <Image
            source={item?.image}
            style={[styles.sideBarImage, { tintColor: otherSelection }]}
          />
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={shippingDrawer}
        renderItem={renderDrawer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        contentContainerStyle={{ height: height, paddingHorizontal: ms(10) }}
        ListHeaderComponent={() => (
          <TouchableOpacity style={styles.headerViewStyle} onPress={closeModal}>
            <Text style={styles.orderCount}>{strings.shipping.shippingOrders}</Text>
            <Image source={Images.deliveryOrders} style={[styles.sideBarImage, { left: ms(5) }]} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default memo(StatusDrawer);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    height: Dimensions.get('window').height - 150,
  },
  firstIconStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: ms(10),
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  bucketBackground: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bucketBadge: {
    width: ms(13),
    height: ms(13),
    borderRadius: ms(10),
    position: 'absolute',
    right: 5,
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgetext: {
    fontSize: ms(5.5),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  sideBarImage: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  orderCount: {
    fontSize: ms(14),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  statusTitle: {
    fontSize: ms(12),
    color: COLORS.text,
    fontFamily: Fonts.Regular,
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: ms(20),
    justifyContent: 'space-between',
  },
});
