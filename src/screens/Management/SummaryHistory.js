import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { styles } from './Management.styles';
import { Spacer } from '@/components';

export function SummaryHistory({ historyHeader }) {
  return (
    <View style={historyHeader ? styles.bodyContainer : styles.bodyContainer2}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer space={SH(20)} />
        <Text style={styles.allCashText}>{strings.management.allCash}</Text>
        <View>
          <View style={styles.totalCashHeader}>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCashIn}
            </Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
            </Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.sale}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.manual}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>

          <View style={styles.totalCashHeader}>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCashOut}
            </Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
            </Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.deliveryCharge}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.shippingCharge}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.refund}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.totalCashData}>
            <Text style={styles.sectionListData}>
              {strings.management.manual}
            </Text>
            <Text style={styles.sectionListData}>{strings.management.usd}</Text>
          </View>
          <View style={styles.netPaymentHeader}>
            <Text style={styles.sectionListHeader}>
              {strings.management.netPayment}
            </Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCash}
            </Text>
          </View>
          <Spacer space={SH(60)} />
          <Text style={styles.cashActivity}>
            {strings.management.cashActivity}
          </Text>
          <Spacer space={SH(20)} />
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.endTrackingSession}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.leftDrawer}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.removeCash}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.removeusd}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.countCash}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.usd}
              </Text>
            </View>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityRedText}>
                {strings.management.discrepancy}
              </Text>
              <Text style={styles.cashActivityRedText}>
                {strings.management.removeusd}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text
                style={[
                  styles.cashActivityDarkText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.removeCash}
              </Text>
              <Text
                style={[
                  styles.cashActivityDarkText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.removeusd}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text
                style={[
                  styles.cashActivityLightText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.allein}
              </Text>
              <Text
                style={[
                  styles.cashActivityLightText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.dateTime}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text
                style={[
                  styles.cashActivityLightText,
                  { color: COLORS.darkGray },
                ]}
              >
                {strings.management.breakFast}
              </Text>
            </View>
          </View>
          <View style={styles.cashActivityCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.startTrackingSession}
              </Text>
              <Text style={styles.cashActivityDarkText}>
                {strings.management.amountCount}
              </Text>
            </View>
            <Spacer space={SH(4)} />
            <View style={styles.displayFlex}>
              <Text style={styles.cashActivityLightText}>
                {strings.management.allein}
              </Text>
              <Text style={styles.cashActivityLightText}>
                {strings.management.dateTime}
              </Text>
            </View>
          </View>
          <Spacer space={SH(50)} />
        </View>
      </ScrollView>
    </View>
  );
}
