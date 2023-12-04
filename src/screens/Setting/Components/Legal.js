import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { activeCircle, arrowLeftUp, calendar, calendarDrawer, devices, ellipse } from '@/assets';
import { LEGALDATA } from '@/constants/flatListData';
import Modal from 'react-native-modal';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { getSettings } from '@/actions/SettingAction';
import moment from 'moment';
import { Images } from '@/assets/new_icon';
import RenderHTML from 'react-native-render-html';
import { width } from '@/theme/ScalerDimensions';

export function Legal() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const legalArray = getSettingData?.getSetting?.legal;
  const policyArray = getSettingData?.getSetting?.user_policies;
  const [countryId, setCountryId] = useState(null);
  const [legalModal, setLegalModal] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (isFocused) {
      dispatch(getSettings());
    }
  }, [isFocused]);
  const removeHtmlTag = (content) => {
    const withoutHtmlTags = content?.replace(/<\/?[^>]+(>|$)|&nbsp;/g, '');

    // Remove special characters and white spaces
    const withoutSpecialCharsAndSpaces = withoutHtmlTags?.trim().replace(/[^\w\s]/gi, '');
    return withoutSpecialCharsAndSpaces;
  };
  const Item = ({ item, onPress, tintColor }) => (
    <TouchableOpacity
      style={[styles.legalViewStyle, { opacity: 1 }]}
      onPress={() => {
        setLegalModal(true), setData(item);
      }}
    >
      <View style={styles.dateViewStyle}>
        <Text style={[styles.securitysubhead, { fontSize: SF(12), color: COLORS.navy_blue }]}>
          Published
        </Text>
        {item.is_active ? (
          <View style={styles.activebuttonStyle}>
            <Image source={activeCircle} style={[styles.circlImageStyle]} />
            <Text style={styles.activeTextStyle}>Active</Text>
          </View>
        ) : (
          <View style={[styles.activebuttonStyle, styles.redActiveButton]}>
            <Image source={activeCircle} style={[styles.circlImageStyle, styles.circlImageRed]} />
            <Text style={[styles.activeTextStyle, styles.activeTextrRed]}>Inactive</Text>
          </View>
        )}
      </View>
      <View style={styles.dateContainer}>
        <Image source={Images.calendarIcon} style={styles.calendarImageStyle} />
        <Text style={[styles.securitysubhead, { fontSize: SF(14) }]}>
          {moment(item?.created_at).format('MMM D, YYYY h:mm A')}
        </Text>
      </View>
      <Spacer space={SH(5)} />

      <View style={{ alignItems: 'center' }}>
        <View style={styles.legalView}>
          <Text style={[styles.selectHead, { fontSize: SF(14), marginBottom: SH(4) }]}>
            {item?.title}
          </Text>
          <Spacer space={SH(5)} />
          <Text numberOfLines={10} style={[styles.securitysubhead, { flex: 1 }]}>
            {removeHtmlTag(item?.content)}
          </Text>
        </View>
      </View>
      <Spacer space={SH(5)} />
      <Text style={[styles.updateTextStyle, { color: COLORS.navy_blue }]}>Last update date:</Text>
      <Text style={styles.updateTextStyle}>
        {/* {item.date} */}
        {moment(item?.updated_at).format('MMM D, YYYY h:mm A')}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return <Item item={item} onPress={() => setCountryId(item.id)} tintColor={tintColor} />;
  };
  return (
    <View>
      {legalModal ? (
        <>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              setLegalModal(false);
            }}
          >
            <Image source={arrowLeftUp} resizeMode="stretch" style={styles.devicesLogo} />
            <Text style={styles.HeaderLabelText}>{data.title}</Text>
            <Spacer space={SH(5)} />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RenderHTML contentWidth={width} source={{ html: data?.content }} />
          </ScrollView>
        </>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={devices} resizeMode="stretch" style={styles.devicesLogo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.HeaderLabelText}>{strings.settings.agreements}</Text>
              <Spacer space={SH(5)} />

              <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                {strings.settings.activeInMarket}
              </Text>
            </View>
          </View>
          <Spacer space={SH(20)} />
          <FlatList
            numColumns={3}
            data={policyArray}
            extraData={policyArray}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}
