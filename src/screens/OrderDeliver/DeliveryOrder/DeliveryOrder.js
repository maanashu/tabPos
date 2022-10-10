import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  deliveryTruck,
  notifications,
  search_light,
  chart,
  pin,
  clock,
  pay,
  rightIcon,
  conversionBox,
} from '@/assets';
import { styles } from './DeliveryOrder.styles';
import { strings } from '@/localization';
import {
  deliveryOrders,
  orderConversion,
  orderReview,
  orderStatus,
} from '@/constants/staticData';
import { COLORS, SH, SW } from '@/theme';
import { Spacer } from '@/components';

export function DeliveryOrder() {
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <View style={styles.deliveryView}>
          <Image source={deliveryTruck} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>
            {strings.deliveryOrders.heading}
          </Text>
        </View>

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 10 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.orderView}>
      <View style={styles.orderStatusView}>
        <Image source={item.image} style={styles.orderStatusImage} />
      </View>

      <View style={styles.countView}>
        <Text style={styles.countText}>{item.count}</Text>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  const renderReviewItem = ({ item, index }) => {
    return (
      <View style={styles.reviewRenderView}>
        <View style={{ width: SW(50) }}>
          <Text style={styles.nameText}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 1,
            }}
          >
            <Image source={pin} style={styles.pinIcon} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>

        <View style={{ width: SW(25) }}>
          <Text style={styles.nameText}>{item.items}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 1,
            }}
          >
            <Image source={pay} style={styles.pinIcon} />
            <Text style={styles.timeText}>{item.price}</Text>
          </View>
        </View>

        <View style={{ width: SW(60) }}>
          <Text style={[styles.nameText, { color: COLORS.primary }]}>
            {item.deliveryType}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 1,
            }}
          >
            <Image source={clock} style={styles.pinIcon} />
            <Text style={styles.timeText}>{item.timeSlot}</Text>
          </View>
        </View>

        <View style={{ width: SW(10), justifyContent: 'center' }}>
          <Image source={rightIcon} style={styles.pinIcon} />
        </View>
      </View>
    );
  };

  const renderOrder = ({ item, index }) => {
    return (
      <View style={styles.renderOrderView}>
        <Text style={styles.countText}>{item.total}</Text>
        <Text style={[styles.statusText, { textAlign: 'left' }]}>
          {item.title}
        </Text>
      </View>
    );
  };

  const renderDeliveryOrders = ({ item, index }) => {
    return (
      <View style={styles.deliveryViewStyle}>
        <View style={{ flexDirection: 'row'}}>
          <Image source={item.image} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.delivery}</Text>

          <Image source={rightIcon} style={[styles.pinIcon,{left:5}]} />
        </View>

        <Text>{item.total}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {customHeader()}

      <View>
        <FlatList
          scrollEnabled={false}
          data={orderStatus}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={styles.contentContainer}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerMainView}>
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.orderNumberLeftView}>
              <Spacer space={SH(30)} />
              <Text style={styles.deliveryText}>
                {strings.deliveryOrders.orderNumber}
              </Text>

              <Spacer space={SH(20)} />
              <View style={styles.chartView}>
                <Image source={chart} style={styles.chartImageStyle} />
              </View>

              <Spacer space={SH(30)} />
            </View>

            <Spacer space={SH(40)} />
            <View style={styles.orderNumberLeftView}>
              <Spacer space={SH(20)} />
              <Text style={styles.deliveryText}>
                {strings.deliveryOrders.orderConversion}
              </Text>

              <Spacer space={SH(30)} />
              <View style={styles.conversionRow}>
                <Image
                  source={conversionBox}
                  style={styles.conversionBoxStyle}
                />

                <View style={{ width: SW(100), alignItems: 'center' }}>
                  <FlatList data={orderConversion} renderItem={renderOrder} />
                </View>
              </View>

              <Spacer space={SH(50)} />
            </View>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <View style={styles.orderReviewRightView}>
              <Spacer space={SH(20)} />
              <View style={styles.reviewHeadingView}>
                <Text style={styles.orderReviewText}>
                  {strings.deliveryOrders.orderReview}
                </Text>

                <TouchableOpacity style={styles.viewAllView}>
                  <Text style={styles.viewText}>
                    {strings.deliveryOrders.viewAll}
                  </Text>
                </TouchableOpacity>
              </View>

              <Spacer space={SH(15)} />
              <FlatList
                data={orderReview}
                renderItem={renderReviewItem}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <Spacer space={SH(20)} />
            <View style={styles.deliveryOrders}>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.deliveryOrders}
              </Text>

                <FlatList
                  horizontal
                  data={deliveryOrders}
                  renderItem={renderDeliveryOrders}
                />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
