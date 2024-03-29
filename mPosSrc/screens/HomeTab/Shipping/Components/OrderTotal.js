import React, { memo } from 'react';
import { View, Text } from 'react-native';

import dayjs from 'dayjs';

import { SF, SH } from '@/theme';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import ButtonComponent from './ButtonComponent';

import styles from '../Orders/styles';
import moment from 'moment';
import { amountFormat } from '@/utils/GlobalMethods';

const OrderTotal = ({ orderData, onPressDeclineHandler, onPressAcceptHandler }) => {
  return (
    <View style={styles.billViewStyle}>
      <Text style={styles.totalItemsStyles}>
        {`${strings.delivery.totalItems} ${
          orderData?.order_details?.length > 1
            ? `${orderData?.order_details?.length}`
            : `${orderData?.order_details?.length}`
        }`}
      </Text>

      <View style={styles.horizontalLineStyle} />

      <Spacer space={SH(10)} />

      <View style={styles.orderDetailView}>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.orderDate}</Text>
          {/* <Text style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}>{`${dayjs(
            orderData?.date
          ).format('DD/MM/YYYY')}`}</Text> */}

          <Text style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}>{`${moment
            .utc(orderData?.date)
            .format('DD/MM/YYYY')}`}</Text>
        </View>

        <View>
          <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.invoiceNumber}</Text>
          <Text style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}>
            {/* {`#${orderData?.id}`} */}
            {'#'}
            {orderData?.return_detail
              ? orderData?.return_detail?.invoices?.invoice_number
              : orderData?.invoices?.invoice_number ?? '-'}
          </Text>
        </View>
      </View>

      <View style={styles.horizontalLineStyle} />

      <Spacer space={SH(15)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.subTotal}</Text>
        <Text style={styles.priceValueText}>{`$${orderData?.actual_amount}`}</Text>
      </View>

      <Spacer space={SH(4)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.totalTax}</Text>
        <Text style={styles.priceValueText}>{`$${orderData?.tax}`}</Text>
      </View>

      <Spacer space={SH(4)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.tip}</Text>
        <Text style={styles.priceValueText}>{`$${orderData?.tips}`}</Text>
      </View>
      <Spacer space={SH(4)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.discount}</Text>
        <Text style={styles.priceValueText}>{`$${
          orderData?.discount == null ? 0 : orderData?.discount
        }`}</Text>
      </View>

      <Spacer space={SH(4)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.labelTextStyle}>{strings.delivery.shippingCharges}</Text>
        <Text style={styles.priceValueText}>{`$${orderData?.shipping_charge}`}</Text>
      </View>

      <Spacer space={SH(10)} />

      <View style={styles.dashedHorizontalLine} />

      <Spacer space={SH(15)} />

      <View style={styles.amountViewStyle}>
        <Text style={styles.totalValueText}>{strings.delivery.total}</Text>
        <Text style={styles.totalValueText}>{`$${amountFormat(
          orderData?.payable_amount,
          true
        )}`}</Text>
      </View>

      <Spacer space={SH(15)} />

      <ButtonComponent
        status={orderData?.status}
        orderId={orderData?.id}
        declineHandler={onPressDeclineHandler}
        onPressHandler={onPressAcceptHandler}
      />
    </View>
  );
};

export default memo(OrderTotal);
