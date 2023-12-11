import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { Header, HorizontalLine } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Image } from 'react-native';
import { Images } from '@mPOS/assets';
import styles from './MySupport.styles';
import { upadteApi } from '@/actions/SettingAction';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { COLORS, SH } from '@/theme';
import { getSupportData } from '@/selectors/SupportSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/SupportTypes';

export function MySupport() {
  const supportData = useSelector(getSupportData);
  const tickets = supportData?.ticketsList?.data;

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_SUPPORTLIST], state));

  const renderComItem = ({ item }) => {
    const agentProfile = item?.user_id_details?.profile_photo;
    const name = item?.user_id_details?.firstname + ' ' + item?.user_id_details?.lastname;
    const date = new Date(item?.created_at);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const getTime = date.getHours();
    const getMin = date.getMinutes();
    const time = getTime > 12 ? 'pm' : 'am';
    const finalDateTime =
      day + ' ' + month + ' ' + year + ' ' + ' ' + '|' + ' ' + getTime + ':' + getMin + time;
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* <Image
          source={agentProfile ? { uri: agentProfile } : Images.userPic}
          style={styles.manLogo}
        /> */}
        <View style={{ paddingHorizontal: 7 }}>
          <Text style={styles.deliverManText}>{name}</Text>
          <Text style={styles.address}>{finalDateTime}</Text>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    const a = item?.track_number;
    const result = a && a?.slice(0, 8);
    const track = result?.toUpperCase();
    // const id = item?.id;
    return (
      <TouchableOpacity
        style={styles.sopportContainer}
        onPress={() => commonNavigate(MPOS_NAVIGATION.supportChat, { item: item, id: item?.id })}
      >
        <View style={styles.orderCon}>
          <Text style={styles.order}>{'#' + track}</Text>
          {/* <TouchableOpacity
          // onPress={() =>
          //   navigate(NAVIGATION.supportDetails, { item: item, id: item?.id })
          // }
          // onPress={() => console.log('item=>', item)}
          >
            <Text style={styles.deliveredText}>
              {item?.status?.name === 'Unresponse' ? 'Pending' : item?.status?.name}
            </Text>
          </TouchableOpacity> */}
        </View>

        <Spacer space={SH(10)} />
        <View style={styles.hr}></View>

        <Spacer space={SH(10)} />
        <View style={styles.secondCon}>
          <View style={styles.aboutPayment}>
            <Text style={styles.supportText}>{strings?.help?.subject}</Text>
            <Spacer space={SH(5)} />
            <Text style={styles.paymentIssue}>{item?.subject?.name}</Text>
            <Spacer space={SH(5)} />
            <Text style={styles.description}>{item?.notes}</Text>
          </View>
          {item?.support_comments?.length > 0 ? (
            <>
              <Spacer space={SH(5)} />
              {item?.support_comments?.length > 0 ? <View style={styles.hr}></View> : null}

              {item?.support_comments.length > 0 ? (
                <Text style={styles.pickUpText}>{strings?.help?.lastRespond}</Text>
              ) : null}

              <Spacer space={SH(5)} />
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Spacer space={SH(18)} backgroundColor={COLORS.transparent} />

                {item?.support_comments?.length > 0 ? (
                  <FlatList data={item?.support_comments} renderItem={renderComItem} />
                ) : null}
              </View>
            </>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const renderEmptyContainer = () => {
    return (
      <View style={tickets?.length > 0 ? styles.emptyListViewStyle : styles.emptyListView}>
        <Text style={styles.emptyListText}>{strings.successMessages.emptyList}</Text>
      </View>
    );
  };
  return (
    <ScreenWrapper>
      <View style={{ paddingVertical: ms(10) }}>
        {isLoading ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              justifyContent: tickets?.length > 0 ? 'flex-start' : 'center',
            }}
            data={tickets?.reverse() || []}
            extraData={tickets?.reverse() || []}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyContainer}
            ListHeaderComponent={() => (
              <View style={{ marginTop: 10, backgroundColor: COLORS.transparent }} />
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
