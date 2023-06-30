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
} from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import {
  vector,
  localImage,
  toggleOn,
  jobrDelivery,
  locationIcon,
  vectorOff,
} from '@/assets';
import { verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { addressUpdateById, getShippingPickup } from '@/actions/SettingAction';

export function Shipping() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const shippingpickupData = getSettingData?.getShippingPickup;

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
  const defaultUpdate = data => {
    // console.log('data', data?.is_active);
    // if (data?.is_active) {
    // }
  };

  const renderItem = ({ item }) => {
    console.log("Item",item);
    return (
      <View
        style={[styles.securityMainCon, { marginVertical: verticalScale(3) }]}
      >
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image
            source={{ uri: item.image }}
            style={[styles.securityLogo, { borderRadius: 100 }]}
          />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{item.address_type}</Text>
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>
              {item.pickup_instructions}
            </Text>
            <Spacer space={SH(18)} />

            {item?.seller_addresses?.map((data, index) => (
              <View style={styles.twoStepMemberCon} key={index}>
                <View style={styles.flexRow}>
                  <View
                    style={[styles.dispalyRow, { alignItems: 'flex-start' }]}
                  >
                    <Image
                      source={locationIcon}
                      style={styles.toggleSecurity}
                    />

                    <View style={styles.twoStepVerifiCon}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {data.business_name}
                      </Text>
                      <Text
                        style={[styles.securitysubhead, { fontSize: SF(12) }]}
                        numberOfLines={1}
                      >
                        {data.current_address?.zipcode} ,
                        {data.current_address?.street_address} ,
                        {data.current_address?.city} ,
                        {data.current_address?.state} ,
                        {data.current_address?.country}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => addressUpdate(data.id, data.is_active)}
                      disabled={item.is_active ? false : true}
                      style={{ opacity: item.is_active ? 1 : 0.5 }}
                    >
                      <Image
                        source={data.is_active ? vector : vectorOff}
                        style={styles.toggleSecurity}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
          {item.address_type!==strings.shipping.shippingText&&
          <TouchableOpacity
            onPress={() => {
              addressUpdate(item.id, item.is_active), defaultUpdate(item);
            }}
          >
            <Image
              source={item.is_active ? toggleOn : vectorOff}
              style={styles.toggleSecurityLarge}
            />
          </TouchableOpacity>}
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.shipping.shipping}</Text>
      </View>
      <Spacer space={SH(20)} />
      <View style={styles.shippingBodyCon}>
        <FlatList
          data={shippingpickupData}
          extraData={shippingpickupData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      {/* <Spacer space={SH(10)} />
      <View style={styles.securityMainCon}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={jobrDelivery} style={styles.securityLogo} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>
              {strings.shipping.jobrDelivery}
            </Text>
            <Spacer space={SH(18)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.shopifyPayments}
            </Text>
            <Spacer space={SH(18)} />
            <View style={styles.twoStepMemberCon}>
              <View style={styles.flexRow}>
                <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                  <Image source={locationIcon} style={styles.toggleSecurity} />
                  <View style={styles.twoStepVerifiCon}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.shipping.businessName}
                    </Text>
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(12) }]}
                    >
                      {strings.shipping.address}
                    </Text>
                  </View>
                  <Image source={vector} style={styles.toggleSecurity} />
                </View>
              </View>
            </View>
          </View>
          <Image source={toggleOn} style={styles.toggleSecurity} />
        </View>
      </View>
      <Spacer space={SH(10)} />

      <View style={styles.securityMainCon}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={jobrDelivery} style={styles.securityLogo} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{strings.shipping.localOff}</Text>
            <Spacer space={SH(18)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.shopifyPayments}
            </Text>
            <Spacer space={SH(18)} />
            <View style={styles.twoStepMemberCon}>
              <View style={styles.flexRow}>
                <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                  <Image source={locationIcon} style={styles.toggleSecurity} />
                  <View style={styles.twoStepVerifiCon}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.shipping.businessName}
                    </Text>
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(12) }]}
                    >
                      {strings.shipping.address}
                    </Text>
                  </View>
                  <Image source={vector} style={styles.toggleSecurity} />
                </View>
              </View>
            </View>
          </View>
          <Image source={toggleOn} style={styles.toggleSecurity} />
        </View>
      </View>
      <Spacer space={SH(10)} />

      <View style={styles.securityMainCon}>
        <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
          <Image source={jobrDelivery} style={styles.securityLogo} />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{strings.shipping.shipping}</Text>
            <Spacer space={SH(18)} />
            <Text style={styles.securitysubhead}>
              {strings.wallet.shopifyPayments}
            </Text>
            <Spacer space={SH(18)} />
            <View style={styles.twoStepMemberCon}>
              <View style={styles.flexRow}>
                <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
                  <Image source={locationIcon} style={styles.toggleSecurity} />
                  <View style={styles.twoStepVerifiCon}>
                    <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                      {strings.shipping.businessName}
                    </Text>
                    <Text
                      style={[styles.securitysubhead, { fontSize: SF(12) }]}
                    >
                      {strings.shipping.address}
                    </Text>
                  </View>
                  <Image source={vector} style={styles.toggleSecurity} />
                </View>
              </View>
            </View>
          </View>
          <Image source={toggleOn} style={styles.toggleSecurity} />
        </View>
      </View> */}
    </View>
  );
}
