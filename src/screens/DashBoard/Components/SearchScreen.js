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
  Phone_light,
  addDiscountPic,
  cashProfile,
  checkArrow,
  clock,
  cloth,
  crossBg,
  email,
  eraser,
  keyboard,
  location,
  lockLight,
  ok,
  pause,
  pay,
  pin,
  rightIcon,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
  terryProfile,
} from '@/assets';
import {
  STARTSELLING,
  categoryProRowData,
  categoryRowData,
  homeTableData,
} from '@/constants/flatListData';
import { Categories } from './Categories';
const windowWidth = Dimensions.get('window').width;

export function SearchScreen({ crossBgHandler }) {
  const [openCategories, SetOpenCategories] = useState(false);
  const categoryListItem = ({ item }) => (
    <View style={styles.categoryArrayCon}>
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </View>
  );
  const categoryProListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.catProArrayCon}
      onPress={() => {
        SetOpenCategories(true);
      }}
    >
      <Image source={item.image} style={styles.cloth} />
      <Spacer space={SH(5)} />
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(3)} />
      <Text style={styles.listed}>24 listed</Text>
    </TouchableOpacity>
  );

  const bodyView = () => {
    if (openCategories) {
      return (
        <View>
          <Categories crossBgHandler={() => SetOpenCategories(false)} />
        </View>
      );
    } else {
      return (
        <View style={[styles.homeScreenCon, styles.backgroundColorSCreen]}>
          <View style={styles.searchScreenHeader}>
            <View style={styles.displayflex}>
              <Text style={styles.cashLabelBold}>Wed 26 Apr , 2023</Text>
              <Text style={styles.cashLabelBold}>Walk-In</Text>
              <Text style={styles.cashLabelBold}>Invoice No. # 3467589</Text>
              <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
              <TouchableOpacity onPress={crossBgHandler}>
                <Image source={crossBg} style={styles.crossBg} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.displayflex2}>
            <View style={styles.itemLIistCon}>
              <View style={styles.inputWraper2}>
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
              <Spacer space={SH(10)} />
              {/* <View style={styles.blueListHeader}>
            <View style={styles.displayflex}>
              <View style={[styles.tableListSide, styles.listLeft]}>
                <Text
                  style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}
                >
                  #
                </Text>
                <Text style={styles.cashLabelWhite}>Item</Text>
              </View>
              <View style={[styles.tableListSide, styles.tableListSide2]}>
                <Text style={styles.cashLabelWhite}>Unit Price</Text>
                <Text style={styles.cashLabelWhite}>Quantity</Text>
                <Text style={styles.cashLabelWhite}>Line Total</Text>
                <Text>{null}</Text>
              </View>
            </View>
          </View> */}
              <View>
                <FlatList
                  data={categoryRowData}
                  extraData={categoryRowData}
                  renderItem={categoryListItem}
                  keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                />
              </View>
              <Spacer space={SH(10)} />
              <View
                style={{ borderWidth: 1, borderColor: COLORS.solidGrey }}
              ></View>

              {/* <Spacer space={SH(10)} /> */}
              <>
                <FlatList
                  data={categoryProRowData}
                  extraData={categoryProRowData}
                  renderItem={categoryProListItem}
                  keyExtractor={item => item.id}
                  numColumns={4}
                />
              </>
            </View>
            <View style={[styles.itemLIistCon, styles.rightSideCon]}>
              <View style={styles.displayflex}>
                <Image source={keyboard} style={styles.keyboard} />
                <View style={styles.holdCartCon}>
                  <Image source={pause} style={styles.pause} />
                  <Text style={styles.holdCart}>
                    {strings.dashboard.holdCart}
                  </Text>
                </View>
                <View style={[styles.holdCartCon, styles.dark_greyBg]}>
                  <Image source={eraser} style={styles.pause} />
                  <Text style={styles.holdCart}>
                    {strings.dashboard.clearcart}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.nameAddCon}>
                <View style={styles.sideBarInputWraper}>
                  <View style={styles.displayRow}>
                    <View>
                      <Image
                        source={search_light}
                        style={styles.sideSearchStyle}
                      />
                    </View>
                    <TextInput
                      placeholder="803-238-2630"
                      style={styles.sideBarsearchInput}
                      keyboardType="numeric"
                      // value={search}
                      // onChangeText={search => (
                      //   setSearch(search), onChangeFun(search)
                      // )}
                      placeholderTextColor={COLORS.solid_grey}
                    />
                  </View>
                </View>
                <View style={styles.nameAddSingleCon}>
                  <View style={styles.displayRow}>
                    <Image source={terryProfile} style={styles.Phonelight} />
                    <Text style={styles.terryText}>Terry Moore</Text>
                  </View>
                </View>
                <View style={styles.nameAddSingleCon}>
                  <View style={styles.displayRow}>
                    <Image source={Phone_light} style={styles.Phonelight} />
                    <Text style={styles.terryText}>803-238-2630</Text>
                  </View>
                </View>
                <View style={styles.nameAddSingleCon}>
                  <View style={styles.displayRow}>
                    <Image source={email} style={styles.Phonelight} />
                    <Text style={styles.terryText}>
                      mailto:harryrady@jourrapide.com
                    </Text>
                  </View>
                </View>
                <View style={styles.nameAddSingleCon}>
                  <View style={styles.displayRow}>
                    <Image source={location} style={styles.Phonelight} />
                    <Text style={styles.terryText}>
                      4849 Owagner Lane Seattle, WA 98101
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.okButtonCon}>
                  <Image source={ok} style={styles.lockLight} />
                  <Text style={[styles.okText]}>{strings.dashboard.ok}</Text>
                </TouchableOpacity>
              </View>
              <Spacer space={SH(10)} />

              <View style={styles.displayflex}>
                <View style={styles.addDiscountCon}>
                  <Image
                    source={addDiscountPic}
                    style={styles.addDiscountPic}
                  />
                  <Text style={styles.addDiscountText}>Add Discount</Text>
                </View>
                <View style={styles.addDiscountCon}>
                  <Image
                    source={addDiscountPic}
                    style={styles.addDiscountPic}
                  />
                  <Text style={styles.addDiscountText}>Add Notes</Text>
                </View>
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
