import React from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import {
  vector,
  localImage,
  toggleOn,
  jobrDelivery,
  locationIcon,
} from '@/assets';
import { verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';

export function Shipping() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const shippingpickupData = getSettingData?.getShippingPickup;
  console.log('shippingpickupData', shippingpickupData);

  const renderItem = ({ item }) => {
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
