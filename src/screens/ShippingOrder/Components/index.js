import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { styles } from '@/screens/ShippingOrder/ShippingOrder.styles';
import {
  clock,
  deliveryScooter,
  Fonts,
  pay,
  pin,
  radioRound,
  rightIcon,
  ups2,
  userImage,
} from '@/assets';
import { Button, Spacer } from '@/components';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import { useDispatch } from 'react-redux';
const windowHeight = Dimensions.get('window').height;

export function BottomSheet({ subTotal, tax, total, item, discount }) {
  return (
    <View>
      <View style={styles.rowView}>
        <Text style={styles.subTotal}>{strings.deliveryOrders.subTotal}</Text>
        <Text style={styles.subTotalValue}>${subTotal}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
          {strings.deliveryOrders.discount}
        </Text>
        <Text style={styles.discountValue}>-${discount}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
          {strings.deliveryOrders.tax}
        </Text>
        <Text style={styles.discountValue}>${tax}</Text>
      </View>
      <View style={styles.subtotalRow} />
      <View style={styles.rowView}>
        <Text style={styles.totalLabel}>{strings.deliveryOrders.total}</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={styles.discountValue}>
          {item} {strings.deliveryOrders.items}
        </Text>
      </View>
    </View>
  );
}

export function PrintScreenUI({
  userProfile,
  selectAndConHandler,
  firstName,
  shipingType,
  address,
  customerProduct,
  renderProductList,
  itemss,
  custProLength,
  selectShippingList,
  setSelectedShipId,
  selectedShipId,
}) {
  const SelectShipingItem = ({
    item,
    index,
    onPress,
    borderColor,
    tintColor,
  }) => (
    <TouchableOpacity
      style={[styles.selectShipingCon, { borderColor }]}
      onPress={onPress}
    >
      <View style={[styles.displayFlex]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={radioRound}
            style={[styles.radioRound, { tintColor }]}
          />
          <View style={styles.shipingRadioBtn}>
            <Image source={{ uri: item.image }} style={styles.ups2} />
            <View style={{ paddingHorizontal: moderateScale(5) }}>
              <Text style={styles.shipingRate}>{item.title}</Text>
              <Text style={styles.shipingRateSubHead}>{item.description}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.shipingRate}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const selectShipingRender = ({ item, index }) => {
    const borderColor =
      item.id === selectedShipId ? COLORS.primary : COLORS.solidGrey;
    const tintColor =
      item.id === selectedShipId ? COLORS.primary : COLORS.solidGrey;
    return (
      <SelectShipingItem
        item={item}
        index={index}
        onPress={() =>
          setSelectedShipId(selectedShipId === item.id ? null : item.id)
        }
        borderColor={borderColor}
        tintColor={tintColor}
      />
    );
  };

  return (
    <View>
      <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
        <View style={[styles.orderDetailView, styles.orderDetailView2]}>
          <Spacer space={SH(20)} />
          <View style={styles.reviewHeadingView}>
            <Text style={styles.orderReviewText}>
              {strings.deliveryOrders.orderId}
              {itemss?.id}
            </Text>
            <Text style={styles.orderReviewText}>
              {moment(itemss?.created_at).format('LL')}
            </Text>
          </View>

          <View style={styles.profileDetailView}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={userProfile} style={styles.profileImage} />
              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
                  {firstName}
                </Text>
                <Text style={[styles.timeText, { paddingLeft: 0 }]}>
                  {address}
                </Text>
              </View>
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
                  {shipingType}
                </Text>
                <Text style={styles.timeText}>
                  {strings.deliveryOrders.time}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          <View style={{ height: SH(340) }}>
            <FlatList
              data={customerProduct}
              extraData={customerProduct}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>

          <View style={[styles.bottomSheet, styles.bottomSheet2]}>
            <View style={styles.borderSheetBorder} />
            <BottomSheet
              discount={itemss?.discount ? itemss?.discount : '0'}
              subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
              tax={itemss?.tax ? itemss?.tax : '0'}
              total={itemss?.payable_amount}
              item={custProLength ? custProLength : '0'}
            />
            <Spacer SH={SH(30)} />
          </View>
        </View>
        <View style={styles.selectShipingRightView}>
          <Spacer space={SH(20)} />
          <Text style={styles.orderReviewText}>
            {strings.deliveryOrders.selectShip}
          </Text>
          <Spacer space={SH(20)} />
          <FlatList
            data={selectShippingList}
            extraData={selectShippingList}
            keyExtractor={item => item.id}
            renderItem={selectShipingRender}
          />
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={styles.printButtonCon}
            onPress={selectAndConHandler}
          >
            <Text style={styles.printText}>
              {strings.shipingOrder.printText}
            </Text>
          </TouchableOpacity>

          <Spacer space={SH(20)} />
        </View>
      </View>
    </View>
  );
}

export function SingleOrderView({
  selectShipingHandler,
  singleorderCancelHandler,
  singleOrderAccept,
  firstname,
  distance,
  itemLength,
  payAmount,
  deliveryType,
  orderSecondTime,
  orderFirstTime,
  userProfile,
  userFirstName,
  userAddress,
  driverShipping,
  renderProductList,
  singleOrder,
}) {
  const orderDate = moment(singleOrder?.created_at).format('LL');
  const orderId = singleOrder?.id;

  return (
    <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
      <View style={styles.orderNumberLeftViewmap}>
        <Spacer space={SH(20)} />
        <TouchableOpacity style={styles.reviewRenderView}>
          <View style={{ width: SW(45) }}>
            <Text numberOfLines={1} style={styles.nameText}>
              {firstname ? firstname : 'user name'}
            </Text>
            <View style={styles.timeView}>
              <Image source={pin} style={styles.pinIcon} />
              <Text style={styles.timeText}>
                {distance ? distance : '00.00'} miles
              </Text>
            </View>
          </View>

          <View style={{ width: SW(25) }}>
            <Text style={styles.nameText}>
              {itemLength ? itemLength : '0'}
              Item
            </Text>
            <View style={styles.timeView}>
              <Image source={pay} style={styles.pinIcon} />
              <Text style={styles.timeText}>
                ${payAmount ? payAmount : '0'}
              </Text>
            </View>
          </View>

          <View style={{ width: SW(60) }}>
            <Text style={[styles.nameText, { color: COLORS.primary }]}>
              {deliveryType}
            </Text>
            <View style={styles.timeView}>
              <Image source={clock} style={styles.pinIcon} />
              <Text style={styles.timeText}>
                {orderFirstTime ? orderFirstTime : '00.00'}
                {'-'}
                {orderSecondTime ? orderSecondTime : '00.00'}
              </Text>
            </View>
          </View>

          <View style={styles.rightIconStyle}>
            <Image source={rightIcon} style={styles.pinIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.orderDetailView, { height: windowHeight }]}>
        <Spacer space={SH(20)} />
        <View style={styles.reviewHeadingView}>
          <Text style={styles.orderReviewText}>
            {strings.deliveryOrders.orderId} {orderId}
          </Text>
          <Text style={styles.orderReviewText}>{orderDate}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileDetailView}
          onPress={() => selectShipingHandler()}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={userProfile ? { uri: userProfile } : userImage}
              style={styles.profileImage}
            />
            <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
              <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
                {userFirstName ? userFirstName : 'user name'}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.timeText, { paddingLeft: 0, width: SW(90) }]}
              >
                {userAddress ? userAddress : 'no address'}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Image source={deliveryScooter} style={styles.profileImage} />
            <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
              <Text
                style={[styles.nameText, styles.nameTextSet]}
                numberOfLines={1}
              >
                {driverShipping}
              </Text>
              <Text style={styles.timeText}>{strings.deliveryOrders.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Spacer space={SH(15)} />
        <View style={styles.horizontalLine} />
        <View style={{ height: windowHeight * 0.68 }}>
          <View style={{ height: SH(325) }}>
            <FlatList
              data={singleOrder?.order_details}
              extraData={singleOrder?.order_details}
              renderItem={renderProductList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparatorView} />
              )}
            />
          </View>
          <View style={styles.bottomSheet}>
            <BottomSheet
              discount={singleOrder?.discount ? singleOrder?.discount : '0'}
              subTotal={
                singleOrder?.actual_amount ? singleOrder?.actual_amount : '0'
              }
              tax={singleOrder?.tax ? singleOrder?.tax : '0'}
              total={
                singleOrder?.payable_amount ? singleOrder?.payable_amount : '0'
              }
              item={
                singleOrder?.order_details?.length
                  ? singleOrder?.order_details?.length
                  : '0'
              }
              Item
            />
            <View style={styles.orderReviewButton}>
              <Button
                style={styles.declineButton}
                title={strings.deliveryOrders.decline}
                textStyle={[styles.buttonText, { color: COLORS.primary }]}
                onPress={() => singleorderCancelHandler(singleOrder?.id)}
              />
              <Button
                style={styles.acceptButton}
                title={strings.deliveryOrders.accept}
                textStyle={styles.buttonText}
                onPress={() => singleOrderAccept(singleOrder?.id)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
