import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';

import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { clock, Fonts, pay, pin, rightIcon, user, userOutlineDrawer } from '@/assets';
import { ms } from 'react-native-size-matters';
import { DataTable } from 'react-native-paper';

const OrderWithInvoiceNumber = ({ orderData }) => {
  const userDetails = orderData?.order?.user_details ?? orderData?.return?.user_details;

  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.deliveryOrders.delivery;
      case '3':
        return strings.returnOrder.inStore;
      case '4':
        return strings.shipping.shippingText;
      case '2':
        return strings.returnOrder.reservation;
      default:
        return strings.returnOrder.inStore;
    }
  };
  return (
    <View style={styles.container}>
      <DataTable style={styles.tableView}>
        <DataTable.Header style={[styles.tableListHeader]}>
          <DataTable.Title style={styles.dateTableSetting}>
            <Text style={styles.revenueText}># Invoice</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.dateTableSetting, { marginLeft: ms(-5) }]}>
            <Text style={styles.revenueText}>Customer</Text>
          </DataTable.Title>

          <DataTable.Title style={[styles.dateTableSetting, { marginLeft: ms(25) }]}>
            <Text style={styles.revenueText}>Sale</Text>
          </DataTable.Title>

          <DataTable.Title
            style={[
              styles.dateTableSetting,
              { marginLeft: Platform.OS === 'android' ? ms(25) : ms(-10) },
            ]}
          >
            <Text style={styles.revenueText}>Items</Text>
          </DataTable.Title>

          <DataTable.Title
            style={[
              styles.dateTableSetting,
              { marginLeft: Platform.OS === 'android' ? ms(-20) : ms(-10) },
            ]}
          >
            <Text style={styles.revenueText}>Price</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.dateTableSetting, { marginLeft: ms(-20) }]}>
            <Text style={styles.revenueText}></Text>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {orderData !== undefined && Object.keys(orderData).length > 0 ? (
        <View style={styles.orderRowStyle}>
          <Text style={styles.invoiceNumberTextStyle}>
            {`#${orderData?.invoice_number}` ?? '-'}
          </Text>

          <View
            style={[
              styles.orderDetailStyle,
              { flexDirection: 'row', alignItems: 'center', paddingHorizontal: ms(2) },
            ]}
          >
            <Image source={user} resizeMode="contain" style={{ height: ms(20), width: ms(20) }} />
            <Text style={styles.nameTextStyle}>
              {`${userDetails?.user_profiles?.firstname ?? 'N/A'} ${
                userDetails?.user_profiles?.lastname ?? ''
              }`}
            </Text>

            {/* {orderData?.order?.delivery_option !== '3' ? (
              <View style={styles.locationViewStyle}>
                <Image source={pin} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>{orderData?.distance ?? '-'}</Text>
              </View>
            ) : (
              <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
                <Text style={styles.nameTextStyle}>{'-'}</Text>
              </View>
            )} */}
          </View>

          {/* <Text style={styles.timeTextStyle}>{strings.returnOrder.customer}</Text> */}
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>
              {getDeliveryType(orderData?.order?.delivery_option)}
            </Text>
          </View>

          <View>
            <Text style={styles.nameTextStyle}>
              {orderData?.return
                ? orderData?.return?.order?.total_items
                : orderData?.order?.total_items}
            </Text>
          </View>

          <View
            style={[
              styles.locationViewStyle,
              { backgroundColor: COLORS.soft_green, paddingHorizontal: ms(10) },
            ]}
          >
            <Image
              source={pay}
              style={[styles.pinImageStyle, { tintColor: COLORS.success_green }]}
            />
            <Text style={[styles.distanceTextStyle, { color: COLORS.success_green }]}>
              {orderData?.return
                ? orderData?.return?.order?.payable_amount
                : orderData?.order?.payable_amount}
            </Text>
          </View>

          <View style={[styles.orderDetailStyle, { width: SH(24) }]}>
            <Image source={rightIcon} style={styles.rightIconStyle} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.emptyTextStyle}>{strings.returnOrder.noInvoices}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(OrderWithInvoiceNumber);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: ms(8),
    marginVertical: ms(8),
    paddingVertical: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: ms(10),
    borderColor: COLORS.light_blue,
    justifyContent: 'space-between',
    backgroundColor: COLORS.sky_grey,
  },
  invoiceNumberTextStyle: {
    fontSize: ms(7),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    textAlignVertical: 'center',
    paddingHorizontal: ms(1),
  },

  orderDetailStyle: {
    width: SW(30),
  },
  nameTextStyle: {
    fontSize: ms(7),
    textAlign: 'center',
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    marginHorizontal: ms(4),
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input_border,
    paddingHorizontal: ms(4),
    paddingVertical: ms(2),
    borderRadius: ms(10),
    justifyContent: 'center',
  },
  pinImageStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  timeTextStyle: {
    fontSize: SF(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  distanceTextStyle: {
    paddingLeft: 5,
    fontSize: ms(7),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  rightIconStyle: {
    width: ms(24),
    height: ms(24),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  emptyViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextStyle: {
    fontSize: ms(11),
    color: COLORS.navy_light_blue,
    // fontFamily: Fonts.Regular,
    marginBottom: ms(10),
  },
  tableView: {
    zIndex: -99,
    marginTop: ms(5),
    // width:
    //   Platform.OS === 'ios'
    //     ? Dimensions.get('window').width - ms(150)
    //     : Dimensions.get('window').width - ms(175),
  },
  revenueText: {
    fontFamily: Fonts.Regular,
    color: COLORS.light_blue2,
    fontSize: ms(8),
    textAlign: 'center',
    letterSpacing: -1,
  },
  dateTableSetting: {
    // justifyContent: 'center',
    width: ms(70),
    marginLeft: ms(8),
    // flex: 1,
  },
  tableListHeader: {
    borderRadius: 5,
    borderBottomWidth: 0,
    borderColor: 'blue',
  },
  dateTablealignStart: {
    // width: SH(185),
    width: ms(140),
    justifyContent: 'flex-start',
    backgroundColor: 'red',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  revenueDataText: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: SF(12),
  },
});
