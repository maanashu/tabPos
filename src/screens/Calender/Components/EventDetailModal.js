import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { eventClockIcon, pin, chatIcon, crossButton, editIcon, clock } from '@/assets';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import moment from 'moment';
import {
  calculateDuration,
  calculateTimeDuration,
  getCalendarActionButtonTitle,
} from '@/utils/GlobalMethods';
import ProfileImage from '@/components/ProfileImage';
import { useState } from 'react';
import { COLORS } from '@/theme';
import { ChatRoom } from './ChatRoom';
import { Button, Spacer } from '@/components';
import VerifyCheckinOtp from './VerifyCheckinOtp';
import { useDispatch, useSelector } from 'react-redux';
import { changeAppointmentStatus, sendCheckinOTP } from '@/actions/AppointmentAction';
import { TYPES } from '@/Types/AppointmentTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { APPOINTMENT_STATUS } from '@/constants/status';
import ReScheduleDetailModal from './ReScheduleDetailModal';
import { height, width } from '@/theme/ScalerDimensions';
import { Images } from '@/assets/new_icon';

const EventDetailModal = ({ showEventDetailModal, setshowEventDetailModal, eventData }) => {
  const dispatch = useDispatch();
  const { completeData, allEvents } = eventData;
  const [showRescheduleTimeModal, setshowRescheduleTimeModal] = useState(false);
  const [showVerifyOTPModal, setshowVerifyOTPModal] = useState(false);
  const [selectedStaffUserId, setSelectedStaffUserId] = useState(
    completeData?.pos_user_details.user?.unique_uuid
  );
  const [selectedPosStaffCompleteData, setSelectedPosStaffCompleteData] = useState(completeData);

  // Show chat Modal
  const [isShowChatModal, setisShowChatModal] = useState(false);

  const userDetails = selectedPosStaffCompleteData?.user_details ?? {};
  const invitedUserDetails = selectedPosStaffCompleteData?.invitation_details ?? {};
  const userId = selectedPosStaffCompleteData?.user_id;
  const customerDetails = userId != null ? userDetails : invitedUserDetails;
  const userAddress = userDetails?.current_address;
  const appointmentDetail = selectedPosStaffCompleteData;
  const posUserDetails = selectedPosStaffCompleteData?.pos_user_details?.user?.user_profiles;
  const posUserRole =
    selectedPosStaffCompleteData?.pos_user_details?.user?.user_roles[0]?.role?.name || ' ';
  const colorCode = selectedPosStaffCompleteData?.pos_user_details?.color_code;
  const appointmentId = selectedPosStaffCompleteData?.id;
  //Update the state with initial values if it doesn't get updated while initialization of the states
  useEffect(() => {
    setSelectedPosStaffCompleteData(completeData);
    setSelectedStaffUserId(completeData?.pos_user_details.user?.unique_uuid);
  }, [eventData, completeData]);

  const isSendCheckinOTPLoading = useSelector((state) =>
    isLoadingSelector([TYPES.SEND_CHECKIN_OTP], state)
  );

  const isChangeStatusLoading = useSelector((state) =>
    isLoadingSelector([TYPES.CHANGE_APPOINTMENT_STATUS], state)
  );

  const hideAllModal = () => {
    setshowVerifyOTPModal(false);
    setshowRescheduleTimeModal(false);
    setshowEventDetailModal(false);
    setisShowChatModal(false);
  };
  console.log('gjoffd', completeData);
  return (
    <Modal
      isVisible={showEventDetailModal}
      backdropOpacity={0.1}
      style={{
        position: 'absolute',
        right: width * 0.04,
        top: height * 0.05,
      }}
    >
      <View style={styles.eventDetailModalContainer}>
        <View style={styles.rowAlignedJustified}>
          <View style={styles.rowAligned}>
            <Image
              source={Images.calendarIcon}
              style={styles.requestCalendarIconSmall}
              resizeMode="contain"
            />
            <Spacer horizontal space={ms(5)} />
            <Text style={styles.modalHeading}>{'Appointnment Details'}</Text>
          </View>
          <TouchableOpacity onPress={() => setshowEventDetailModal(false)}>
            <Image
              source={crossButton}
              style={[styles.closeIcon, { marginRight: ms(10) }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/*  */}
        {customerDetails && (
          <View style={[styles.customerDetailContainer, { marginTop: ms(5) }]}>
            <View style={styles.rowAlignedJustified}>
              <Text style={styles._eventTitle}>Customer:</Text>
              <View
                style={[
                  styles.paidContainer,
                  {
                    backgroundColor:
                      completeData?.mode_of_payment == 'cash' ? COLORS.white : COLORS.success_green,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.paidText,
                    {
                      color:
                        completeData?.mode_of_payment == 'cash' ? COLORS.navy_blue : COLORS.white,
                    },
                  ]}
                >
                  {completeData?.mode_of_payment == 'cash' ? 'Unpaid' : 'Paid'}
                </Text>
                {completeData?.mode_of_payment != 'cash' && (
                  <>
                    <Spacer horizontal space={ms(3)} />
                    <Image
                      source={Images.check_circle}
                      resizeMode="contain"
                      style={styles.checkStyle}
                    />
                  </>
                )}
              </View>
            </View>
            <View style={styles.rowJustified}>
              <ProfileImage
                source={{ uri: customerDetails?.profile_photo }}
                style={styles.customerUserProfile}
              />
              <View style={{ marginLeft: ms(6), flex: 1, justifyContent: 'center' }}>
                <Text style={styles.customerName}>
                  {customerDetails?.firstname + ' ' + customerDetails?.lastname}
                </Text>
                {userId !== null && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={pin} style={styles.eventAddressIcon} />
                    <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
                  </View>
                )}
              </View>
              {/* {userId !== null && (
                <View style={styles.EventDetailoptionsContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setisShowChatModal(true);
                    }}
                  >
                    <Image source={chatIcon} style={styles.chatIconStl} />
                  </TouchableOpacity>
                </View>
              )} */}
            </View>
            <Spacer space={ms(3)} />

            <View
              style={{
                flexDirection: 'row',
                marginTop: ms(5),
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
            >
              <View style={{ marginRight: ms(8) }}>
                <Text style={styles.customerName}>
                  {posUserDetails?.firstname + ' ' + posUserDetails?.lastname}
                </Text>
                <Text style={styles.eventAddress}>{posUserRole}</Text>
              </View>
              <ProfileImage
                source={{ uri: posUserDetails?.profile_photo }}
                style={styles.customerUserProfile}
              />
            </View>
          </View>
        )}

        <View style={[styles.requestedServicesView, { marginTop: ms(3) }]}>
          <Text style={styles.servicesRequested}>Services requested:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: ms(5) }}
          >
            <View style={styles.rowAligned}>
              {/* {[0, 1, 2, 3, 4, 5].map((item, index) => ( */}
              <View style={styles.scrollableServicesView}>
                <Text style={styles.servicesName}>{completeData?.product_name}</Text>
              </View>
              {/* ))} */}
            </View>
          </ScrollView>
        </View>
        {/*  */}
        <View style={styles.serviceTimeView}>
          <Text style={styles.servicesRequested}>Service Time</Text>

          <Spacer space={ms(8)} />
          <View style={styles.rowAligned}>
            <View style={styles.rowAligned}>
              <Image
                style={styles.serviceTimeIcons}
                resizeMode="contain"
                source={Images.calendarIcon}
              />
              <Text style={styles.serviceTimeTextSmall}>
                {moment(completeData?.start_date_time).format('dddd, DD/MM/YYYY')}
              </Text>
            </View>
            <Spacer horizontal space={ms(10)} />
            <View style={styles.rowAligned}>
              <Image source={clock} style={styles.serviceTimeIcons} resizeMode="contain" />
              <Text style={styles.serviceTimeTextSmall}>{calculateTimeDuration(completeData)}</Text>
            </View>
          </View>
        </View>
        {/*  */}
        <View style={[styles.dashedLine, { marginVertical: ms(7.5) }]} />

        <View style={styles.amountSliptContainer}>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventHeading}>Sub Total</Text>
            <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.actual_price}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventHeading}>Discount</Text>
            <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.discount || '0'}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventHeading}>Taxes</Text>
            <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.tax || '0'}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventHeading}>Tips</Text>
            <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.tips || '0'}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles._eventTitleBold}>Total</Text>
            <Text style={styles._eventTitleBold}>{`$${selectedPosStaffCompleteData?.price}`}</Text>
          </View>
          <View style={styles.subtotalContainers}>
            <Text style={styles.invoiceText}>Invoice</Text>
            <Text style={styles.invoiceText}>{`#${
              completeData?.invoices?.invoice_number ?? ''
            }`}</Text>
          </View>
        </View>

        <View style={[styles.dashedLine, { marginVertical: ms(7.5) }]} />
        <View style={styles.bottomBtnContainer}>
          {selectedPosStaffCompleteData?.status === 1 && (
            <>
              <TouchableOpacity
                style={styles.modifyButtonStyle}
                onPress={() => setshowRescheduleTimeModal(true)}
              >
                <Text style={styles.editTextBtn}>Modify</Text>
                <Image source={Images.modifyAppointment} style={styles.editOptionIcon} />
              </TouchableOpacity>
              <Spacer space={ms(10)} horizontal />
            </>
          )}
          <Button
            pending={isChangeStatusLoading}
            title={getCalendarActionButtonTitle(selectedPosStaffCompleteData?.status)}
            disable={selectedPosStaffCompleteData?.status === 3}
            textStyle={styles.checkintitle}
            style={[
              styles.acceptButtonStyle,
              {
                backgroundColor:
                  selectedPosStaffCompleteData?.status === 3 ? COLORS.darkGray : COLORS.navy_blue,
              },
            ]}
            onPress={() => {
              if (selectedPosStaffCompleteData?.status === 1) {
                dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CHECKED_IN));
                hideAllModal();
                // dispatch(sendCheckinOTP(appointmentId)).then(() => {
                //   setshowVerifyOTPModal(true);
                // });
              } else if (selectedPosStaffCompleteData?.status === 2) {
                dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.COMPLETED));
                hideAllModal();
              }
            }}
          />
        </View>
      </View>
      <ReScheduleDetailModal
        showRecheduleModal={showRescheduleTimeModal}
        setShowRescheduleModal={setshowRescheduleTimeModal}
        appointmentData={selectedPosStaffCompleteData}
        setshowEventDetailModal={setshowEventDetailModal}
      />
      {isShowChatModal && (
        <ChatRoom
          isVisible={isShowChatModal}
          setIsVisible={setisShowChatModal}
          customerData={userDetails}
          customerAddress={userAddress?.street_address}
        />
      )}

      <VerifyCheckinOtp
        appointmentData={selectedPosStaffCompleteData}
        isVisible={showVerifyOTPModal}
        setIsVisible={setshowVerifyOTPModal}
        onVerify={(res) => {
          hideAllModal();
          setTimeout(() => {
            Toast.show({
              text2: res?.msg,
              position: 'bottom',
              type: 'success_toast',
              visibilityTime: 2500,
            });
          }, 500);
        }}
      />
    </Modal>
  );
};

