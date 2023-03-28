import React, { useState } from 'react';
import { FlatList, Image, Text, View , TouchableOpacity} from 'react-native';
import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { styles } from '@/screens/ShippingOrder/ShippingOrder.styles';
import { deliveryScooter, Fonts, radioRound, ups2, userImage } from '@/assets';
import { Spacer } from '@/components';
import { moderateScale } from 'react-native-size-matters';

export function BottomSheet({ subTotal, tax, total, item, discount }) {
  return (
    <View>
      <View style={styles.rowView}>
        <Text style={styles.subTotal}>{strings.deliveryOrders.subTotal}</Text>
        <Text style={styles.subTotalValue}>${subTotal}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
          {strings.deliveryOrders.discount}
        </Text>
        <Text style={styles.discountValue}>-${discount}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
          {strings.deliveryOrders.tax}
        </Text>
        <Text style={styles.discountValue}>${tax}</Text>
      </View>
      <View style={styles.subtotalRow} />
      <View style={styles.rowView}>
        <Text style={styles.totalLabel}>{strings.deliveryOrders.total}</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={styles.discountValue}>
          {item} {strings.deliveryOrders.items}
        </Text>
      </View>
    </View>
  );
};


export function PrintScreenUI ({orderDate, orderId, userProfile, selectAndConHandler, firstName,shipingType,address, customerProduct,renderProductList,itemss, custProLength,selectShippingList}) {
  const [selectedShipId, setSelectedShipId] = useState();
 
  const SelectShipingItem = ({ item, index, onPress, borderColor, tintColor }) => (
    <TouchableOpacity style={[styles.selectShipingCon, {borderColor}]} onPress={onPress}>
    <View style={[styles.displayFlex]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={radioRound} style={[styles.radioRound, {tintColor}]} />
        <View style={styles.shipingRadioBtn}>
          <Image source={ups2} style={styles.ups2} />
          <View style={{ paddingHorizontal: moderateScale(5) }}>
            <Text style={styles.shipingRate}>{item.heading}</Text>
            <Text style={styles.shipingRateSubHead}>{item.subHeading}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.shipingRate}>{item.price}</Text>
    </View>
  </TouchableOpacity>
  );
  
  const selectShipingRender = ({ item, index}) => {
    const borderColor = item.id === selectedShipId ? COLORS.primary : COLORS.solidGrey;
    const tintColor = item.id === selectedShipId ? COLORS.primary : COLORS.solidGrey
    return (
      <SelectShipingItem
        item={item}
        index={index}
        onPress={() => setSelectedShipId(selectedShipId === item.id ? null : item.id)}
        borderColor={borderColor}
        tintColor={tintColor}
      />
    );
};
  
  
  return(
    <View>
    <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
      <View
        style={[
          styles.orderDetailView,
          styles.orderDetailView2,
        ]}>
        <Spacer space={SH(20)} />
        <View style={styles.reviewHeadingView}>
          <Text style={styles.orderReviewText}>
            {strings.deliveryOrders.orderId}{orderId}
          </Text>
          <Text style={styles.orderReviewText}>
            {orderDate}
          </Text>
        </View>

        <View style={styles.profileDetailView}>
          <View style={{ flexDirection: 'row' }}>
            <Image  source={userProfile}
               style={styles.profileImage} />
            <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
              <Text
                style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}
              >
               {firstName}
              </Text>
              <Text style={[styles.timeText, { paddingLeft: 0 }]}>
              {address}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Image source={deliveryScooter} style={styles.profileImage} />
            <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
              <Text
                style={[
                  styles.nameText,
                  { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                ]}
              >
               {shipingType}
              </Text>
              <Text style={styles.timeText}>
                {strings.deliveryOrders.time}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <View style={{ height: SH(340) }}>
        <FlatList
          data={customerProduct}
          extraData={customerProduct}
          renderItem={renderProductList}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorView} />
          )}
        />
        </View>

        <View style={[styles.bottomSheet, styles.bottomSheet2]}>
          <View style={styles.borderSheetBorder}/>
          <BottomSheet
          discount={itemss?.discount ? itemss?.discount : '0'}
          subTotal={itemss?.actual_amount ? itemss?.actual_amount : '0'}
          tax={itemss?.tax ? itemss?.tax : '0'}
          total={itemss?.payable_amount}
          item={custProLength ? custProLength : '0'}
        />
          <Spacer SH={SH(30)} />
        </View>
      </View>
      <View style={styles.selectShipingRightView}>
        <Spacer space={SH(20)} />
        <Text style={styles.orderReviewText}>
          {strings.deliveryOrders.selectShip}
        </Text>
        <Spacer space={SH(20)} />
        <FlatList
           data={selectShippingList}
           keyExtractor={item => item.id}
          renderItem={selectShipingRender}
           />
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity style={styles.printButtonCon} onPress={selectAndConHandler}>
          <Text style={styles.printText}>
            {strings.shipingOrder.printText}
          </Text>
        </TouchableOpacity>

        <Spacer space={SH(20)} />
      </View>
    </View>
    </View>
  )
}
