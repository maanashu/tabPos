import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  crossButton,
  Fonts,
  notifications,
  search_light,
  location,
  backArrow,
  dropdown2,
  analytics,
  tobaco,
  rightlight,
  Union,
  mask,
  maskRight,
  unionRight,
  pencil,
  marboloRed2,
  ciger,
  gameLeaf,
  recordTape,
  leftBack,
  printIcon,
  willis,
  track,
  deliverCheck,
  fedx,
  jbrCustomer,
  checkArrow,
  ups,
  share,
  calendar1,
  clay,
  dropdown,
  checkedCheckboxSquare,
  blankCheckBox,
  movingArrow,
  blankRadio,
  contact,
  ticket,
  box,
  dropRight,
  movingArrowBlue,
  fillRadio,
  userImage,
  user,
  locationTracker,
  storeTracker,
  sideArrow,
  holdCart,
  sideKeyboard,
  sideEarser,
  bucket,
  Label,
  Review,
  ShippingDetail,
  Shipping,
  OrderPreparing,
  Shipped,
  Delivered,
  Rejected,
  Returned,
  analyticsReport,
  profit,
  revenueTotal,
  totalSales,
  channel,
  averageOrder,
  productSelling,
  locationSales,
  totalCost,
  totalOrders,
} from '@/assets';
import { COLORS, SF, SW, SH } from '@/theme';
import { Spacer, BarChartCom, ScreenWrapper } from '@/components';

import { getAnalytics } from '@/selectors/AnalyticsSelector';

import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

moment.suppressDeprecationWarnings = true;
import { styles } from '../Analytics2.styles';
import { HomeGraph } from '.';

export function MainScreen(props) {
  const getAnalyticsData = useSelector(getAnalytics);

  const productGraphObject2 = getAnalyticsData?.getTotalGraph;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.homeMainContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <HomeGraph
                  header="Total Profit"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Revenue"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Sales"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <HomeGraph
                  header="Sales by Channel"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />

                <HomeGraph
                  header="Average Order value"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />

                <HomeGraph
                  header="Top Selling Products"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <HomeGraph
                  header="Sales by Locations"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Orders"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
                <HomeGraph
                  header="Total Costs"
                  subHeader={
                    getAnalyticsData?.getTotalGraph?.totalResult ?? '0'
                  }
                  productGraphObject={productGraphObject2}
                  homeGraphHandler={() => {}}
                  arrayLength={productGraphObject2?.datasets?.length}
                />
              </View>
            </View>
            <View style={styles.rightSideView}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.bucketBackgorund}>
                  <Image source={analyticsReport} style={styles.sideBarImage} />
                </View>

                <Spacer space={SH(25)} />
                <Image source={profit} style={styles.sideBarImage} />
              </View>
              <Spacer space={SH(25)} />
              <Image source={revenueTotal} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />
              <Image source={totalSales} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={channel} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />
              <Image source={averageOrder} style={styles.sideBarImage} />
              <Spacer space={SH(25)} />
              <Image source={productSelling} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={locationSales} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={totalOrders} style={styles.sideBarImage} />

              <Spacer space={SH(25)} />

              <Image source={totalCost} style={styles.sideBarImage} />
              {/* <View style={styles.shippingBackgorund}>
                  <Image source={totalCost} style={styles.sideBarImage} />
                  <View
                  style={[
                    styles.bucketBadge,
                    {
                      backgroundColor: COLORS.yellowTweet,
                      borderColor: COLORS.transparent,
                    },
                  ]}
                >
                  <Text style={[styles.badgetext, { color: COLORS.white }]}>
                    0
                  </Text>
                </View> 
                </View>*/}
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
