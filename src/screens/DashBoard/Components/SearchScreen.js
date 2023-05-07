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
  cloth,
  crossBg,
  eraser,
  keyboard,
  pause,
  pay,
  pin,
  rightIcon,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
} from '@/assets';
import {
  STARTSELLING,
  categoryProRowData,
  categoryRowData,
  homeTableData,
} from '@/constants/flatListData';
const windowWidth = Dimensions.get('window').width;

export function SearchScreen({ crossBgHandler }) {
  const categoryListItem = ({ item }) => (
    <View style={styles.categoryArrayCon}>
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </View>
  );
  const categoryProListItem = ({ item }) => (
    <View style={styles.catProArrayCon}>
      <Image source={item.image} style={styles.cloth} />
      <Spacer space={SH(5)} />
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(3)} />
      <Text style={styles.listed}>24 listed</Text>
    </View>
  );
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
              // contentContainerStyle={{
              //   flex: 1,
              //   justifyContent: 'space-between',
              // }}
            />
          </>
        </View>
        <View style={[styles.itemLIistCon, styles.rightSideCon]}>
          <View style={styles.displayflex}>
            <Image source={keyboard} style={styles.keyboard} />
            <View style={styles.holdCartCon}>
              <Image source={pause} style={styles.pause} />
              <Text style={styles.holdCart}>{strings.dashboard.holdCart}</Text>
            </View>
            <View style={[styles.holdCartCon, styles.dark_greyBg]}>
              <Image source={eraser} style={styles.pause} />
              <Text style={styles.holdCart}>{strings.dashboard.clearcart}</Text>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.nameAddCon}></View>
        </View>
      </View>
    </View>
  );
}
