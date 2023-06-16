import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import { activeCircle, ellipse } from '@/assets';
import { LEGALDATA, policyLabelData } from '@/constants/flatListData';
import Modal from 'react-native-modal';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { getSettings } from '@/actions/SettingAction';

export function Policies() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const policiesArray = getSettingData?.getSetting?.policies;
  const [countryId, setCountryId] = useState(null);
  const [legalModal, setLegalModal] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (isFocused) {
      dispatch(getSettings());
    }
  }, [isFocused]);

  const Item = ({ item, onPress, tintColor }) => (
    <TouchableOpacity
      style={styles.legalViewStyle}
      onPress={() => {
        setLegalModal(true), setData(item);
      }}
    >
      <View style={styles.dateViewStyle}>
        <View>
          <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
            Publish date:
          </Text>
          <Text style={[styles.securitysubhead, { fontSize: SF(10) }]}>
            {item.date}
          </Text>
        </View>

        {item.status ? (
          <View style={styles.activebuttonStyle}>
            <Image source={activeCircle} style={[styles.circlImageStyle]} />
            <Text style={styles.activeTextStyle}>Active</Text>
          </View>
        ) : (
          <View style={[styles.activebuttonStyle, styles.redActiveButton]}>
            <Image
              source={activeCircle}
              style={[styles.circlImageStyle, styles.circlImageRed]}
            />
            <Text style={[styles.activeTextStyle, styles.activeTextrRed]}>
              Inactive
            </Text>
          </View>
        )}
      </View>
      <Spacer space={SH(5)} />
      <View style={{ alignItems: 'center' }}>
        <View style={styles.legalView}>
          <Text style={[styles.selectHead, { fontSize: SF(14) }]}>
            {item.title}
          </Text>
          <Spacer space={SH(3)} />
          <Text style={styles.securitysubhead}>{item.intro}</Text>
        </View>
      </View>
      <Spacer space={SH(5)} />
      <Text style={styles.updateTextStyle}>Last update date:</Text>
      <Text style={styles.updateTextStyle}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const tintColor = item.id === countryId ? COLORS.primary : null;

    return (
      <Item
        item={item}
        onPress={() => setCountryId(item.id)}
        tintColor={tintColor}
      />
    );
  };
  return (
    <View>
      <Text style={styles.HeaderLabelText}>Policies</Text>
      <Spacer space={SH(20)} />
      <FlatList
        numColumns={3}
        data={policiesArray}
        extraData={policiesArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal animationType="slide" transparent={true} isVisible={legalModal}>
        <View style={styles.legalModalCon}>
          <View style={{ paddingHorizontal: moderateVerticalScale(12) }}>
            <Spacer space={SH(10)} />
            <Text style={styles.refundPolicy}>{data?.title}</Text>
            <Spacer space={SH(10)} />
            <Text style={[styles.refundPolicy, { fontSize: SF(13) }]}>
              {strings.settings.introduction}
            </Text>
            <Spacer space={SH(5)} />
            <Text style={[styles.refundPolicyRegular, { fontSize: SF(13) }]}>
              {data?.intro}
            </Text>
            <Spacer space={SH(10)} />
            <Text style={[styles.refundPolicy, { fontSize: SF(13) }]}>
              Intellectual Property Rights
            </Text>
            <Spacer space={SH(5)} />
            <Text style={[styles.refundPolicyRegular, { fontSize: SF(13) }]}>
              {data?.property_rights}
            </Text>
            <Spacer space={SH(10)} />
            <Text style={[styles.refundPolicy, { fontSize: SF(13) }]}>
              Restrictions
            </Text>
            <Spacer space={SH(5)} />
            <Text style={[styles.refundPolicyRegular, { fontSize: SF(13) }]}>
              {data?.restrictions}
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.closeCon}>
            <TouchableOpacity
              style={styles.closeButtonCon}
              onPress={() => setLegalModal(false)}
            >
              <Text style={styles.Close}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
