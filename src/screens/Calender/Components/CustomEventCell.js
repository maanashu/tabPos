import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getStartEndFormattedDate, pSBC } from '@/utils/GlobalMethods';
import { styles } from '../Calender.styles';
import { CALENDAR_MODES } from '@/constants/enums';
import { Spacer } from '@/components';
import { ms } from 'react-native-size-matters';

const CustomEventCell = (
  event,
  touchableOpacityProps,
  allEvents = [],
  calendarMode,
  employeeHeaderLayouts = [],
  showEmployeeHeader = false
) => {
  const posUserDetils = event?.completeData?.pos_user_details;
  const staffDetails = posUserDetils?.user?.user_profiles;
  const colorCode = posUserDetils?.color_code;
  const totalSlots = allEvents[0]?.completeData?.total_slots;
  const bookedSlots = allEvents[0]?.completeData?.booked_slots;

  var employeeIndex = employeeHeaderLayouts.findIndex(
    (data) => data?.user_id === staffDetails?.user_id
  );
  employeeIndex = employeeIndex > -1 ? employeeIndex : 0;

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[
        ...touchableOpacityProps.style,
        styles.eventContainer,
        { borderColor: colorCode, backgroundColor: pSBC(0.8, colorCode) },
        calendarMode === CALENDAR_MODES.DAY && showEmployeeHeader
          ? {
              width: '14.1%',
              marginLeft: Dimensions.get('screen').width * 0.14 * employeeIndex,
            }
          : {},
      ]}
      activeOpacity={0.7}
    >
      {calendarMode === CALENDAR_MODES.MONTH ? (
        <View>
          <View style={{ flexDirection: 'row' }}>
            {allEvents?.map((eventItem, index) => {
              return (
                <View key={index} style={{ margin: 1 }}>
                  {eventItem?.completeData?.pos_user_details?.user?.user_profiles
                    ?.profile_photo && (
                    <View
                      style={[
                        styles.profilePicContainer,
                        {
                          borderColor: colorCode,
                          flexDirection: 'row',
                          marginLeft: index === 0 ? 0 : -8,
                        },
                      ]}
                    >
                      <Image
                        source={{
                          uri: eventItem?.completeData?.pos_user_details?.user?.user_profiles
                            ?.profile_photo,
                        }}
                        style={styles.eventProfilePic}
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          <Text style={styles.startEndDate}>{`Slots ${totalSlots ?? 0}`}</Text>
          <Text style={styles.eventTitle}>{`Booked: ${bookedSlots ?? 0}`}</Text>
        </View>
      ) : (
        <View>
          {/* {allEvents?.length > 0 ? ( */}
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {allEvents?.map((eventItem, index) => {
                return (
                  <View key={index}>
                    {/* {eventItem?.completeData?.pos_user_details?.user?.user_profiles
                      ?.profile_photo && ( */}
                    <View
                      style={[
                        styles.profilePicContainer,
                        {
                          borderColor: '#fff',
                          flexDirection: 'row',
                          marginLeft: index === 0 ? 0 : -8,
                          zIndex: index,
                          elevation: index,
                        },
                      ]}
                    >
                      <Image
                        source={{
                          uri: eventItem?.completeData?.pos_user_details?.user?.user_profiles
                            ?.profile_photo,
                        }}
                        style={[styles.eventProfilePic, { backgroundColor: colorCode }]}
                      />
                    </View>
                    {/* // )} */}
                  </View>
                );
              })}

              <Spacer space={ms(3)} horizontal />
              <Text style={[styles.startEndDate, { color: colorCode }]}>
                {getStartEndFormattedDate(event.start)}
              </Text>
            </View>
            <Spacer space={ms(2)} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {allEvents?.map((eventItem, index) => {
                const isLast = index === allEvents?.length - 1;
                return (
                  <Text
                    key={index}
                    numberOfLines={1}
                    style={[styles.eventTitle, { color: colorCode }]}
                  >
                    {eventItem?.title + (isLast ? '' : ', ')}
                  </Text>
                );
              })}
            </View>
          </>
          {/* // ) 
          
          
          // : (
          //   <>
          //     {staffDetails?.profile_photo && (
          //       <View style={[styles.profilePicContainer, { borderColor: colorCode }]}>
          //         <Image
          //           source={{ uri: staffDetails?.profile_photo }}
          //           style={styles.eventProfilePic}
          //         />
          //       </View>
          //     )}
          //     <Text style={styles.startEndDate}>{getStartEndFormattedDate(event.start)}</Text>
          //     <Text numberOfLines={1} style={styles.eventTitle}>
          //       {event.title}
          //     </Text>
          //   </>
          // )} */}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomEventCell;
