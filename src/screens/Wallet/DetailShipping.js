import React from 'react';
import { Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { COLORS, SH } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {
  angela,
  checkArrow,
  crossButton,
  deliverCheck,
  Fonts,
  leftBack,
  orderCigrate,
  track,
  willis,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from './Wallet.styles';
import { Table } from 'react-native-table-component';

export function DetailShipping({ shippingDeliverRemoveHandler }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Spacer space={SH(10)} />
      <View style={styles.onlinedeliveryCon}>
        <View style={[styles.displayFlex]}>
          <View style={styles.flexAlign}>
            <TouchableOpacity onPress={shippingDeliverRemoveHandler}>
              <Image source={leftBack} style={styles.leftBackStyle} />
            </TouchableOpacity>
            <Text style={styles.orderNoStyle}>{strings.wallet.orderNo}</Text>
            <View style={styles.completedButton}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          </View>
          <TouchableOpacity onPress={shippingDeliverRemoveHandler}>
            <Image source={crossButton} style={styles.leftBackStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Spacer space={SH(15)} />
        <View style={styles.onlinedeliveryBody}>
          <View style={styles.displayFlex}>
            <View style={styles.buyerCon}>
              <Spacer space={SH(5)} />
              <Text style={styles.buyer}>{strings.wallet.buyer}</Text>
              <Spacer space={SH(8)} />
              <View style={{ flexDirection: 'row' }}>
                <Image source={angela} style={styles.angelaPic} />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.angela}>{strings.wallet.angela}</Text>
                  <Spacer space={SH(10)} />
                  <Text style={styles.angelaAddress}>
                    {strings.wallet.angelaAddress1}
                  </Text>
                  <Text style={styles.angelaAddress}>
                    {strings.wallet.angelaAddress2}
                  </Text>
                </View>
              </View>

              <Spacer space={SH(20)} />
            </View>
            <View style={styles.invoiceCon}>
              <Spacer space={SH(5)} />
              <Text style={styles.invoiceDetail}>
                {strings.wallet.invoiceDetails}
              </Text>
              <Spacer space={SH(6)} />
              <Text style={styles.invoiceId}>
                {strings.wallet.invoiceIdLabel}{' '}
                <Text style={{ color: COLORS.solid_grey }}>
                  {strings.wallet.invoiceId}
                </Text>
              </Text>
              <Spacer space={SH(4)} />
              <Text style={styles.invoiceId}>
                {strings.wallet.createDateLabel}{' '}
                <Text style={{ color: COLORS.solid_grey }}>
                  {strings.wallet.createDate}
                </Text>
              </Text>
              <Spacer space={SH(4)} />
              <Text style={styles.invoiceId}>
                {strings.wallet.dueDateLabel}{' '}
                <Text style={{ color: COLORS.solid_grey }}>
                  {strings.wallet.createDate}
                </Text>
              </Text>
              <Spacer space={SH(4)} />
              <Text style={styles.deliveryDate}>
                {strings.wallet.deliveryDate}{' '}
                <Text>{strings.wallet.createDate}</Text>
              </Text>
              <View style={styles.pointCon}>
                <Text style={styles.pointText}>{strings.wallet.point}</Text>
              </View>
            </View>
          </View>
          <Spacer space={SH(15)} />
          <View style={styles.tableContainer}>
            <Table>
              <View style={styles.tableDataHeaderCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextHeaFirst}>#</Text>
                    <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>
                      Descriptions
                    </Text>
                  </View>
                  <View style={styles.tableHeaderRightOrder}>
                    <Text style={styles.tableTextHea}>No. of Items</Text>
                    <Text style={styles.tableTextHea}>Rate</Text>
                    <Text style={[styles.tableTextHea, { marginRight: -35 }]}>
                      Amount
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableDataCon}>
                <View style={styles.displayFlex}>
                  <View style={styles.tableHeaderLeft}>
                    <Text style={styles.tableTextDataFirst}>1</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                      <Image
                        source={orderCigrate}
                        style={styles.orderCigrate}
                      />
                      <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                        <Text style={styles.tableTextData}>Ashton Classic</Text>
                        <Text
                          style={[
                            styles.tableTextData,
                            { color: COLORS.gerySkies },
                          ]}
                        >
                          Box of 25
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableHeaderRightOrder}>
                    <Text style={styles.tableTextData}>2565916565..</Text>
                    <Text style={styles.tableTextData}>Sales</Text>
                    <Text style={[styles.tableTextData, { marginRight: -35 }]}>
                      JBR{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </Table>

            <Spacer space={SH(15)} />
            <View
              style={[
                styles.displayFlex,
                { marginHorizontal: moderateScale(10) },
              ]}
            >
              <TextInput
                multiline
                editable={false}
                numberOfLines={4}
                style={styles.textInputStyle}
                placeholder="Note:"
                placeholderTextColor="#000"
              />
              <View style={styles.noteContainer}>
                <Spacer space={SH(5)} />
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.subtotal}
                  </Text>
                  <Text style={styles.tablesubTotalText}>
                    {strings.wallet.subtotalPrice}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.serviceCharge}
                  </Text>
                  <Text style={styles.tablesubTotalText}>
                    {strings.wallet.subtotalPrice}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.discount}
                  </Text>
                  <Text
                    style={[
                      styles.tablesubTotalText,
                      { color: COLORS.roseRed },
                    ]}
                  >
                    {strings.wallet.subtotalPrice}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <Text style={styles.tablesubTotalLabel}>
                    {strings.wallet.shippingCharge}
                  </Text>
                  <Text style={styles.tablesubTotalText}>
                    {strings.wallet.subtotalPrice}
                  </Text>
                </View>
                <View style={styles.subtotalHr}></View>
                <View style={styles.tablesubTotal}>
                  <View style={styles.flexAlign}>
                    <Text
                      style={[
                        styles.tablesubTotalLabel,
                        { fontFamily: Fonts.SemiBold },
                      ]}
                    >
                      {strings.wallet.total}
                    </Text>
                    <View style={styles.paidContainer}>
                      <Text style={styles.paidText}>{strings.wallet.paid}</Text>
                    </View>
                  </View>
                  <Text style={styles.tablesubTotalText}>
                    {strings.wallet.subtotalPrice}
                  </Text>
                </View>
                <Spacer space={SH(5)} />
              </View>
            </View>
            <Spacer space={SH(20)} />
          </View>
          <Spacer space={SH(5)} />
          <View>
            <Text style={styles.shippingDetail}>
              {strings.wallet.shippingDetail}
            </Text>
          </View>
          <Spacer space={SH(5)} />
          <View style={styles.trackingCon}>
            <View style={styles.displayFlex}>
              <View style={styles.flexAlign}>
                <Image source={willis} style={styles.willis} />
                <View>
                  <Text style={styles.willisName}>{strings.wallet.willis}</Text>
                  <Text style={styles.trackingNumber}>
                    {strings.wallet.trackingNo}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={[
                    styles.deliverBtnCon,
                    { marginHorizontal: moderateScale(8) },
                  ]}
                >
                  <View style={styles.deliverTextCon}>
                    <Image source={deliverCheck} style={styles.deliveryCheck} />
                    <Text style={styles.deliveredText}>
                      {strings.wallet.delivered}
                    </Text>
                  </View>
                </View>
                <View style={[styles.deliverBtnCon, styles.trackingBtnCon]}>
                  <View style={styles.deliverTextCon}>
                    <Image source={track} style={styles.deliveryCheck} />
                    <Text style={styles.deliveredText}>
                      {strings.wallet.tracking}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Spacer space={SH(20)} />
        </View>
      </View>
    </View>
  );
}
