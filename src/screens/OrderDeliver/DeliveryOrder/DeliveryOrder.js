import React, { useState } from 'react';
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
  backArrow,
  profileImage,
  Fonts,
  deliveryScooter,
} from '@/assets';
import { styles } from './DeliveryOrder.styles';
import { strings } from '@/localization';
import {
  deliveryOrders,
  orderConversion,
  orderReview,
  orderStatus,
  productList,
} from '@/constants/staticData';
import { COLORS, SH, SW } from '@/theme';
import { Button, Spacer } from '@/components';

export function DeliveryOrder() {
  const [viewAllReviews, setViewAllReviews] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {viewAllReviews ? (
          <TouchableOpacity
            onPress={() => {
              setViewAllReviews(false);
            }}
            style={styles.backView}
          >
            <Image source={backArrow} style={styles.truckStyle} />
            <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={deliveryTruck} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>
              {strings.deliveryOrders.heading}
            </Text>
          </View>
        )}

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

  const renderReviewItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={viewAllReviews ? 0.5 : 1}
      onPress={() => {
        viewAllReviews ? onPressReview(index) : null;
      }}
      style={styles.reviewRenderView}
    >
      <View style={{ width: SW(50) }}>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item.items}</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.price}</Text>
        </View>
      </View>

      <View style={{ width: SW(60) }}>
        <Text style={[styles.nameText, { color: COLORS.primary }]}>
          {item.deliveryType}
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item.timeSlot}</Text>
        </View>
      </View>

      <View style={{ width: SW(10), justifyContent: 'center' }}>
        <Image source={rightIcon} style={styles.pinIcon} />
      </View>
    </TouchableOpacity>
  );

  const renderOrder = ({ item, index }) => (
    <View style={styles.renderOrderView}>
      <Text style={styles.countText}>{item.total}</Text>
      <Text style={[styles.statusText, { textAlign: 'left' }]}>
        {item.title}
      </Text>
    </View>
  );

  const renderDeliveryOrders = ({ item, index }) => (
    <View style={styles.deliveryViewStyle}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={item.image}
          style={[styles.pinIcon, { tintColor: COLORS.primary }]}
        />
        <Text style={[styles.timeText, { color: COLORS.primary }]}>
          {item.delivery}
        </Text>

        <Image source={rightIcon} style={[styles.pinIcon, { left: 5 }]} />
      </View>

      <Text style={styles.totalText}>{item.total}</Text>
    </View>
  );

  const onPressReview = index => {};

  const renderProductList = ({ item, index }) => (
    <View
      style={{
        marginHorizontal: SW(5),
        flexDirection: 'row',
        top: 7,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', width: SW(50) }}>
        <Image source={item.image} style={styles.profileImage} />

        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.boxText}>{item.box}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{'x'}</Text>
        <Text style={styles.priceText}>{item.quantity}</Text>
      </View>

      <Text style={styles.priceText}>{item.price}</Text>
    </View>
  );

  const changeView = () => {
    if (viewAllReviews) {
      return (
        <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
          <View style={styles.orderNumberLeftView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderReview}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <FlatList
                data={orderReview}
                renderItem={renderReviewItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.orderDetailView}>
            <Spacer space={SH(20)} />
            <View style={styles.reviewHeadingView}>
              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderId}
              </Text>

              <Text style={styles.orderReviewText}>
                {strings.deliveryOrders.orderDate}
              </Text>
            </View>

            <View style={styles.profileDetailView}>
              <Image source={profileImage} style={styles.profileImage} />

              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
                  {strings.deliveryOrders.name}
                </Text>
                <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                  {strings.deliveryOrders.address}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <Image source={deliveryScooter} style={styles.profileImage} />
                <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                  <Text
                    style={[
                      styles.nameText,
                      { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                    ]}
                  >
                    {strings.deliveryOrders.deliveryType}
                  </Text>
                  <Text style={styles.timeText}>
                    {strings.deliveryOrders.time}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.solidGrey,
                marginTop: 7,
              }}
            />

            <View>
              <FlatList
                data={productList}
                renderItem={renderProductList}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      backgroundColor: COLORS.solidGrey,
                      height: 1,
                      width: '92%',
                      alignSelf: 'center',
                    }}
                  />
                )}
              />
            </View>

            <View style={styles.bottomSheet}>
              <View style={styles.rowView}>
                <Text style={styles.subTotal}>{'Sub Total'}</Text>
                <Text style={styles.subTotalValue}>{'$4.00'}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
                  {'Discount'}
                </Text>
                <Text style={styles.discountValue}>{'-$2.00'}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
                  {'Tax'}
                </Text>
                <Text style={styles.discountValue}>{'$4.00'}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={styles.totalLabel}>{'Total'}</Text>
                <Text style={styles.totalValue}>{'$254.60'}</Text>
              </View>

              <View style={styles.rowView}>
                <Text style={styles.discountValue}>{'4 Items'}</Text>
              </View>

              {orderAccepted ? (
                <Button
                  style={styles.button}
                  title={'Ready for Pickup'}
                  textStyle={styles.buttonText}
                />
              ) : (
                <View
                  style={styles.orderReviewButton}
                >
                  <Button
                    style={styles.declineButton}
                    title={'Decline'}
                    textStyle={[styles.buttonText, { color: COLORS.primary }]}
                  />

                  <Button
                    onPress={() => {
                      setOrderAccepted(true);
                    }}
                    style={styles.acceptButton}
                    title={'Accept Order'}
                    textStyle={styles.buttonText}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            scrollEnabled={false}
            data={orderStatus}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.contentContainer}
          />

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

                    <View style={styles.orderFlatlistView}>
                      <FlatList
                        data={orderConversion}
                        renderItem={renderOrder}
                      />
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

                    <TouchableOpacity
                      onPress={() => {
                        setViewAllReviews(true);
                      }}
                      style={styles.viewAllView}
                    >
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
  };

  return (
    <View style={styles.container}>
      {customHeader()}

      {changeView()}
    </View>
  );
}
