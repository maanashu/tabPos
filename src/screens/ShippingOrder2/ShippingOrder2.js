import React from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import PieChart from 'react-native-pie-chart';
import { LineChart } from 'react-native-chart-kit';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { ScreenWrapper, Spacer } from '@/components';
import { rightSideDrawer, shippingTypes } from '@/constants/staticData';

import styles from './ShippingOrder2.styles';
import { Cart, firstTruck, NoCard, ReturnTruck } from '@/assets';

export function ShippingOrder2() {
  const widthAndHeight = 200;
  const series = [823, 101, 40];
  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet];

  const renderItem = ({ item, index }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.shippingTypeImage} />

      <View style={styles.shippingTypeDetails}>
        <Text style={styles.shippingTypeText}>{item?.title}</Text>
        <Text style={styles.totalTextStyle}>{item?.total}</Text>
      </View>
    </View>
  );

  const showBadge = image => {
    if (image === Cart) {
      return (
        <View
          style={[
            styles.bucketBadge,
            { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
          ]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
        </View>
      );
    } else if (image === NoCard) {
      return (
        <View
          style={[
            styles.bucketBadge,
            { backgroundColor: COLORS.pink, borderColor: COLORS.pink },
          ]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
        </View>
      );
    } else if (image === ReturnTruck) {
      return (
        <View
          style={[
            styles.bucketBadge,
            {
              backgroundColor: COLORS.yellowTweet,
              borderColor: COLORS.yellowTweet,
            },
          ]}
        >
          <Text style={[styles.badgetext, { color: COLORS.white }]}>0</Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.bucketBadge,
            {
              backgroundColor: COLORS.solidGrey,
              borderColor: COLORS.dark_grey,
              borderWidth: 2,
            },
          ]}
        >
          <Text style={styles.badgetext}>0</Text>
        </View>
      );
    }
  };

  const renderDrawer = ({ item, index }) => (
    <View style={styles.drawerIconView}>
      <View style={styles.bucketBackgorund}>
        <Image source={item.image} style={styles.sideBarImage} />

        {showBadge(item?.image)}
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <Spacer space={SH(20)} />

      <View style={styles.firstRowStyle}>
        {/* left View */}
        <View>
          {/* firstView */}
          <View style={styles.shippingStatusViewStyle}>
            <Text style={styles.shippingStatusText}>
              {strings.shippingOrder.shippingStatus}
            </Text>

            <View style={styles.shippingOrdersViewStyle}>
              <Text style={styles.shippedOrderText}>
                {strings.shippingOrder.shippingOrders}
              </Text>
              <Text style={styles.shippedOrderText}>{'23'}</Text>
            </View>

            <View style={styles.shippingOrdersViewStyle}>
              <Text style={styles.shippedOrderText}>
                {strings.shippingOrder.shippedOrder}
              </Text>
              <Text style={styles.shippedOrderText}>{'10'}</Text>
            </View>
          </View>

          <Spacer space={SH(20)} />

          {/* second View */}
          <View style={styles.currentStatusView}>
            <Text style={styles.currentStatusText}>
              {strings.shippingOrder.currentStatus}
            </Text>

            <FlatList data={shippingTypes} renderItem={renderItem} />
          </View>

          <Spacer space={SH(20)} />
          {/* third view */}
          <View style={styles.orderConvertionView}>
            <Text style={styles.orderTextStyle}>
              {strings.shippingOrder.orderConvertion}
            </Text>

            <Spacer space={SH(29)} />
            <View style={styles.piechartViewStyle}>
              <PieChart
                series={series}
                coverRadius={0.65}
                sliceColor={sliceColor}
                coverFill={COLORS.white}
                widthAndHeight={widthAndHeight}
              />
              <Text style={styles.percentageTextStyle}>{'97.51%'}</Text>

              <Spacer space={SH(12)} />
              <View style={styles.ordersRowView}>
                <Text style={styles.orderTypeTextStyle}>
                  {strings.shippingOrder.deliveredOrders}
                </Text>
                <Text style={styles.countTextStyle}>
                  {strings.shippingOrder.deliveredCount}
                </Text>
              </View>

              <View style={styles.ordersRowView}>
                <Text style={styles.orderTypeTextStyle}>
                  {strings.shippingOrder.cancelledOrders}
                </Text>
                <Text style={styles.countTextStyle}>
                  {strings.shippingOrder.cancelledCount}
                </Text>
              </View>

              <View style={styles.ordersRowView}>
                <Text style={styles.orderTypeTextStyle}>
                  {strings.shippingOrder.returnedOrders}
                </Text>
                <Text style={styles.countTextStyle}>
                  {strings.shippingOrder.returnedCount}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* rightView */}
        <View>
          <View>
            <LineChart
              bezier
              data={{
                labels: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                datasets: [
                  {
                    data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width * 0.55}
              height={425}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                borderRadius: 16,
              }}
            />
          </View>

          <Spacer space={SH(20)} />
          <View style={styles.orderToReviewView}>
            <View style={styles.headingRowStyle}>
              <Text style={styles.ordersToReviewText}>
                {strings.shipingOrder.orderOfReview}
              </Text>

              <TouchableOpacity style={styles.viewAllButtonStyle}>
                <Text style={styles.viewallTextStyle}>
                  {strings.reward.viewAll}
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList />
          </View>
        </View>

        {/* right bar view */}
        <View style={styles.rightSideView}>
          <FlatList
            data={rightSideDrawer}
            renderItem={renderDrawer}
            ListHeaderComponent={() => (
              <View style={{ alignSelf: 'center', paddingBottom: 60 }}>
                <Image source={firstTruck} style={styles.sideBarImage} />
              </View>
            )}
            keyExtractor={(item, index) => item.key.toString()}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
