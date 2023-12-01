import React, { useEffect } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {
  vector,
  localImage,
  toggleOn,
  jobrDelivery,
  locationIcon,
  vectorOff,
  clothes,
  shippingPlain,
  dropOff,
  store,
} from '@/assets';
import { verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { addressUpdateById, deleteAddressById, getShippingPickup } from '@/actions/SettingAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { styles } from './ShippingPickup.styles';
import { Images } from '@mPOS/assets';
import { goBack } from '@mPOS/navigation/NavigationRef';

export function ShippingPickup() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuthdata = useSelector(getAuthData);
  const sellerID = getAuthdata?.merchantLoginData?.uniqe_id;
  const merchantDetails = getAuthdata?.merchantLoginData?.user;
  const getSettingData = useSelector(getSetting);
  const shippingpickupData = getSettingData?.getShippingPickup;

  const convertShippinDataToArr = () => {
    let arr = [];
    for (let key in shippingpickupData) {
      arr.push(key);
    }
    return arr;
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getShippingPickup());
    }
  }, [isFocused]);

  const addressUpdate = (id, status, type) => {
    const body = {
      status: status ? false : true,
      address_type: type,
      seller_id: sellerID,
    };

    dispatch(addressUpdateById(body));
  };
  const deleteAddress = (id) => {
    dispatch(deleteAddressById(id));
  };
  const HeaderSummary = () => {
    return (
      <TouchableOpacity
        onPress={() => goBack()}
        style={[styles.headerMainView, { paddingHorizontal: SW(1), marginLeft: SW(20) }]}
      >
        <Image source={Images.back} style={styles.backImageStyle} />
        <Text style={styles.headerText}>{strings.shipping.shipping}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <Spacer space={SH(5)} />

        <View style={[styles.shippingBodyCon]}>
          <HeaderSummary />
          <Spacer space={SH(20)} />
          <ScrollView>
            {/* local pickup address */}
            <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                <View style={styles.twoStepVerifiCon}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.twoStepText}>{strings.shipping.local}</Text>
                    <TouchableOpacity
                      disabled={true}
                      onPress={() =>
                        addressUpdate(
                          shippingpickupData?.local_pickup?.[0]?.id,
                          shippingpickupData?.local_pickup?.[0]?.is_active,
                          'local_pickup'
                        )
                      }
                      // disabled={item.is_active ? false : true}
                      style={{ opacity: 0.5 }}
                    ></TouchableOpacity>
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                  <Spacer space={SH(18)} />
                  {shippingpickupData?.local_pickup?.map((item, index) => (
                    <View
                      pointerEvents={
                        shippingpickupData?.local_pickup?.[0]?.is_active ? 'auto' : 'none'
                      }
                      style={[
                        styles.twoStepMemberCon,
                        !shippingpickupData?.local_pickup?.[0]?.is_active && { opacity: 0.3 },
                      ]}
                      key={index}
                    >
                      <View style={styles.flexRow}>
                        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                          <Image source={locationIcon} style={styles.toggleSecurity} />

                          <View style={styles.twoStepVerifiCon}>
                            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                              {merchantDetails?.user_profiles?.organization_name}
                            </Text>
                            <Text
                              style={[styles.securitysubhead, { fontSize: SF(12) }]}
                              numberOfLines={1}
                            >
                              {item.street_address}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {/*jobrdelivery address */}
            <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                {/* <Image source={jobrDelivery} style={styles.securityLogo} /> */}
                <View style={styles.twoStepVerifiCon}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.twoStepText}>{strings.shipping.jobrDelivery}</Text>

                    <TouchableOpacity
                      disabled={true}
                      onPress={() =>
                        addressUpdate(
                          shippingpickupData?.jobr_delivery?.[0]?.id,
                          shippingpickupData?.jobr_delivery?.[0]?.is_active,
                          'jobr_delivery'
                        )
                      }
                      // disabled={item.is_active ? false : true}
                      style={{ opacity: 0.5 }}
                    ></TouchableOpacity>
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                  <Spacer space={SH(18)} />
                  {shippingpickupData?.jobr_delivery?.map((item, index) => (
                    <View
                      pointerEvents={
                        shippingpickupData?.jobr_delivery?.[0]?.is_active ? 'auto' : 'none'
                      }
                      style={[
                        styles.twoStepMemberCon,
                        !shippingpickupData?.jobr_delivery?.[0]?.is_active && { opacity: 0.3 },
                      ]}
                      key={index}
                    >
                      <View style={styles.flexRow}>
                        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                          <Image source={locationIcon} style={styles.toggleSecurity} />

                          <View style={styles.twoStepVerifiCon}>
                            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                              {merchantDetails?.user_profiles?.organization_name}
                            </Text>
                            <Text
                              style={[styles.securitysubhead, { fontSize: SF(12) }]}
                              numberOfLines={1}
                            >
                              {item.street_address}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/*local drop off address */}
            <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                {/* <Image source={dropOff} style={styles.securityLogo} /> */}
                <View style={styles.twoStepVerifiCon}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.twoStepText}>{strings.shipping.localOff}</Text>

                    <TouchableOpacity
                      disabled={true}
                      onPress={() =>
                        addressUpdate(
                          shippingpickupData?.local_drop_off?.[0]?.id,
                          shippingpickupData?.local_drop_off?.[0]?.is_active,
                          'local_drop_off'
                        )
                      }
                      // disabled={item.is_active ? false : true}
                      style={{ opacity: 0.5 }}
                    ></TouchableOpacity>
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                  <Spacer space={SH(18)} />
                  {shippingpickupData?.local_drop_off?.map((item, index) => (
                    <View
                      pointerEvents={
                        shippingpickupData?.local_drop_off?.[0]?.is_active ? 'auto' : 'none'
                      }
                      style={[
                        styles.twoStepMemberCon,
                        !shippingpickupData?.local_drop_off?.[0]?.is_active && { opacity: 0.3 },
                      ]}
                      key={index}
                    >
                      <View style={styles.flexRow}>
                        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                          <Image source={locationIcon} style={styles.toggleSecurity} />

                          <View style={styles.twoStepVerifiCon}>
                            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                              {merchantDetails?.user_profiles?.organization_name}
                            </Text>
                            <Text
                              style={[styles.securitysubhead, { fontSize: SF(12) }]}
                              numberOfLines={1}
                            >
                              {item?.street_address}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/*shipping address */}
            <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                {/* <Image source={shippingPlain} style={styles.securityLogo} /> */}
                <View style={styles.twoStepVerifiCon}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.twoStepText}>{strings.shipping.shippingText}</Text>

                    <TouchableOpacity
                      disabled={true}
                      onPress={() =>
                        addressUpdate(
                          shippingpickupData?.shipping?.[0]?.id,
                          shippingpickupData?.shipping?.[0]?.is_active,
                          'shipping'
                        )
                      }
                      // disabled={item.is_active ? false : true}
                      style={{ opacity: 0.5 }}
                    ></TouchableOpacity>
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                  <Spacer space={SH(18)} />
                  {shippingpickupData?.shipping?.map((item, index) => (
                    <View
                      pointerEvents={shippingpickupData?.shipping?.[0]?.is_active ? 'auto' : 'none'}
                      style={[
                        styles.twoStepMemberCon,
                        !shippingpickupData?.shipping?.[0]?.is_active && { opacity: 0.3 },
                      ]}
                      key={index}
                    >
                      <View style={styles.flexRow}>
                        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                          <Image source={locationIcon} style={styles.toggleSecurity} />

                          <View style={styles.twoStepVerifiCon}>
                            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                              {merchantDetails?.user_profiles?.organization_name}
                            </Text>
                            <Text
                              style={[styles.securitysubhead, { fontSize: SF(12) }]}
                              numberOfLines={1}
                            >
                              {item.street_address}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/*store address */}
            <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
              <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                {/* <Image source={store} style={styles.securityLogo} /> */}
                <View style={styles.twoStepVerifiCon}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.twoStepText}>{strings.shipping.store}</Text>

                    <TouchableOpacity
                      disabled={true}
                      onPress={() =>
                        addressUpdate(
                          shippingpickupData?.store_type?.[0]?.id,
                          shippingpickupData?.store_type?.[0]?.is_active,
                          'store_type'
                        )
                      }
                      // disabled={item.is_active ? false : true}
                      style={{ opacity: 0.5 }}
                    ></TouchableOpacity>
                  </View>
                  <Spacer space={SH(10)} />
                  <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                  <Spacer space={SH(18)} />
                  {shippingpickupData?.store_type?.map((item, index) => (
                    <View
                      pointerEvents={
                        shippingpickupData?.store_type?.[0]?.is_active ? 'auto' : 'none'
                      }
                      style={[
                        styles.twoStepMemberCon,
                        !shippingpickupData?.store_type?.[0]?.is_active && { opacity: 0.3 },
                      ]}
                      key={index}
                    >
                      <View style={styles.flexRow}>
                        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                          <Image source={locationIcon} style={styles.toggleSecurity} />

                          <View style={styles.twoStepVerifiCon}>
                            <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                              {merchantDetails?.user_profiles?.organization_name}
                            </Text>
                            <Text
                              style={[styles.securitysubhead, { fontSize: SF(12) }]}
                              numberOfLines={1}
                            >
                              {item.street_address}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
