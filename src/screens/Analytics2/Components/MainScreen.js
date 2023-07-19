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
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const getAnalyticsData = useSelector(getAnalytics);

  const productGraphObject2 = getAnalyticsData?.getTotalGraph;
  const orderGraphObject = getAnalyticsData?.getOrderGraph;
  const inventeryGraphObject = getAnalyticsData?.getInventeryGraph;
  const revenueGraphObject = getAnalyticsData?.getRevenueGraph;

  const totalProductFunction = () => (
    <View style={styles.homeMainContainer}>
      <View style={{ flexDirection: 'row' }}>
        <HomeGraph
          header="Total Products"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '0'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
        <HomeGraph
          header="Total Inventory  Cost"
          subHeader={
            getAnalyticsData?.getInventeryGraph?.totalResult.toFixed(2) ?? '0'
          }
          productGraphObject={inventeryGraphObject}
          homeGraphHandler={() => {}}
          arrayLength={inventeryGraphObject?.datasets?.length}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.totalProductCon}>
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <View>
              <Text style={styles.darkBlackText}>Total Revenue</Text>
              <Text style={[styles.darkBlackText, { fontSize: SF(32) }]}>
                $
                {revenueGraphObject?.totalResult
                  ? revenueGraphObject?.totalResult.toFixed(2)
                  : 0}
              </Text>
            </View>
            <TouchableOpacity onPress={() => graphHandler('Total Revenue')}>
              <Image source={rightlight} style={styles.rightlight} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(5)} />

          <View style={{ overflow: 'hidden' }}>
            <BarChartCom
              barWid={Platform.OS === 'android' ? SH(550) : SH(380)}
              barHei={150}
              barSpacing={Platform.OS === 'android' ? 30 : 18}
              barW={Platform.OS === 'android' ? 10 : 7}
              labelTextSty={{ color: COLORS.gerySkies, fontSize: 11 }}
              revenueData={revenueGraphObject}
            />
          </View>
        </View>

        <HomeGraph
          header="Total Orders"
          subHeader={
            getAnalyticsData?.getOrderGraph?.totalResult.toFixed(2) ?? '0'
          }
          productGraphObject={orderGraphObject}
          homeGraphHandler={() => {}}
          arrayLength={orderGraphObject?.datasets?.length}
        />
      </View>
    </View>
  );

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
                  <Image source={bucket} style={styles.sideBarImage} />
                  <View style={styles.bucketBadge}>
                    <Text style={styles.badgetext}>0</Text>
                  </View>
                </View>
                <Spacer space={SH(25)} />
                <Image source={sideKeyboard} style={styles.sideBarImage} />
                <Spacer space={SH(20)} />
                <Image source={sideEarser} style={styles.sideBarImage} />
                <Spacer space={SH(20)} />
                <View>
                  <Image source={holdCart} style={styles.sideBarImage} />
                  <View style={styles.holdBadge}>
                    <Text style={styles.holdBadgetext}>0</Text>
                  </View>
                </View>
              </View>
              {/* <View style={{ flex: 1 }} />
              <View style={styles.bucketBackgorund}>
                <Image source={sideArrow} style={styles.sideBarImage} />
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
