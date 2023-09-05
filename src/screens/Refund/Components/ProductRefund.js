import { CustomHeader } from '@/screens/PosRetail3/Components';
import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';
import { COLORS, SH, SF, SW } from '@/theme';
import {
  checkedCheckbox,
  blankCheckBox,
  checkedCheckboxSquare,
  Fonts,
  categoryshoes,
  minus,
  plus,
  borderCross,
} from '@/assets';
import { ShadowStyles } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import { productList } from '@/constants/flatListData';

const { width, height } = Dimensions.get('window');

const ProductRefund = () => {
  const [applicableIsCheck, setApplicableIsCheck] = useState(false);
  const [applyEachItem, setApplyEachItem] = useState(false);
  const [selectType, setSelectType] = useState('dollar');

  const renderProductItem = ({ item, index }) => (
    <View style={styles.blueListData}>
      <View style={styles.displayflex}>
        <View style={[styles.tableListSide, styles.listLeft]}>
          <Text style={[styles.blueListDataText, styles.cashLabelWhiteHash]}>{index + 1}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image source={categoryshoes} style={styles.columbiaMen} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.blueListDataText, { width: SW(30) }]} numberOfLines={1}>
                {item?.productName}
              </Text>
              <Text style={styles.sukNumber}>{`SKU: 5689076`}</Text>
            </View>
          </View>

          <View style={styles.productCartBody}>
            <Text style={styles.blueListDataText} numberOfLines={1}>
              ${item?.price}
            </Text>
          </View>

          <View style={styles.productCartBody}>
            <Text style={styles.blueListDataText} numberOfLines={1}>
              {'100%'}
            </Text>
          </View>

          <View style={styles.productCartBody}>
            <Text style={styles.blueListDataText} numberOfLines={1}>
              X {item?.quantity}
            </Text>
          </View>

          <View style={styles.productCartBody}>
            <Text style={styles.blueListDataText} numberOfLines={1}>
              {item?.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader iconShow />

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftMainViewStyle}>
          <View style={styles.rowStyle}>
            <View style={styles.applicableViewStyle}>
              {applicableIsCheck ? (
                <TouchableOpacity onPress={() => setApplicableIsCheck(!applicableIsCheck)}>
                  <Image source={checkedCheckboxSquare} style={styles.checkBoxIconStyle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setApplicableIsCheck(!applicableIsCheck)}>
                  <Image source={blankCheckBox} style={styles.checkBoxIconStyle} />
                </TouchableOpacity>
              )}
              <Text style={styles.applicableTextStyle}>{strings.returnOrder.applicable}</Text>
            </View>

            <View style={styles.applicableViewStyle}>
              {applyEachItem ? (
                <TouchableOpacity onPress={() => setApplyEachItem(!applyEachItem)}>
                  <Image source={checkedCheckboxSquare} style={styles.checkBoxIconStyle} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setApplyEachItem(!applyEachItem)}>
                  <Image source={blankCheckBox} style={styles.checkBoxIconStyle} />
                </TouchableOpacity>
              )}
              <Text style={styles.applicableTextStyle}>{strings.returnOrder.applyEachItem}</Text>
            </View>

            <View style={styles.amountTypeView}>
              <TextInput
                keyboardType={'number-pad'}
                style={styles.textInputStyle}
                placeholder={selectType === strings.returnOrder.dollarLabel ? '$ 00.00' : '% 0'}
              />

              <View style={styles.typeViewStyle}>
                <TouchableOpacity
                  onPress={() => setSelectType(strings.returnOrder.dollarLabel)}
                  style={[
                    styles.dollarViewStyle,
                    {
                      backgroundColor:
                        selectType === strings.returnOrder.dollarLabel
                          ? COLORS.gerySkies
                          : COLORS.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.applyRefundButtonText,
                      {
                        color:
                          selectType === strings.returnOrder.dollarLabel
                            ? COLORS.white
                            : COLORS.dark_grey,
                      },
                    ]}
                  >
                    {strings.returnOrder.dollar}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectType(strings.returnOrder.percentageLabel)}
                  style={[
                    styles.dollarViewStyle,
                    {
                      paddingHorizontal: 10,
                      backgroundColor:
                        selectType === strings.returnOrder.percentageLabel
                          ? COLORS.gerySkies
                          : COLORS.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.applyRefundButtonText,
                      {
                        color:
                          selectType === strings.returnOrder.percentageLabel
                            ? COLORS.white
                            : COLORS.dark_grey,
                      },
                    ]}
                  >
                    {strings.returnOrder.percentage}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.applyRefundButton}>
              <Text style={styles.applyRefundButtonText}>{strings.returnOrder.applyRefund}</Text>
            </TouchableOpacity>
          </View>

          <Spacer space={SH(10)} />
          <View style={styles.blueListHeader}>
            <View style={styles.displayflex}>
              <View style={[styles.tableListSide, styles.listLeft]}>
                <Text style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}>#</Text>
                <Text style={styles.cashLabelWhite}>Item</Text>
              </View>
              <View style={styles.productCartBodyRight}>
                <View style={styles.productCartBody}>
                  <Text style={styles.cashLabelWhite}>Unit Price</Text>
                </View>
                <View style={styles.productCartBody}>
                  <Text style={styles.cashLabelWhite}>Refund Amount</Text>
                </View>
                <View style={styles.productCartBody}>
                  <Text style={styles.cashLabelWhite}>Quantity</Text>
                </View>
                <View style={styles.productCartBody}>
                  <Text style={styles.cashLabelWhite}>Line Total</Text>
                </View>
                <View style={styles.productCartBody}></View>
              </View>
            </View>
          </View>

          <FlatList
            data={productList?.splice(0, 5)}
            scrollEnabled
            renderItem={renderProductItem}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    backgroundColor: COLORS.textInputBackground,
  },
  leftMainViewStyle: {
    width: width / 1.8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: height,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: ms(7),
  },
  applicableViewStyle: {
    flexDirection: 'row',
    paddingHorizontal: ms(8),
    alignItems: 'center',
  },
  checkBoxIconStyle: {
    width: scale(8),
    height: scale(8),
    resizeMode: 'contain',
  },
  applicableTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    paddingLeft: ms(1),
    textAlignVertical: 'center',
  },
  typeViewStyle: {
    flexDirection: 'row',
    ...ShadowStyles.shadow2,
    height: SH(34),
  },
  applyRefundButton: {
    backgroundColor: COLORS.gerySkies,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  dollarViewStyle: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyRefundButtonText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  amountTypeView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    flexDirection: 'row',
    width: SH(135),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    width: SH(60),
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.gerySkies,
  },
  blueListHeader: {
    backgroundColor: COLORS.dark_grey,
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableListSide: {
    width: width * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cashLabelWhite: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  cashLabelWhiteHash: {
    paddingHorizontal: moderateScale(15),
  },
  productCartBodyRight: {
    width: Platform.OS === 'android' ? ms(330) : ms(255),
    height: ms(20),
    flexDirection: 'row',
  },
  productCartBody: {
    width: Platform.OS === 'android' ? ms(82) : ms(60),
    height: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueListData: {
    borderWidth: 1,
    height: SH(48),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
    marginHorizontal: 10,
  },
  blueListDataText: {
    color: COLORS.solid_grey,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  columbiaMen: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
  },
});

export default memo(ProductRefund);
