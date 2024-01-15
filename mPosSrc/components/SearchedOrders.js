import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SH, SW } from '@/theme';
import { useSelector } from 'react-redux';
import { Spacer } from './Spacer';
import { Search } from './Search';
import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { getDashboard } from '@/selectors/DashboardSelector';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function SearchedOrders({ style }) {
  const getWallet = useSelector(getDashboard)?.invoiceSearchOrders;

  const userFirstName = getWallet?.order?.user_details?.user_profiles?.firstname;
  const userLastName = getWallet?.order?.user_details?.user_profiles?.lastname;

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );
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
    <View style={[styles.container, style]}>
      <Search />

      <Spacer space={SH(10)} />
      {isLoading && <ActivityIndicator color={COLORS.primary} size={'small'} />}
      <Spacer space={SH(30)} />

      {getWallet?.order ? (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => commonNavigate(MPOS_NAVIGATION.invoice, { data: getWallet })}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.orderIdText}>#{getWallet?.id}</Text>
            <Text style={styles.customerNameText}>{userFirstName + ' ' + userLastName || '-'}</Text>
            {getWallet?.order?.delivery_option !== '3' ? (
              <View style={styles.rowAligned}>
                <Image source={Images.pin} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>{getWallet?.distance ?? '-'}</Text>
              </View>
            ) : (
              <View style={[styles.rowAligned, { justifyContent: 'center' }]}>
                <Text style={styles.nameTextStyle}>{'-'}</Text>
              </View>
            )}
          </View>

          <Spacer horizontal space={SW(5)} />

          <View style={styles.qtyView}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.qtyText}>{getWallet?.order?.total_items}</Text>
              <View style={styles.rowAligned}>
                <Image source={Images.pay} style={styles.pinImageStyle} />
                <Text style={styles.distanceTextStyle}>
                  {getWallet?.order?.payable_amount ?? '-'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.orderDetailStyle}>
            <Text style={styles.customerText}>{'Customer'}</Text>
            <View style={styles.rowAligned}>
              <Image source={Images.clockIcon} style={styles.pinImageStyle} />
              <Text style={styles.customerNameText}>
                {getDeliveryType(getWallet?.order?.delivery_option)}
              </Text>
            </View>
          </View>

          <Spacer horizontal space={SW(10)} />

          <Image source={Images.rightArrow} style={styles.pinImageStyle} />
        </TouchableOpacity>
      ) : (
        <View style={{ alignItems: 'center' }}>
          {!isLoading && <Text style={styles.emptyText}>No Order found</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: ms(15),
  },
  orderIdText: {
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
  customerNameText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(11),
  },
  customerText: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
  },
  qtyText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(11),
    marginLeft: ms(5),
  },
  pinImageStyle: {
    width: SH(14),
    height: SH(14),
    resizeMode: 'contain',
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: ms(15),
    paddingHorizontal: ms(10),
    borderRadius: ms(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyView: {
    alignItems: 'flex-start',
    width: '20%',
  },
  emptyText: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(16),
  },
});
