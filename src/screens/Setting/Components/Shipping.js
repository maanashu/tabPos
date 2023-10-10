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
} from '@/assets';
import { verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { addressUpdateById, getShippingPickup } from '@/actions/SettingAction';
import { getAuthData } from '@/selectors/AuthSelector';

export function Shipping() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuthdata = useSelector(getAuthData);
  const merchantDetails = getAuthdata?.merchantLoginData?.user;
  const getSettingData = useSelector(getSetting);
  const shippingpickupData = getSettingData?.getShippingPickup;
  console.log('shippingpickupData', JSON.stringify(getSettingData));

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

  const addressUpdate = (id, status) => {
    const body = {
      id: id,
      is_active: status ? false : true,
    };
    dispatch(addressUpdateById(body));
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
                <Text style={styles.twoStepText}>{strings.shipping.local}</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                <Spacer space={SH(18)} />
                {shippingpickupData?.local_pickup?.map((item, index) => (
                  <View style={styles.twoStepMemberCon} key={index}>
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
                          // onPress={() => addressUpdate(data.id, data.is_active)}
                          // disabled={item.is_active ? false : true}
                          style={{ opacity: item.is_active ? 1 : 0.5 }}
                        >
                          <Image
                            source={item.is_active ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          />
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
                <Text style={styles.twoStepText}>{strings.shipping.jobrDelivery}</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                <Spacer space={SH(18)} />
                {shippingpickupData?.jobr_delivery?.map((item, index) => (
                  <View style={styles.twoStepMemberCon} key={index}>
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
                          // onPress={() => addressUpdate(data.id, data.is_active)}
                          // disabled={item.is_active ? false : true}
                          style={{ opacity: item.is_active ? 1 : 0.5 }}
                        >
                          <Image
                            source={item.is_active ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          />
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
              <Image source={jobrDelivery} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>{strings.shipping.localOff}</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                <Spacer space={SH(18)} />
                {shippingpickupData?.local_drop_off?.map((item, index) => (
                  <View style={styles.twoStepMemberCon} key={index}>
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
                          // onPress={() => addressUpdate(data.id, data.is_active)}
                          // disabled={item.is_active ? false : true}
                          style={{ opacity: item.is_active ? 1 : 0.5 }}
                        >
                          <Image
                            source={item.is_active ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          />
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
              <Image source={jobrDelivery} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>{strings.shipping.shippingText}</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                <Spacer space={SH(18)} />
                {shippingpickupData?.shipping?.map((item, index) => (
                  <View style={styles.twoStepMemberCon} key={index}>
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
                          // onPress={() => addressUpdate(data.id, data.is_active)}
                          // disabled={item.is_active ? false : true}
                          style={{ opacity: item.is_active ? 1 : 0.5 }}
                        >
                          <Image
                            source={item.is_active ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          />
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
              <Image source={jobrDelivery} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>{strings.shipping.store}</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.wallet.shopifyPayments}</Text>
                <Spacer space={SH(18)} />
                {shippingpickupData?.store_type?.map((item, index) => (
                  <View style={styles.twoStepMemberCon} key={index}>
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
                          // onPress={() => addressUpdate(data.id, data.is_active)}
                          // disabled={item.is_active ? false : true}
                          style={{ opacity: item.is_active ? 1 : 0.5 }}
                        >
                          <Image
                            source={item.is_active ? vector : vectorOff}
                            style={styles.toggleSecurity}
                          />
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
