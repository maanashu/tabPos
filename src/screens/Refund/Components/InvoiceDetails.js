import React, { memo } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList } from 'react-native';

import { ms } from 'react-native-size-matters';

import { barcode, Fonts, logo_full } from '@/assets';
import { SH, COLORS } from '@/theme';
import { Spacer } from '@/components';
import { productList } from '@/constants/flatListData';

const { width } = Dimensions.get('window');

const InvoiceDetails = () => {
  const renderProductItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.count}>{index + 1}</Text>
        <View style={{ marginLeft: ms(10) }}>
          <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.productName}
          </Text>
          <View style={styles.belowSubContainer}>
            <Text style={styles.colorsTitle}>{`Color: ${item?.color}   Size: ${item?.size}`}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.priceTitle}>{item?.price}</Text>
    </View>
  );

  return (
    <View style={styles.invoiceMainViewStyle}>
      <Text style={styles.storeNameText}>{'Primark'}</Text>

      <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />
      <Text style={styles.storeAddressText}>{'63 Ivy Road, Hawkville, GA, USA 31036'}</Text>

      <Spacer space={SH(5)} backgroundColor={COLORS.transparent} />
      <Text style={styles.storeAddressText}>{'+123-456-7890'}</Text>

      <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />
      <View style={{ paddingVertical: 8 }}>
        <FlatList
          data={productList.slice(0, 4)}
          renderItem={renderProductItem}
          extraData={productList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        />
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>Discount</Text>
        <Text style={styles._subTotalPrice}>${'0.00'}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>Tips</Text>
        <Text style={styles._subTotalPrice}>${'123'}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={styles._substotalTile}>Total Taxes</Text>
        <Text style={styles._subTotalPrice}>${'0.00'}</Text>
      </View>

      <View style={styles._horizontalLine} />

      <View style={styles._subTotalContainer}>
        <Text style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
          Total
        </Text>
        <Text style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}>
          $7001.20
        </Text>
      </View>

      <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

      <View style={styles._paymentTitleContainer}>
        <Text style={styles._payTitle}>Payment option: </Text>
        <Text style={styles._paySubTitle}>{'Cash'}</Text>
      </View>

      <Text style={styles._commonPayTitle}>{'Wed 26 Apr , 2023 6:27 AM'}</Text>
      <Text style={styles._commonPayTitle}>Walk-In</Text>
      <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
      <Text style={styles._commonPayTitle}>POS No. #Front-CC01</Text>
      <Text style={styles._commonPayTitle}>User ID : ****128</Text>

      <Text style={styles._thankyou}>Thank You</Text>
      <Image source={barcode} style={styles._barCodeImage} />
      <Image source={logo_full} style={styles.logoFull} />
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceMainViewStyle: {
    paddingHorizontal: ms(10),
    paddingVertical: ms(15),
  },
  storeNameText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7),
    textAlign: 'center',
  },
  storeAddressText: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    textAlign: 'center',
  },
  container: {
    borderColor: COLORS.washGrey,
    borderWidth: 1,
    paddingHorizontal: ms(8),
    height: ms(28),
    borderRadius: ms(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginTop: ms(5),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(5),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
  },
  colorsTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
  },
  priceTitle: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  _subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  _substotalTile: {
    color: COLORS.black,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(5),
  },
  _subTotalPrice: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(5.5),
    marginTop: ms(7),
  },
  _horizontalLine: {
    height: ms(1),
    width: '90%',
    marginTop: ms(4),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  _paymentTitleContainer: {
    marginTop: ms(5),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: ms(15),
  },
  _payTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
  },
  _paySubTitle: {
    fontSize: ms(7),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
  },
  _commonPayTitle: {
    alignSelf: 'flex-start',
    marginLeft: ms(15),
    marginTop: ms(3),
    fontSize: ms(7),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  _barCodeImage: {
    height: ms(25),
    width: '70%',
    marginTop: ms(5),
    alignSelf: 'center',
  },
  _thankyou: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(10),
    textAlign: 'center',
  },
  logoFull: {
    width: ms(90),
    height: ms(30),
    resizeMode: 'contain',
    marginTop: ms(2),
    alignSelf: 'center',
  },
});

export default memo(InvoiceDetails);
