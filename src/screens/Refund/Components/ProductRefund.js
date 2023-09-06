import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { productList } from '@/constants/flatListData';
import { COLORS, SH, SF, SW, ShadowStyles } from '@/theme';
import { CustomHeader } from '@/screens/PosRetail3/Components';
import {
  blankCheckBox,
  checkedCheckboxSquare,
  Fonts,
  categoryshoes,
  sellingArrow,
  PaymentDone,
} from '@/assets';
import PaymentSelection from './PaymentSelection';

const { width, height } = Dimensions.get('window');

const ProductRefund = ({ backHandler }) => {
  const [amount, setAmount] = useState('');
  const [applicableIsCheck, setApplicableIsCheck] = useState(false);
  const [applyEachItem, setApplyEachItem] = useState(false);
  const [selectType, setSelectType] = useState('dollar');
  const [buttonText, setButtonText] = useState('Apply Refund ');
  const [changeView, setChangeView] = useState('TotalItems');

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

  const applyRefundHandler = () => {
    if (applicableIsCheck && applyEachItem && amount) {
      setButtonText('Applied');
    }
  };

  return (
    <View style={styles.container}>
      {changeView === 'TotalItems' ? (
        <>
          <CustomHeader iconShow crossHandler={backHandler} />

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
                  <Text style={styles.applicableTextStyle}>
                    {strings.returnOrder.applyEachItem}
                  </Text>
                </View>

                <View style={styles.amountTypeView}>
                  <TextInput
                    value={amount}
                    keyboardType={'number-pad'}
                    style={styles.textInputStyle}
                    onChangeText={(text) => setAmount(text)}
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
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
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
                          borderTopRightRadius: 5,
                          borderBottomRightRadius: 5,
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

                {buttonText === 'Applied' ? (
                  <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                    <Image
                      source={PaymentDone}
                      style={[styles.checkBoxIconStyle, { tintColor: COLORS.primary }]}
                    />
                    <Text style={[styles.applyRefundButtonText, { color: COLORS.primary }]}>
                      {'Applied'}
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => applyRefundHandler()}
                    style={[
                      styles.applyRefundButton,
                      {
                        backgroundColor:
                          applicableIsCheck || applyEachItem || amount
                            ? COLORS.primary
                            : COLORS.gerySkies,
                      },
                    ]}
                  >
                    <Text style={styles.applyRefundButtonText}>
                      {strings.returnOrder.applyRefund}
                    </Text>
                  </TouchableOpacity>
                )}
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
                scrollEnabled
                renderItem={renderProductItem}
                data={productList}
                extraData={productList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>

            <View style={styles.billAmountViewStyle}>
              <Text style={styles.totalItemsText}>{'Total Refund Items: 4'}</Text>

              <Spacer space={SH(10)} />

              <View style={styles.totalViewStyle}>
                <Text style={styles.subTotalText}>{'Sub Total'}</Text>
                <Text style={styles.subTotalPrice}>{'$5.65'}</Text>
              </View>

              <Spacer space={SH(10)} />

              <View style={styles.totalViewStyle}>
                <Text style={styles.subTotalText}>{'Total Taxes'}</Text>
                <Text style={styles.subTotalPrice}>{'$0.35'}</Text>
              </View>

              <Spacer space={SH(10)} />

              <View style={styles.totalViewStyle}>
                <Text style={[styles.subTotalText, { fontFamily: Fonts.MaisonBold }]}>
                  {'Item value'}
                </Text>
                <Text style={[styles.subTotalPrice, { fontFamily: Fonts.MaisonBold }]}>
                  {'$6.70'}
                </Text>
              </View>

              <Spacer space={SH(20)} />

              <TouchableOpacity
                onPress={() => setChangeView('Payment')}
                disabled={buttonText === 'Applied' ? false : true}
                style={[
                  styles.nextButtonStyle,
                  { backgroundColor: buttonText === 'Applied' ? COLORS.primary : COLORS.gerySkies },
                ]}
              >
                <Text style={styles.nextTextStyle}>{'Next'}</Text>
                <Image source={sellingArrow} style={styles.arrowIconStyle} />
              </TouchableOpacity>

              <Spacer space={SH(20)} />
            </View>
          </View>
        </>
      ) : (
        <PaymentSelection backHandler={() => setChangeView('TotalItems')} />
      )}
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
    width: scale(6),
    height: scale(6),
    resizeMode: 'contain',
  },
  applicableTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
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
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    height: SH(28),
    alignSelf: 'center',
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
    // width: SH(135),
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
  totalItemsText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
    fontSize: SF(18),
  },
  arrowIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
    marginLeft: 10,
  },
  subTotalText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.dark_grey,
    fontSize: SF(16),
  },
  subTotalPrice: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.black,
    fontSize: SF(16),
  },
  nextButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: scale(25),
    borderRadius: 5,
    backgroundColor: COLORS.gerySkies,
  },
  nextTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  totalViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billAmountViewStyle: {
    justifyContent: 'flex-end',
    paddingBottom: 100,
    flex: 1,
    paddingHorizontal: 50,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});

export default memo(ProductRefund);