export default EventDetailModal;
{
  /* {allEvents?.length > 1 && (
          <View
            style={{
              backgroundColor: COLORS.textInputBackground,
              height: '100%',
              width: ms(50),
              borderTopLeftRadius: ms(5),
              borderBottomLeftRadius: ms(5),
              paddingVertical: ms(20),
              alignItems: 'center',
            }}
          >
            <FlatList
              data={allEvents}
              keyExtractor={(_, index) => index}
              renderItem={({ item, index }) => {
                const userProfile = item?.completeData?.pos_user_details?.user?.user_profiles;
                const posUserId = item?.completeData?.pos_user_details.user?.unique_uuid;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedStaffUserId(posUserId);
                      setSelectedPosStaffCompleteData(item?.completeData);
                    }}
                    style={[
                      styles.renderItemContainer,
                      {
                        backgroundColor:
                          selectedStaffUserId === posUserId
                            ? COLORS.white
                            : COLORS.textInputBackground,
                        flex: 1,
                        width: ms(50),
                        height: ms(30),
                      },
                    ]}
                  >
                    <View>
                      <Image
                        source={{
                          uri: userProfile?.profile_photo,
                        }}
                        style={[styles.employeeImages, { borderColor: item?.color_code }]}
                      />

                      <View
                        style={[styles.circularBadgeEmployee, { borderColor: item?.color_code }]}
                      >
                        <Text style={styles.badgeTextEmployee}>{'1'}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )} */
}
