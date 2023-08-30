import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { eventClockIcon, pin, chatIcon, crossButton, editIcon } from '@/assets';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import moment from 'moment';
import { calculateDuration } from '@/utils/GlobalMethods';
import ProfileImage from '@/components/ProfileImage';
import { useState } from 'react';
import { ReScheduleDetailModal } from './ReScheduleDetailModal';
import { COLORS } from '@/theme';
import { ChatRoom } from './ChatRoom';

const EventDetailModal = ({ showEventDetailModal, setshowEventDetailModal, eventData }) => {
  const { completeData, allEvents } = eventData;
  const [showRescheduleTimeModal, setshowRescheduleTimeModal] = useState(false);
  const [selectedStaffUserId, setSelectedStaffUserId] = useState(
    completeData?.pos_user_details.user?.unique_uuid
  );

  const [selectedPosStaffCompleteData, setSelectedPosStaffCompleteData] = useState(completeData);

  // Show chat Modal
  const [isShowChatModal, setisShowChatModal] = useState(false);

  const userDetails = selectedPosStaffCompleteData?.user_details;
  const userAddress = userDetails?.current_address;
  const appointmentDetail = selectedPosStaffCompleteData?.appointment_details[0];
  const posUserDetails = selectedPosStaffCompleteData?.pos_user_details?.user?.user_profiles;
  const posUserRole =
    selectedPosStaffCompleteData?.pos_user_details?.user?.user_roles[0]?.role?.name || ' ';
  const colorCode = selectedPosStaffCompleteData?.pos_user_details?.color_code;

  //Update the state with initial values if it doesn't get updated while initialization of the states
  useEffect(() => {
    setSelectedPosStaffCompleteData(completeData);
    setSelectedStaffUserId(completeData?.pos_user_details.user?.unique_uuid);
  }, [completeData]);

  return (
    <Modal isVisible={showEventDetailModal}>
      <View style={styles.eventDetailModalContainer}>
        {allEvents?.length > 1 && (
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
        )}

        <View style={{ flex: 1, paddingVertical: ms(10) }}>
          <TouchableOpacity
            onPress={() => setshowEventDetailModal(false)}
            style={styles.crossEventDetailModal}
          >
            <Image source={crossButton} style={styles.crossStl} />
          </TouchableOpacity>
          <View style={[styles.customerDetailContainer, { marginTop: ms(15) }]}>
            <Text style={styles._eventTitle}>Customer:</Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: ms(5),
                justifyContent: 'space-between',
              }}
            >
              <ProfileImage
                source={{ uri: userDetails?.profile_photo }}
                style={styles.customerUserProfile}
              />
              <View style={{ marginLeft: ms(6), flex: 1 }}>
                <Text style={styles.customerName}>
                  {userDetails?.firstname + ' ' + userDetails?.lastname}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={pin} style={styles.eventAddressIcon} />
                  <Text style={styles.eventAddress}>{userAddress?.street_address}</Text>
                </View>
              </View>
              <View style={styles.EventDetailoptionsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setshowRescheduleTimeModal(true);
                  }}
                >
                  <Image source={editIcon} style={styles.editOptionIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    alert('message is under development');
                    // setisShowChatModal(true);
                  }}
                >
                  <Image source={chatIcon} style={styles.chatIconStl} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.assignedContainer}>
            <Text style={styles._eventTitle}>Assigned:</Text>

            <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
              <ProfileImage
                source={{ uri: posUserDetails?.profile_photo }}
                style={[styles.customerUserProfile, { borderColor: colorCode, borderWidth: 1.5 }]}
              />
              <View style={{ marginLeft: ms(6) }}>
                <Text style={styles.customerName}>
                  {posUserDetails?.firstname + ' ' + posUserDetails?.lastname}
                </Text>
                <Text style={styles.eventAddress}>{posUserRole}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: ms(15) }}>
            <Text style={styles._eventTitle}>Service Requested:</Text>
            <Text style={styles.hairCutTitle}>{appointmentDetail?.product_name}</Text>
          </View>
          <View style={[styles.subContainer1, { marginLeft: ms(15) }]}>
            <Text style={styles._eventTitle}>Service Time:</Text>
            <View style={styles.serviceTimeContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={eventClockIcon} style={styles.evenclockIcon} />
                <Text style={styles.eventDay}>
                  {moment(selectedPosStaffCompleteData?.date).format('dddd')}
                </Text>
              </View>
              <View style={styles.lineStl} />

              <Text style={styles.eventDate}>
                {moment(selectedPosStaffCompleteData?.date).format('ll')}
              </Text>

              <View style={styles.lineStl} />
              <Text style={styles.eventDate}>
                {selectedPosStaffCompleteData?.start_time}
                {'-'}
                {selectedPosStaffCompleteData?.end_time}
              </Text>
            </View>
          </View>
          <View style={[styles.duractionContainer, { marginLeft: ms(15) }]}>
            <Text style={styles._eventTitle}>Duration:</Text>
            <Text style={styles.duractiontxt}>
              {calculateDuration(
                selectedPosStaffCompleteData?.start_time,
                selectedPosStaffCompleteData?.end_time
              )}
            </Text>
          </View>

          <View style={styles.amountSliptContainer}>
            <Text style={[styles._eventTitle, { marginBottom: ms(2) }]}>Service Charge:</Text>
            <View style={styles.subtotalContainers}>
              <Text style={styles._eventTitle}>Sub Total</Text>
              <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.actual_amount}</Text>
            </View>
            <View style={styles.subtotalContainers}>
              <Text style={styles._eventTitle}>Discount</Text>
              <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.discount}</Text>
            </View>
            <View style={styles.subtotalContainers}>
              <Text style={styles._eventTitle}>Taxes</Text>
              <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.tax}</Text>
            </View>
            <View style={styles.subtotalContainers}>
              <Text style={styles._eventTitle}>Tips</Text>
              <Text style={styles._eventTitle}>${selectedPosStaffCompleteData?.tips}</Text>
            </View>
            <View style={styles.serviceChargeSub}>
              <Text style={styles.totalTile}>Total</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.paidContainer}>
                  <Text style={styles.paidText}>Paid</Text>
                </View>
                <Text style={styles.totalTile}>{selectedPosStaffCompleteData?.payable_amount}</Text>
              </View>
            </View>
            <Text style={styles.invoiceTxt}>Invoice # V364899978</Text>
          </View>
        </View>
      </View>
      <ReScheduleDetailModal
        showRecheduleModal={showRescheduleTimeModal}
        setShowRescheduleModal={setshowRescheduleTimeModal}
        appointmentData={selectedPosStaffCompleteData}
        setshowEventDetailModal={setshowEventDetailModal}
      />
      <ChatRoom isVisible={isShowChatModal} setIsVisible={setisShowChatModal} />
    </Modal>
  );
};

export default EventDetailModal;
