import React, { useState } from 'react';
import { ScreenWrapper, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import {
  cashProfile,
  checkArrow,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
} from '@/assets';
import { STARTSELLING } from '@/constants/flatListData';
const windowWidth = Dimensions.get('window').width;

export function DashBoard() {
  const bodyView = () => {
    return (
      <View style={styles.homeScreenCon}>
        <View style={styles.displayRow}>
          <View style={styles.cashProfileCon}>
            {/* <Spacer space={SH(20)} /> */}
            {/* <View style={styles.cashProfilecon}> */}
            <Image source={cashProfile} style={styles.cashProfile} />
            {/* </View> */}
            <Text style={styles.cashierName}>Rebecca R. Russell</Text>
            <Text style={styles.posCashier}>POS Cashier</Text>
            <Text style={styles.cashLabel}>ID : 3579EN</Text>
            <Spacer space={SH(12)} />

            <View style={styles.todaySaleCon}>
              <Text style={styles.todaySale}>
                {strings.dashboard.todaySale}
              </Text>
              <Spacer space={SH(4)} />
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.cashSaleAmount}
                </Text>
                <Text style={styles.cashAmount}>$400.50</Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.cardSaleAmount}
                </Text>
                <Text style={styles.cashAmount}>$400.50</Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.jobrCoinSaleAmount}
                </Text>
                <Text style={styles.cashAmount}>JOBR 400.50</Text>
              </View>
            </View>

            <Spacer space={SH(10)} />
            <View style={styles.todaySaleCon}>
              <Text style={styles.todaySale}>
                {strings.dashboard.cashDrawer}
              </Text>
              <Spacer space={SH(4)} />
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.openBal}
                </Text>
                <Text style={styles.cashAmount}>$400.50</Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.closeBal}
                </Text>
                <Text style={styles.cashAmount}>$400.50</Text>
              </View>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles.profileHrRow}></View>
            <Spacer space={SH(10)} />

            <View style={styles.sessionCon}>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>Today 25 April, 2023</Text>
                <Text style={styles.cashLabel}>11:14:23 AM</Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.logTime}
                </Text>
                <Text style={styles.cashAmount}>11:14:23 AM</Text>
              </View>
              <View style={[styles.displayflex, styles.paddingV]}>
                <Text style={styles.cashLabel}>
                  {strings.dashboard.session}
                </Text>
                <Text style={styles.cashAmount}>1h 3m</Text>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.checkoutButton}>
              {/* <Image source={checkArrow} style={styles.checkArrow} /> */}
              <Text style={[styles.checkoutText]}>
                {strings.dashboard.lockScreen}
              </Text>
            </TouchableOpacity>

            <Spacer space={SH(20)} />
          </View>
          <View style={styles.rightOrderCon}>
            <View style={styles.inputWraper}>
              <View style={styles.displayRow}>
                <View>
                  <Image source={search_light} style={styles.searchStyle} />
                </View>
                <TextInput
                  placeholder={strings.retail.searchProduct}
                  style={styles.searchInput}
                  // value={search}
                  // onChangeText={search => (
                  //   setSearch(search), onChangeFun(search)
                  // )}
                />
              </View>
              <TouchableOpacity>
                <Image source={scn} style={styles.scnStyle} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(20)} />
            <View style={styles.displayflex}>
              {STARTSELLING.map((item, index) => (
                <View style={styles.storeCardCon} key={index}>
                  <Image source={item.image} style={styles.sellingBucket} />
                  <Spacer space={SH(8)} />
                  <Text style={styles.startSelling}>{item.heading}</Text>
                  <Spacer space={SH(4)} />
                  <Text style={styles.scanSer}>{item.subHeading}</Text>
                  <Spacer space={SH(12)} />
                  <View style={styles.arrowBtnCon}>
                    <Image source={sellingArrow} style={styles.sellingArrow} />
                  </View>
                </View>
              ))}
            </View>

            <Spacer space={SH(100)} />
            <View>
              <Text style={{ alignSelf: 'center' }}>In progress</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
