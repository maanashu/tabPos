import React, { useState } from 'react';
import { ScreenWrapper, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
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
  clock,
  lockLight,
  pay,
  pin,
  rightIcon,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
} from '@/assets';
import { STARTSELLING, homeTableData } from '@/constants/flatListData';
import { SearchScreen } from './Components';
import { logoutFunction } from '@/actions/AuthActions';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;

export function DashBoard() {
  const dispatch = useDispatch();
  const [searchScreen, setSearchScreen] = useState(false);

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutFunction());
          // dispatch(logoutUserFunction());
        },
      },
    ]);
  };
  const tableListItem = () => (
    <TouchableOpacity style={[styles.reviewRenderView]}>
      <View style={{ width: SW(20) }}>
        <Text style={styles.hashNumber}>#7869YZ</Text>
      </View>
      <View style={{ width: SW(45) }}>
        <Text numberOfLines={1} style={styles.nameText}>
          Rebecca R. Russell
        </Text>
        <View style={styles.timeView}>
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>2.5 miles</Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>3 items</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>$489.50</Text>
        </View>
      </View>

      <View style={{ width: SW(50) }}>
        <Text style={[styles.nameText, styles.nameTextBold]}>
          Express delivery
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>2.00 PM - 3.00 PM</Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <View style={styles.timeView}>
          <Text style={[styles.nameTextBold, styles.timeSec]}>00:03:56</Text>
          <Image source={rightIcon} style={styles.pinIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const bodyView = () => {
    if (searchScreen) {
      return (
        <View>
          <SearchScreen crossBgHandler={() => setSearchScreen(false)} />
        </View>
      );
    } else {
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
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => logoutHandler()}
              >
                <View style={styles.displayRow}>
                  <Image source={lockLight} style={styles.lockLight} />
                  <Text style={[styles.checkoutText]}>
                    {strings.dashboard.lockScreen}
                  </Text>
                </View>
              </TouchableOpacity>

              <Spacer space={SH(10)} />
            </View>
            <View style={styles.rightOrderCon}>
              <TouchableOpacity
                style={styles.inputWraper}
                onPress={() => setSearchScreen(true)}
              >
                <View style={styles.displayRow}>
                  <View>
                    <Image source={search_light} style={styles.searchStyle} />
                  </View>
                  <TextInput
                    placeholder={strings.retail.searchProduct}
                    style={styles.searchInput}
                    editable={false}
                    // value={search}
                    // onChangeText={search => (
                    //   setSearch(search), onChangeFun(search)
                    // )}
                  />
                </View>
                <TouchableOpacity>
                  <Image source={scn} style={styles.scnStyle} />
                </TouchableOpacity>
              </TouchableOpacity>
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
                      <Image
                        source={sellingArrow}
                        style={styles.sellingArrow}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <Spacer space={SH(20)} />

              <View style={styles.homeTableCon}>
                <Text style={styles.deliveries}>
                  {strings.dashboard.deliveries}
                </Text>
                <FlatList
                  data={homeTableData}
                  extraData={homeTableData}
                  renderItem={tableListItem}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
