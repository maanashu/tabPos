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
  homeMenu,
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
const windowWidth = Dimensions.get('window').width;

export function Categories({ crossBgHandler }) {
  const categoryListItem = ({ item }) => (
    <View style={styles.categoryArrayCon}>
      <Text style={styles.categories}>{item.name}</Text>
      <Spacer space={SH(2)} />
      <Text style={styles.listed}>13 listed</Text>
    </View>
  );
  const categoryProListItem = ({ item, index }) => (
    <View
      style={{
        marginRight:
          index === 0
            ? SH(-10)
            : index === categoryProRowData.length - 1
            ? SH(10)
            : SH(-15),

        borderRadius: 100 / 2,
        zIndex: 100,
        backgroundColor: 'white',
      }}
    >
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.tabCont,
          //   {
          //     backgroundColor:
          //       item.id === selectedId ? COLORS.white : COLORS.inputBorder,
          //     borderColor:
          //       item.id === selectedId ? COLORS.primary : COLORS.inputBorder,
          //   },
        ]}
      >
        {index === 0 ? (
          <Image
            source={homeMenu}
            style={{ width: SH(50), height: SH(50), marginTop: SH(6) }}
          />
        ) : null}
        <Image
          source={item.image}
          resizeMode="cover"
          style={[styles.tabimg, { borderRadius: 20 }]}
        />
        <Text
          style={[
            styles.subName,
            {
              fontSize: SF(12),
              //  color: item.id === selectedId ? COLORS.primary : COLORS.black,
              paddingHorizontal: 10,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
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

          <Spacer space={SH(10)} />
          <View style={{}}>
            <FlatList
              data={categoryProRowData}
              extraData={categoryProRowData}
              renderItem={categoryProListItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
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
          <View style={styles.nameAddCon}>
            <View style={styles.sideBarInputWraper}>
              <View style={styles.displayRow}>
                <View>
                  <Image source={search_light} style={styles.sideSearchStyle} />
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
              <Image source={addDiscountPic} style={styles.addDiscountPic} />
              <Text style={styles.addDiscountText}>Add Discount</Text>
            </View>
            <View style={styles.addDiscountCon}>
              <Image source={addDiscountPic} style={styles.addDiscountPic} />
              <Text style={styles.addDiscountText}>Add Notes</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
