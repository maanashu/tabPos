import React, { useEffect } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
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

export function Shipping() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuthdata = useSelector(getAuthData);
  const sellerID = getAuthdata?.merchantLoginData?.uniqe_id;
  const merchantDetails = getAuthdata?.merchantLoginData?.user;
  const getSettingData = useSelector(getSetting);
  const shippingpickupData = getSettingData?.getShippingPickup;
  console.log('shippingpickupData', JSON.stringify(shippingpickupData));

  // console.log('shippingpickupData', JSON.stringify(getSettingData));

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
    console.log('sdasds', body);

    dispatch(addressUpdateById(body));
  };
  const deleteAddress = (id) => {
    dispatch(deleteAddressById(id));
  };

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.shipping.shipping}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={[styles.shippingBodyCon]}>
        <ScrollView>
          {/* local pickup address */}
          <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={localImage} style={styles.securityLogo} />
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
                  >
                    <Image
                      source={shippingpickupData?.local_pickup?.[0]?.is_active ? vector : vectorOff}
                      style={styles.toggleSecurityLarge}
                    />
                  </TouchableOpacity>
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
                        {/* <Image
                            source={item?.is_active ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          /> */}
                        {/* <TouchableOpacity
                          onPress={() => deleteAddress(item?.id)}
                          
                          style={styles.deleteButton}
                        >
                          <Text style={styles.deleteText}>Delete</Text>
                         
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* <TouchableOpacity
            // onPress={() => {
            //   addressUpdate(item.id, item.is_active), defaultUpdate(item);
            // }}
            >
              <Image
                source={item.is_active ? toggleOn : vectorOff}
                style={styles.toggleSecurityLarge}
              />
            </TouchableOpacity> */}
            </View>
          </View>
          {/*jobrdelivery address */}
          <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={jobrDelivery} style={styles.securityLogo} />
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
                  >
                    <Image
                      source={
                        shippingpickupData?.jobr_delivery?.[0]?.is_active ? vector : vectorOff
                      }
                      style={styles.toggleSecurityLarge}
                    />
                  </TouchableOpacity>
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
                        {/* <TouchableOpacity
                          onPress={() => deleteAddress(item?.id)}
                          style={styles.deleteButton}
                        >
                          <Text style={styles.deleteText}>Delete</Text>
                         
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* <TouchableOpacity
            // onPress={() => {
            //   addressUpdate(item.id, item.is_active), defaultUpdate(item);
            // }}
            >
              <Image
                source={item.is_active ? toggleOn : vectorOff}
                style={styles.toggleSecurityLarge}
              />
            </TouchableOpacity> */}
            </View>
          </View>

          {/*local drop off address */}
          <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={dropOff} style={styles.securityLogo} />
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
                  >
                    <Image
                      source={
                        shippingpickupData?.local_drop_off?.[0]?.is_active ? vector : vectorOff
                      }
                      style={styles.toggleSecurityLarge}
                    />
                  </TouchableOpacity>
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
                        {/* <TouchableOpacity
                          onPress={() => deleteAddress(item?.id)}
                          // disabled={item.is_active ? false : true}
                          style={styles.deleteButton}
                        >
                          <Text style={styles.deleteText}>Delete</Text>
                         
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* <TouchableOpacity
            // onPress={() => {
            //   addressUpdate(item.id, item.is_active), defaultUpdate(item);
            // }}
            >
              <Image
                source={item.is_active ? toggleOn : vectorOff}
                style={styles.toggleSecurityLarge}
              />
            </TouchableOpacity> */}
            </View>
          </View>

          {/*shipping address */}
          <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={shippingPlain} style={styles.securityLogo} />
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
                  >
                    <Image
                      source={shippingpickupData?.shipping?.[0]?.is_active ? vector : vectorOff}
                      style={styles.toggleSecurityLarge}
                    />
                  </TouchableOpacity>
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
                        {/* <TouchableOpacity
                          onPress={() => deleteAddress(item?.id)}
                          // disabled={item.is_active ? false : true}
                          style={styles.deleteButton}
                        >
                          <Text style={styles.deleteText}>Delete</Text>
                         
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* <TouchableOpacity
            // onPress={() => {
            //   addressUpdate(item.id, item.is_active), defaultUpdate(item);
            // }}
            >
              <Image
                source={item.is_active ? toggleOn : vectorOff}
                style={styles.toggleSecurityLarge}
              />
            </TouchableOpacity> */}
            </View>
          </View>

          {/*store address */}
          <View style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={store} style={styles.securityLogo} />
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
                  >
                    <Image
                      source={shippingpickupData?.store_type?.[0]?.is_active ? vector : vectorOff}
                      style={styles.toggleSecurityLarge}
                    />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                <Spacer space={SH(18)} />
                {shippingpickupData?.store_type?.map((item, index) => (
                  <View
                    pointerEvents={shippingpickupData?.store_type?.[0]?.is_active ? 'auto' : 'none'}
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
                        {/* <TouchableOpacity
                          onPress={() => addressUpdate(item?.id, item?.is_active)}
                          // disabled={item.is_active ? false : true}
                          style={styles.deleteButton}
                        >
                          <Text style={styles.deleteText}>Delete</Text>
                         
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* <TouchableOpacity
            // onPress={() => {
            //   addressUpdate(item.id, item.is_active), defaultUpdate(item);
            // }}
            >
              <Image
                source={item.is_active ? toggleOn : vectorOff}
                style={styles.toggleSecurityLarge}
              />
            </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
