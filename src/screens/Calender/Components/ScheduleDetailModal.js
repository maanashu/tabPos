import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { crossButton, Phone_light, location, email, userImage } from '@/assets';
import { strings } from '@/localization';
import { SF, SW, SH } from '@/theme';
import { Spacer } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import moment from 'moment';

const ScheduleDetailModal = ({
  schduleDetail,
  setSchduleDetail,
  storeItem,
  data,
}) => {
  return (
    <Modal transparent isVisible={schduleDetail}>
      <View style={styles.modalMainView}>
        <View style={styles.headerView}>
          <View style={styles.headerBody}>
            <Text>{null}</Text>
            <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
              {strings.calender.scheduledetails}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSchduleDetail(false);
              }}
              style={{ width: SW(2) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: moderateScale(15) }}>
          <Spacer space={SH(30)} />
          <View style={styles.flexAlign}>
            <Image
              source={
                storeItem?.user_details?.profile_photo
                  ? { uri: storeItem?.user_details?.profile_photo }
                  : userImage
              }
              style={styles.charlene}
            />
            <View style={{ paddingHorizontal: moderateScale(10) }}>
              <Text style={styles.charleneName}>
                {storeItem?.user_details?.firstname}
                {storeItem?.user_details?.lastname}
              </Text>
              {storeItem?.current_address === undefined ? null : (
                <View style={styles.flexAlign}>
                  <Image source={location} style={styles.location} />
                  <Text style={styles.address}>
                    {data?.zipcode},{data?.street}, {data?.city},{data?.state},
                    {data?.country}
                  </Text>
                </View>
              )}

              <View style={styles.flexAlign}>
                <Image source={Phone_light} style={styles.location} />
                <Text style={styles.address}>
                  {storeItem?.user_details?.phone_number}
                </Text>
              </View>
              <View style={styles.flexAlign}>
                <Image source={email} style={styles.location} />
                <Text style={styles.address}>
                  {storeItem?.user_details?.email}
                </Text>
              </View>
            </View>
          </View>
          <Spacer space={SH(30)} />
          <Text style={styles.appointment}>{strings.calender.appointment}</Text>
          <Spacer space={SH(15)} />
          <View>
            <Text style={styles.service}>service</Text>
            <Spacer space={SH(8)} />
            <View style={styles.serviceTextCon}>
              {storeItem?.appointment_details?.map((item, index) => (
                <Text style={styles.serviceType} key={index}>
                  {item.product_name}
                  {storeItem?.appointment_details?.length >= 2 ? ',' : null}
                </Text>
              ))}
            </View>
          </View>
          <Spacer space={SH(15)} />
          <View>
            <View style={styles.displayFlex}>
              <Text style={styles.service}>{strings.calender.apt}</Text>
              <View style={styles.upcomingCon}>
                <Text style={styles.upcomingText}>
                  {strings.calender.upcoming}
                </Text>
              </View>
            </View>
            <Spacer space={SH(8)} />
            <Text style={styles.serviceType}>{strings.calender.aptDate}</Text>
          </View>
          <Spacer space={SH(30)} />
          <View>
            <Text style={styles.service}>{strings.calender.conform}</Text>
            <Spacer space={SH(8)} />
            <Text style={styles.serviceType}>
              {moment(storeItem?.date).format('ll')}{' '}
              {moment(storeItem?.date).format('LT')}
            </Text>
          </View>
          <Spacer space={SH(30)} />
          <View>
            <Text style={styles.service}>{strings.calender.paidAmount}</Text>
            <Spacer space={SH(8)} />
            <Text style={styles.serviceType}>
              {storeItem?.mode_of_payment.toUpperCase()}{' '}
              {storeItem?.payable_amount}
            </Text>
          </View>
          <Spacer space={SH(50)} />
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleDetailModal;
