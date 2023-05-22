import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  Fonts,
  backArrow,
  clock,
  delivery,
  deliveryLine,
  deliveryScooter,
  dropdown2,
  notifications,
  pay,
  pin,
  radio,
  rightIcon,
  search_light,
  userImage,
} from '@/assets';
import {
  SubcategoryData,
  categoryProRowData,
  categoryRowData,
  homeTableData,
} from '@/constants/flatListData';
import { BottomSheet } from '@/screens/DeliveryOrder/Components';
const windowHeight = Dimensions.get('window').height;

const pickupData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

export function ReadyPickupDetails({ backHandler }) {
  const [showArea, setShowArea] = useState(true);

  const productDetailItem = ({}) => (
    <View style={styles.productViewStyle}>
      <View style={styles.productImageView}>
        <Image source={userImage} style={styles.profileImage} />
        <View style={{ marginLeft: 10 }}>
          <Text numberOfLines={1} style={styles.titleText}>
            Ashton Magnum
          </Text>
          <Text style={styles.boxText}>{'Box'}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>{'x'}</Text>
        <Text style={styles.priceText}>3</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.priceText}>$10</Text>
        <Image
          source={rightIcon}
          style={[styles.pinIcon, { marginLeft: 20 }]}
        />
      </View>
    </View>
  );

  const showOrderStatusModal = () => {
    return (
      <View style={styles.orderModalView}>
        <View style={styles.headerTab}>
          <View>
            <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
              {strings.deliveryOrders.orderStatus}
            </Text>
            <Text style={styles.timeText}>
              {strings.deliveryOrders.assignedDriver}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowArea(!showArea);
            }}
            style={styles.dropdown2Con}
          >
            <Image
              source={dropdown2}
              style={[styles.searchImage, { right: 30 }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        {/* <Spacer space={SH(10)} /> */}
        {showArea === false ? (
          <View style={styles.deliveryStatus2}>
            <View style={styles.flexRow}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <View>
                  <Text style={styles.verifyText}>Order review</Text>
                </View>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.dateTime}
                </Text>
              </View>
            </View>
            <View style={styles.nineXCon}>
              <Text style={styles.nineXText}>659X</Text>
            </View>
          </View>
        ) : null}

        <Spacer space={SH(10)} />
        {showArea ? (
          <View>
            <View style={styles.deliveryStatus}>
              <Image source={radio} style={styles.radioImage} />
              <View style={[styles.justifyContentStyle, { left: 22 }]}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.verifyCode}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.delivery}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.nextTo}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.pickup}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={delivery} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.assign}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>

            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.readyToPickup}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>
            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.orderPrepare}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.within}
                </Text>
              </View>
            </View>
            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.orderAccepted}
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.dateTime}
                </Text>
              </View>
            </View>
            <View style={styles.deliveryStatus}>
              <Image source={deliveryLine} style={styles.deliveryImage} />
              <View style={styles.justifyContentStyle}>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.orderOfReview}
                  11
                </Text>
                <Text style={styles.verifyText}>
                  {strings.deliveryOrders.dateTime}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: COLORS.white }}>
      <View style={styles.headerMainView}>
        <TouchableOpacity style={styles.backView} onPress={backHandler}>
          <Image source={backArrow} style={styles.truckStyle} />
          <Text style={styles.backText}>{strings.deliveryOrders.back}</Text>
        </TouchableOpacity>

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 10 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
      <View style={[styles.headerMainView, { paddingVertical: SH(0) }]}>
        <View style={styles.orderNumberLeftViewmap}>
          <Spacer space={SH(15)} />
          <View style={styles.reviewHeadingView}>
            <Text style={styles.orderReviewText}>Order#7869YZ</Text>
            <Text style={styles.orderReviewText}>August 30, 2022</Text>
          </View>
          <View style={styles.profileDetailView}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={userImage} style={styles.profileImage} />
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
                  {'user name'}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.timeText, { width: SW(80) }]}
                >
                  {'no address'}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Image source={deliveryScooter} style={styles.profileImage} />
              <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
                <Text
                  style={[
                    styles.nameText,
                    { color: COLORS.primary, fontFamily: Fonts.SemiBold },
                  ]}
                >
                  {'no delivery type'}
                </Text>
                <Text style={styles.timeText}>
                  {strings.deliveryOrders.time}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <FlatList
              data={pickupData}
              renderItem={productDetailItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View>
            <View
              style={{
                borderWidth: 0.5,
                width: SW(100),
                alignSelf: 'flex-end',
              }}
            />
            <BottomSheet
              discount={'0'}
              subTotal={'0'}
              tax={'0'}
              total="44"
              item={'0'}
            />
          </View>
        </View>
        <View style={[styles.orderDetailView, { height: windowHeight }]}>
          <Spacer space={SH(15)} />
          <View style={styles.reviewHeadingView}>
            <Text style={styles.orderReviewText}>Order#7869YZ</Text>
            <Text style={styles.orderReviewText}>August 30, 2022</Text>
          </View>

          <TouchableOpacity style={styles.profileDetailView}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={userImage} style={styles.profileImage} />
              <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                <Text style={[styles.nameText, { fontFamily: Fonts.SemiBold }]}>
                  {'user name'}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.timeText, { paddingLeft: 0, width: SW(90) }]}
                >
                  {'no address'}
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
                  {'no delivery type'}
                </Text>
                <Text style={styles.timeText}>
                  {strings.deliveryOrders.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <Spacer space={SH(10)} />
          <View style={styles.horizontalLine} />
          {/* {dataAccordingShip(dataType)} */}
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              showCompass
              region={{
                latitude: 27.2046,
                longitude: 77.4977,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}
            ></MapView>
            <View>{showOrderStatusModal()}</View>
          </View>
        </View>
      </View>
    </View>
  );
}
